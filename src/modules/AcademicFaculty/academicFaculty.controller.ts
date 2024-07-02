import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';
import isValidObjectId from '../../utils/isValidObjectId';
import { RequestHandler, httpStatus } from '../../utils';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

const getAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();
  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Academic Faculty found in the database',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Facultlies are retrieved successfully',
    data: result,
  });
});

const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.facultyId);
  if (!isValid) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Academic Faculty Id is not valid',
      data: null,
    });
  }
  const result = await AcademicFacultyServices.getAcademicFacultyFromDB(
    req.params.facultyId,
  );
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Academic Faculty is not found in the database',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.facultyId);
  if (!isValid) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Academic Faculty Id is not valid',
      data: null,
    });
  }
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    req.params.facultyId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
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
