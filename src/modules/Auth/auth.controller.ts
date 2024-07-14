// import AppError from "../../errors/AppError";
import { RequestHandler } from "../../utils";
import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponse";

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  // const result = await AuthServices.updateAdminIntoDB(req.params.id, req.body.admin);
  // if (!result) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     'Admin is not updated succesfully',
  //     'admins',
  //   );
  // }
  // sendResponse(req, res, {
  //   status: 'success',
  //   code: httpStatus.OK,
  //   message: 'Admin is updated successfully',
  //   data: result,
  // });
});

export const AuthControllers = {
  loginUser
}
