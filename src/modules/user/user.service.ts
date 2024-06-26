/* eslint-disable no-console */
import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';
import { TStudent } from '../student/student.types';
import { StudentModel } from '../student/student.model';
// import userValidationSchema from './user.validator';

const createStudentIntoDB = async (studentData: TStudent, pswd: string) => {
  const userData: Partial<TUser> = {
    id: '20240620',
    role: 'student',
    password: pswd || config.defaultPassword,
  };
  // const parsedUserData = userValidationSchema.parse(userData);
  //TODO: Add logic to generate user id
  const newUser = await UserModel.create(userData);
  console.table(newUser);
  if (Object.keys(newUser).length) {
    return await StudentModel.create({
      ...studentData,
      id: newUser.id,
      userId: newUser._id,
    });
  }
};

export const UserServices = {
  createStudentIntoDB,
};
