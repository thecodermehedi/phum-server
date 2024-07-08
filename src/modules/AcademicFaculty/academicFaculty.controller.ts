import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';
import isValidObjectId from '../../utils/isValidObjectId';
import { RequestHandler, httpStatus } from '../../utils';
import AppError from '../../errors/AppError';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create academic faculty',
      'academicFaculties',
    );
  }
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.OK,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

const getAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();
  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No Academic Faculty found in the database',
      'academicFaculties',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: `Academic Facultlies ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Faculty Id is not valid',
      'academicFaculties',
    );
  }
  const result = await AcademicFacultyServices.getAcademicFacultyFromDB(req.params.id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Faculty is not found in the database',
      'academicFaculties',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Faculty Id is not valid',
      'academicFaculties',
    );
  }
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    req.params.id,
    req.body,
  );
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update academic faculty',
      'academicFaculties',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFaculties,
  updateAcademicFaculty,
};
