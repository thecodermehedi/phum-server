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
import { USER_ROLE } from './user.constant';
import isValidObjectId from '../../utils/isValidObjectId';
import sendPhotoToCloudinary from '../../utils/sendPhotoToCloudinary';
import { TAdmin } from '../Admin/admin.types';

const createStudentIntoDB = async (file: any, password: string, payload: TStudent) => {
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

    const studentId = await generateStudentId(isAdmissionSemesterExists);

    const userData: Partial<TUser> = {
      id: studentId,
      role: 'student',
      email: payload.email,
      password: password || config.defaultPassword,
    };

    if (file) {
      const name = `${studentId}_${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendPhotoToCloudinary(name, path);
      payload.profileImg = secure_url as string;
    }

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

const createFacultyIntoDB = async (file: any, password: string, payload: TFaculty) => {
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

    const facultyId = await generateFacultyId();

    const userData: Partial<TUser> = {
      id: facultyId,
      role: 'faculty',
      email: payload.email,
      password: password || config.defaultPassword,
    };

    if (file) {
      const name = `${facultyId}_${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendPhotoToCloudinary(name, path);
      payload.profileImg = secure_url as string;
    }

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

const createAdminIntoDB = async (file: any, password: string, payload: TAdmin) => {
  const currentSession = await mongoose.startSession();

  try {
    let isCreated: boolean = false;
    currentSession.startTransaction();

    const adminId = await generateAdminId();

    const userData: Partial<TUser> = {
      id: adminId,
      role: 'admin',
      email: payload.email,
      password: password || config.defaultPassword,
    };

    if (file) {
      const name = `${adminId}_${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendPhotoToCloudinary(name, path);
      payload.profileImg = secure_url as string;
    }

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

const getMeFromDB = async (userId: string, role: string) => {
  if (role === USER_ROLE.student) {
    return await StudentModel.find({ id: userId })
      .populate('admissionSemester')
      .populate('academicDepartment');
  }
  if (role === USER_ROLE.admin) {
    return await AdminModel.find({ id: userId }).populate('user');
  }
  if (role === USER_ROLE.faculty) {
    return await FacultyModel.find({ id: userId })
      .populate('user')
      .populate('academicDepartment');
  }
  return null;
};

const changeStatus = async (userId: string, status: string) => {
  const isValid = isValidObjectId(userId);
  if (!isValid) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid user id');
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return await UserModel.findByIdAndUpdate(userId, { status }, { new: true });
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatus,
};
