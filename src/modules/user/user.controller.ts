import { RequestHandler, httpStatus } from '../../utils';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createStudentIntoDB(
    req.body.password,
    req.body.student,
  );
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.OK,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
