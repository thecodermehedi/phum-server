/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { StudentModel } from './student.model';
import { TStudent } from './student.types';
import { httpStatus, mongoose } from '../../utils';
import UserModel from '../User/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryModel = StudentModel.find().populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  const studentQuery = new QueryBuilder(queryModel, query);
  const finalQuery = studentQuery.search(studentSearchableFields).filter().sort().paginate().fields()
  return await finalQuery.modelQuery

}


const getStudentFromDB = (studentId: string) => {
  return StudentModel.findOne({ id: studentId }).populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
};

const updateStudentFromDB = async (studentId: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...rest } = payload;

  const modifiedPayload: Record<string, unknown> = {
    ...rest,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedPayload[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedPayload[`localGuardian.${key}`] = value;
    }
  }

  return await StudentModel.findOneAndUpdate(
    { id: studentId, isDeleted: false },
    modifiedPayload,
    { new: true, runValidators: true },
  );
};

const softDeleteStudentFromDB = async (studentId: string) => {
  let isUpdated: boolean = false;
  const currentSession = await mongoose.startSession();
  try {
    currentSession.startTransaction();

    const isStudentDeleted = await StudentModel.findOneAndUpdate(
      { id: studentId },
      { $set: { isDeleted: true } },
    ).session(currentSession);

    if (!isStudentDeleted) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Student was not deleted successfully',
        'id',
      );
    }

    const isUserDeleted = await UserModel.findOneAndUpdate(
      { id: studentId },
      { $set: { isDeleted: true } },
    ).session(currentSession);

    if (!isUserDeleted) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User was not deleted successfully',
        'id',
      );
    }

    await currentSession.commitTransaction();
    isUpdated = true;
    return isUpdated;
  } catch (error: any) {
    await currentSession.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'Failed to delete student',
    );
  } finally {
    await currentSession.endSession();
  }
};

const hardDeleteStudentFromDB = async (studentId: string) => {
  let isDeleted: boolean = false;
  const currentSession = await mongoose.startSession();
  try {
    currentSession.startTransaction();
    const isStudentDeleted = await StudentModel.findOneAndDelete({
      id: studentId,
    }).session(currentSession);
    if (!isStudentDeleted) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Student was not deleted successfully',
        'id',
      );
    }
    const isUserDeleted = await UserModel.findOneAndDelete({ id: studentId }).session(
      currentSession,
    );
    if (!isUserDeleted) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User was not deleted successfully',
        'id',
      );
    }
    isDeleted = true;
    await currentSession.commitTransaction();
    return isDeleted;
  } catch (error: any) {
    await currentSession.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.message,
      'Failed to delete student',
    );
  } finally {
    await currentSession.endSession();
  }
};

export const StudentServices = {
  getStudentsFromDB,
  getStudentFromDB,
  updateStudentFromDB,
  softDeleteStudentFromDB,
  hardDeleteStudentFromDB,
};

/*
These mongoose method is asyncronus by nature
find(): Used to retrieve documents from a collection.
findOne(): Finds a single document in the collection.
findById(): Finds a single document by its _id field.
save(): Saves a document instance to the database.
updateOne(): Updates a single document in the collection.
deleteOne(): Deletes a single document in the collection.
aggregate(): Performs aggregation operations on the collection data.
countDocuments(): Counts the number of documents that match a query.
*/
