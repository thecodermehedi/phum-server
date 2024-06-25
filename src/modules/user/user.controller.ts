/* eslint-disable no-console */
import { RequestHandler } from '../../utils';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import studentValidationSchema from '../student/student.validator';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  console.table(req.body)
  // const parsedStudentData = studentValidationSchema.parse(studentData);
  const result = await UserServices.createStudentIntoDB(studentData, password);
  console.table(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
