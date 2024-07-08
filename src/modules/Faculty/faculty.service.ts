/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { httpStatus, mongoose } from '../../utils';
import UserModel from '../User/user.model';
import { FacultySearchableFields } from './faculty.constant';
import { FacultyModel } from './faculty.model';
import { TFaculty } from './faculty.types';

const getFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find().populate('user').populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  return await facultyQuery.modelQuery;
};

const getFacultyFromDB = async (id: string) => {
  return await FacultyModel.findById(id).populate('user').populate('academicDepartment');
};

const updateFacultyIntoDB = async (id: string, payload: Partial<TFaculty>) => {
  let modifiedPayload: Record<string, unknown> = {};
  if (payload?.name) {
    const { name, ...rest } = payload;
    modifiedPayload = { ...rest }
    if (Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedPayload[`name.${key}`] = value;
      }
    }
  }
  modifiedPayload = payload;
  return await FacultyModel.findByIdAndUpdate(id, modifiedPayload, {
    new: true,
    runValidators: true,
  });
};

const softDeleteFacultyFromDB = async (id: string) => {
  let isDeleted: boolean = false;
  const currentSession = await mongoose.startSession();
  try {
    currentSession.startTransaction();
    const deletedFaculty = await FacultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, currentSession },
    );

    if (!deletedFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete faculty',
        'faculty user',
      );
    }
    const deletedUser = await UserModel.findByIdAndUpdate(
      deletedFaculty.user,
      { isDeleted: true },
      { new: true, currentSession },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user', 'faculty user');
    }
    await currentSession.commitTransaction();
    isDeleted = true;
    return isDeleted;
  } catch (err: any) {
    await currentSession.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, err.message, 'faculty user');
  } finally {
    await currentSession.endSession();
  }
};

export const FacultyServices = {
  getFacultiesFromDB,
  getFacultyFromDB,
  updateFacultyIntoDB,
  softDeleteFacultyFromDB,
};
