import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler, httpStatus } from '../../utils';
import { AcademicSemesterServices } from './AcademicSemester.service';
import isValidObjectId from '../../utils/isValidObjectId';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
  if (!result) {
    return sendResponse(req, res, {
      code: httpStatus.BAD_REQUEST,
      status: 'error',
      message: 'Semester Code is not valid',
    });
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'created',
    message: 'Academic Semister is created successfully',
    data: result,
  });
});

const getAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemestersFromDB();
  if (!result.length) {
    return sendResponse(req, res, {
      code: httpStatus.NOT_FOUND,
      status: 'error',
      message: 'No Academic Semester found in the database',
    });
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'error',
    message: 'Academic Semesters are retrieved successfully',
    data: result,
  });
});

const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.semesterId);
  if (!isValid) {
    return sendResponse(req, res, {
      code: httpStatus.BAD_REQUEST,
      status: 'error',
      message: 'Academic Semester Id is not valid',
    });
  }
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB(
    req.params.semesterId,
  );
  if (!result) {
    return sendResponse(req, res, {
      code: httpStatus.NOT_FOUND,
      status: 'error',
      message: 'Academic Semester not found in the database',
    });
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.semesterId);
  if (!isValid) {
    return sendResponse(req, res, {
      code: httpStatus.BAD_REQUEST,
      status: 'error',
      message: 'Academic Semester Id is not valid',
    });
  }
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    req.params.semesterId,
    req.body,
  );
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
