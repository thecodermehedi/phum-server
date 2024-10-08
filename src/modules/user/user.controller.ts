import { RequestHandler, httpStatus } from '../../utils';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/AppError';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.createStudentIntoDB(
    req.file,
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
    req.file,
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
  const result = await UserServices.createAdminIntoDB(
    req.file,
    req.body.password,
    req.body.admin,
  );
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

const getMe: RequestHandler = catchAsync(async (req, res) => {
  const { userId, role } = req.user;
  const result = await UserServices.getMeFromDB(userId, role);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'User data retrieved successfully',
    data: result,
  });
});

const changeStatus: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;
  const result = await UserServices.changeStatus(userId, status);
  if (!result) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to change status');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Status changed successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
