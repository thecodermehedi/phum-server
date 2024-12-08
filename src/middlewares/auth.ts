import config from '../config';
import AppError from '../errors/AppError';
import { verifyToken } from '../modules/Auth/auth.utils';
import UserModel from '../modules/User/user.model';
import { TUserRole } from '../modules/User/user.types';
import { httpStatus } from '../utils';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: Array<TUserRole>) =>
 catchAsync(async (req, _res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  let decoded;
  try {
   decoded = verifyToken(token, config.jwtAccessSecret);
  } catch {
   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
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
  if (requiredRoles.length && !requiredRoles.includes(decoded?.role)) {
   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  req.user = decoded;
  next();
 });

export default auth;
