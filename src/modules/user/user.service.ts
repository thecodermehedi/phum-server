/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';
import { TStudent } from '../student/student.types';
import { StudentModel } from '../student/student.model';
import AcademicSemesterModel from '../AcademicSemester/AcademicSemester.model';
import { generateStudentId } from './user.utils';
import { httpStatus, mongoose } from '../../utils';
import AppError from '../../errors/AppError';
import { AcademicDepartmentModel } from '../AcademicDepartment/academicDepartment.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const isAdmissionSemesterExists = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );
  if (!isAdmissionSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Admission Semester was not found in the database',
      'admissionSemester',
    );
  }

  const isAcademicDepartmentExists = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department was not found in the database',
      'academicDepartment',
    );
  }

  const currentSession = await mongoose.startSession();

  try {
    let isCreated: boolean = false;
    currentSession.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateStudentId(isAdmissionSemesterExists),
      role: 'student',
      password: password || config.defaultPassword,
    };

    const newUser = await UserModel.create([userData], { currentSession });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user', 'users');
    }

    const newStudent = {
      ...payload,
      id: newUser[0].id,
      user: newUser[0]._id,
    };

    const createdStudent = await StudentModel.create([newStudent], { currentSession });

    if (!createdStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student', 'students');
    }

    await currentSession.commitTransaction();
    isCreated = true;
    return { isCreated, createdStudent };
  } catch (error: any) {
    await currentSession.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'Failed to create student',
    );
  } finally {
    await currentSession.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
