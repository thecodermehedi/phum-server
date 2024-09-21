/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';
import { TStudent } from '../student/student.types';
import { StudentModel } from '../student/student.model';
import AcademicSemesterModel from '../AcademicSemester/AcademicSemester.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import { httpStatus, mongoose } from '../../utils';
import AppError from '../../errors/AppError';
import { AcademicDepartmentModel } from '../AcademicDepartment/academicDepartment.model';
import { TFaculty } from '../Faculty/faculty.types';
import { FacultyModel } from '../Faculty/faculty.model';
import { AdminModel } from '../Admin/admin.model';

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
      email: payload.email,
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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
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
      id: await generateFacultyId(),
      role: 'faculty',
      email: payload.email,
      password: password || config.defaultPassword,
    };

    const newUser = await UserModel.create([userData], { currentSession });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user', 'users');
    }

    const newFaculty = {
      ...payload,
      id: newUser[0].id,
      user: newUser[0]._id,
    };

    const createdFaculty = await FacultyModel.create([newFaculty], { currentSession });

    if (!createdFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty', 'faculties');
    }

    await currentSession.commitTransaction();
    isCreated = true;
    return { isCreated, createdFaculty };
  } catch (error: any) {
    await currentSession.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'Failed to create faculty',
    );
  } finally {
    await currentSession.endSession();
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  const currentSession = await mongoose.startSession();

  try {
    let isCreated: boolean = false;
    currentSession.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateAdminId(),
      role: 'admin',
      email: payload.email,
      password: password || config.defaultPassword,
    };

    const newUser = await UserModel.create([userData], { currentSession });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user', 'users');
    }

    const newAdmin = {
      ...payload,
      id: newUser[0].id,
      user: newUser[0]._id,
    };

    const createdAdmin = await AdminModel.create([newAdmin], { currentSession });

    if (!createdAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin', 'admins');
    }

    await currentSession.commitTransaction();
    isCreated = true;
    return { isCreated, createdAdmin };
  } catch (error: any) {
    await currentSession.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'Failed to create admin',
    );
  } finally {
    await currentSession.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
