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
    code: httpStatus.CREATED,
    message: 'Student is created successfully',
    data: result.createdStudent,
  });
});
const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createFacultyIntoDB(
    req.body.password,
    req.body.faculty,
  );
  if (!result.isCreated) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create faculty',
      'faculties',
    );
  }
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.CREATED,
    message: 'Faculty is created successfully',
    data: result.createdFaculty,
  });
});

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body.password, req.body.admin);
  if (!result.isCreated) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create admin',
      'admins',
    );
  }
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.CREATED,
    message: 'Admin is created successfully',
    data: result.createdAdmin,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
