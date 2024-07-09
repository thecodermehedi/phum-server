import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler, httpStatus } from '../../utils';
import { AcademicSemesterServices } from './AcademicSemester.service';
import isValidObjectId from '../../utils/isValidObjectId';
import AppError from '../../errors/AppError';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
  if (result === null) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester Code is not valid',
      'academicSemesters',
    );
  }
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create academic semester',
      'academicSemesters',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.CREATED,
    status: 'created',
    message: 'Academic Semister is created successfully',
    data: result,
  });
});

const getAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemestersFromDB();
  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No Academic Semester found in the database',
      'academicSemesters',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'error',
    message: `Academic Semesters ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Semester Id is not valid',
      'academicSemesters',
    );
  }
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB(req.params.id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester is not found in the database',
      'academicSemesters',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.id);
  if (!isValid) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Academic Semester Id is not valid',
      'academicSemesters',
    );
  }
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    req.params.id,
    req.body,
  );
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update academic semester',
      'academicSemesters',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Semester is updated successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  getAcademicSemesters,
  updateAcademicSemester,
};
