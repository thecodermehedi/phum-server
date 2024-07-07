import { RequestHandler, httpStatus } from '../../utils';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createStudentIntoDB(
    req.body.password,
    req.body.student,
  );
  if (!result.isCreated) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create student',
      'students',
    );
  }
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.OK,
    message: 'Student is created successfully',
    data: result.createdStudent,
  });
});

export const UserControllers = {
  createStudent,
};
