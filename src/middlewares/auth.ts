import config from '../config';
import AppError from '../errors/AppError';
import UserModel from '../modules/User/user.model';
import { TUserRole } from '../modules/User/user.types';
import { httpStatus } from '../utils';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: Array<TUserRole>) =>
  catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    const user = UserModel.isUserExistsByCustomId(decoded.userId)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    if (requiredRoles.length && !requiredRoles.includes(decoded?.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded;
    next();
  });

export default auth;
