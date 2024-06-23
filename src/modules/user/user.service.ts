import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';

const createStudentIntoDB = async (studentData: TStudent, pswd: string) => {
  const user: Partial<TUser> = {
    id: '20240620',
    role: 'student',
    password: pswd || config.defaultPassword,
  };

  //TODO: Add logic to generate user id

  // const result = await UserModel.create(user);
};

export const UserServices = {
  createStudentIntoDB,
};
