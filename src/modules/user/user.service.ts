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

  const createSession = await mongoose.startSession();

  try {
    // start transaction
    createSession.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateStudentId(isAdmissionSemesterExists),
      role: 'student',
      password: password || config.defaultPassword,
    };

    // transaction - 1
    const newUser = await UserModel.create([userData], { currentSession: createSession });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user', 'users');
    }

    const newStudent = {
      ...payload,
      id: newUser[0].id,
      userId: newUser[0]._id,
    };
    // transaction - 2
    const createdStudent = await StudentModel.create([newStudent], {
      currentSession: createSession,
    });

    if (!createdStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student', 'students');
    }

    await createSession.commitTransaction();
    await createSession.endSession();

    return createdStudent;
  } catch {
    await createSession.abortTransaction();
    await createSession.endSession();
    throw new Error('Failed to create Student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
