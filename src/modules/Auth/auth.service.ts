import { httpStatus } from '../../utils';
import AppError from '../../errors/AppError';
import UserModel from '../User/user.model';
import { TChangePasswordPayload, TLoginUser, TResetPasswordPayload } from './auth.types';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import sendEmail from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  //? Check if the user exists
  const user = await UserModel.isUserExistsByCustomId(payload.id);
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
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  //? Generate Token
  const jwtPayload = { userId: user?.id, role: user?.role };
  const accessToken = createToken(
    jwtPayload,
    config.jwtAccessSecret,
    config.jwtAccessExpiresIn,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret,
    config.jwtRefreshExpiresIn,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (userData: JwtPayload, payload: TChangePasswordPayload) => {
  //? Check if the user exists
  const user = await UserModel.isUserExistsByCustomId(userData.userId);
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
  if (!(await UserModel.isPasswordMatched(payload?.oldPassword, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not match');
  }

  //? Hash newPassword using bcrypt
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    config.bcrypt_salt_rounds,
  );

  //? Updating Password
  return await UserModel.findOneAndUpdate(
    { id: userData.userid, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

const getAccessToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwtAccessSecret);
  const user = await UserModel.isUserExistsByCustomId(decoded.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }
  if (
    user.passwordChangedAt &&
    UserModel.isTokenIssuedBeforePasswordChange(
      user.passwordChangedAt,
      decoded.iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }
  return createToken(
    { userId: user.id, role: user.role },
    config.jwtAccessSecret,
    config.jwtAccessExpiresIn,
  );
};

const forgetPassword = async (userId: string) => {
  //? Check if the user exists
  const user = await UserModel.isUserExistsByCustomId(userId);
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
  const resetToken = createToken(
    { userId: user.id, role: user.role },
    config.jwtAccessSecret,
    '7m',
  );
  const resetLink = `${config.clientUrl}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, user.id, resetLink, '7 minitues');
};

const resetPassword = async (payload: TResetPasswordPayload, token: string) => {
  const decoded = verifyToken(token, config.jwtAccessSecret);
  const user = await UserModel.isUserExistsByCustomId(decoded.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  if (payload.id !== user.id) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    config.bcrypt_salt_rounds,
  );
  await UserModel.findOneAndUpdate(
    { id: decoded.userId, role: decoded.role },
    { password: hashedPassword, needsPasswordChange: false, passwordChangedAt: new Date() },
  );
}



export const AuthServices = {
  loginUser,
  changePassword,
  getAccessToken,
  forgetPassword,
  resetPassword
};
