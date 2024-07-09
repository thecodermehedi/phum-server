import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import isValidObjectId from '../../utils/isValidObjectId';
import { RequestHandler, httpStatus } from '../../utils';
import { AcademicDepartmentServices } from './academicDepartment.service';
import AppError from '../../errors/AppError';

const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create academic department',
      'academicDepartments',
    );
  }
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.CREATED,
    message: 'Academic Department is created successfully',
    data: result,
  });
});

const getAcademicDepartments: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAcademicDepartmentsFromDB();
  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No Academic Department found in the database',
      'academicDepartments',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: `Academic Departments ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Department Id is not valid',
      'academicDepartments',
    );
  }
  const result = await AcademicDepartmentServices.getAcademicDepartmentFromDB(
    req.params.id,
  );
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Department is not found in the database',
      'academicDepartments',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Department Id is not valid',
      'academicDepartments',
    );
  }
  const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
    req.params.id,
    req.body,
  );
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update academic department',
      'academicDepartments',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Department is updated successfully',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAcademicDepartment,
  getAcademicDepartments,
  updateAcademicDepartment,
};
