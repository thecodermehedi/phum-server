import AppError from "../../errors/AppError";
import { httpStatus, RequestHandler } from "../../utils";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "")
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: "User is logged in successfully",
    data: result
  })
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
  // AuthServices.changePassword()
})

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  // AuthServices.refreshToken()
})

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken
}
