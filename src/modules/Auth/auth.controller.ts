// import AppError from "../../errors/AppError";
import { httpStatus, RequestHandler } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.loginUser(req.body);

  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'User is logged in successfully',
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, { ...req.body });
  console.log(result);
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Password changed successfully',
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  console.log(req, res);
  // AuthServices.refreshToken()
  // const result = await AuthServices.loginUser(req.body);

  // sendResponse(req, res, {
  //   status: 'success',
  //   code: httpStatus.OK,
  //   message: 'User is logged in successfully',
  // });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
};
