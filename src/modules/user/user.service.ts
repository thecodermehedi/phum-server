import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';
import { TStudent } from '../student/student.types';
import { StudentModel } from '../student/student.model';
import AcademicSemesterModel from '../AcademicSemester/AcademicSemester.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const result = await AcademicSemesterModel.findById(payload.admissionSemester);
  if (!result) return undefined;
  const userData: Partial<TUser> = {
    id: await generateStudentId(result),
    role: 'student',
    password: password || config.defaultPassword,
  };
  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    return await StudentModel.create({
      ...payload,
      id: newUser.id,
      userId: newUser._id,
    });
  }
};

export const UserServices = {
  createStudentIntoDB,
};
