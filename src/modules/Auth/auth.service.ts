import { httpStatus } from '../../utils';
import AppError from '../../errors/AppError';
import UserModel from '../User/user.model';
import { TLoginUser } from './auth.types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  //? Check if the user exists
  const user = await UserModel.findOne({ id: payload?.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  //? Check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  //? Check if the user's status is blocked
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //? Check if the password is correct
  const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  //? Generate Token
  const jwtPayload = { userId: user?.id, role: user?.role }
  const accessToken = jwt.sign(jwtPayload, config.jwtSecret, { expiresIn: '10d' });

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange
  }
};

const changePassword = () => { };

const refreshToken = () => { };

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
