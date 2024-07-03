import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';
import { TStudent } from '../student/student.types';
import { StudentModel } from '../student/student.model';
import AcademicSemesterModel from '../AcademicSemester/AcademicSemester.model';
import { generateStudentId } from './user.utils';
import { httpStatus, mongoose } from '../../utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const result = await AcademicSemesterModel.findById(payload.admissionSemester);
  if (!result) return undefined;

  const currentSession = await mongoose.startSession();

  try {
    // start transaction
    currentSession.startTransaction();

    const userData: Partial<TUser> = {
      id: await generateStudentId(result),
      role: 'student',
      password: password || config.defaultPassword,
    };

    // transaction - 1
    const newUser = await UserModel.create([userData], { currentSession });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    const newStudent = {
      ...payload,
      id: newUser[0].id,
      userId: newUser[0]._id,
    };
    // transaction - 2
    const createdStudent = await StudentModel.create([newStudent], { currentSession });

    if (!createdStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await currentSession.commitTransaction();
    await currentSession.endSession();

    return createdStudent;
  } catch (error: any) {
    await currentSession.abortTransaction();
    await currentSession.endSession();
    throw new Error(error);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
