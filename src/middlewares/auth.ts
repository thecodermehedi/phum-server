import config from '../config';
import AppError from '../errors/AppError';
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

    if (requiredRoles.length && !requiredRoles.includes(decoded?.role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded;
    next();
  });

export default auth;
