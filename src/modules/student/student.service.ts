import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { StudentModel } from './student.model';
import { TStudent } from './student.types';
import { mongoose } from '../../utils';
import UserModel from '../User/user.model';

const getStudentsFromDB = () => StudentModel.find({ isDeleted: false });
// .populate('userId')
// .populate('admissionSemester')
// .populate({
//   path: 'academicDepartment',
//   populate: {
//     path: 'academicFaculty',
//   },
// });

const getStudentFromDB = (studentId: string) => {
  return StudentModel.findOne({ id: studentId, isDeleted: false });
  // .populate('userId')
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // });
};

const updateStudentFromDB = async (studentId: string, payload: Partial<TStudent>) => {

  const { name, guardian, localGuardian, ...rest } = payload;

  const modifiedPayload: Record<string, unknown> = {
    ...rest
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedPayload[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedPayload[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedPayload[`localGuardian.${key}`] = value
    }
  }

  return await StudentModel.findOneAndUpdate(
    { id: studentId, isDeleted: false },
    modifiedPayload,
    { new: true, runValidators: true },
  );
};

const deleteStudentFromDB = async (studentId: string) => {
  const currentSession = await mongoose.startSession();
  try {
    currentSession.startTransaction();

    const isStudentDeleted = StudentModel.findOneAndUpdate(
      { id: studentId, isDeleted: false },
      { isDeleted: true },
      { new: true, currentSession },
    );

    if (!isStudentDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student was not deleted successfully');
    }

    const isUserDeleted = UserModel.findOneAndUpdate(
      { id: studentId, isDeleted: false },
      { isDeleted: true },
      { new: true, currentSession },
    );

    if (!isUserDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User was not deleted successfully');
    }

    await currentSession.commitTransaction();
    await currentSession.endSession();

    return isStudentDeleted;
  } catch {
    await currentSession.abortTransaction();
    await currentSession.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getStudentsFromDB,
  getStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
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
