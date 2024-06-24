import config from '../../config';
import { TUser } from './user.types';
import UserModel from './user.model';
import { TStudent } from '../student/student.types';

const createStudentIntoDB = async (studentData: TStudent, pswd: string) => {
  const userData: Partial<TUser> = {
    id: '20240620',
    role: 'student',
    password: pswd || config.defaultPassword,
  };

  //TODO: Add logic to generate user id

  const newUser = await UserModel.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.userId = newUser._id;

    // const newStudent = await

  }

};

export const UserServices = {
  createStudentIntoDB,
};
