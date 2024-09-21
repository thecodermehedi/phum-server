import { httpStatus, RequestHandler } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.cookie('refreshToken', result.refreshToken, {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
  });
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'User is logged in successfully',
    data: { token: result.accessToken, needsPasswordChange: result.needsPasswordChange },
  });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  await AuthServices.changePassword(req.user, { ...req.body });
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Password changed successfully',
  });
});

const getAccessToken: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.getAccessToken(req.cookies?.refresh_token);
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'AccessToken is received successfully',
    data: { accessToken: result },
  });
});

const forgetPassword: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.body.id;
  await AuthServices.forgetPassword(userId);
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Password reset link sent successfully',
  });
});

const resetPassword: RequestHandler = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization as string;
  await AuthServices.resetPassword(req.body, token);
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Password reset successfull',
  });
})

export const AuthControllers = {
  loginUser,
  changePassword,
  getAccessToken,
  forgetPassword,
  resetPassword
};
