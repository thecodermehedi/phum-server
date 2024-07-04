import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';
import isValidObjectId from '../../utils/isValidObjectId';
import { RequestHandler, httpStatus } from '../../utils';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
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
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.NOT_FOUND,
      message: 'No Academic Faculty found in the database',
    });
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Academic Facultlies are retrieved successfully',
    data: result,
  });
});

const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.facultyId);
  if (!isValid) {
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.BAD_REQUEST,
      message: 'Academic Faculty Id is not valid',
    });
  }
  const result = await AcademicFacultyServices.getAcademicFacultyFromDB(
    req.params.facultyId,
  );
  if (!result) {
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.NOT_FOUND,
      message: 'Academic Faculty is not found in the database',
    });
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.facultyId);
  if (!isValid) {
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.BAD_REQUEST,
      message: 'Academic Faculty Id is not valid',
    });
  }
  const result = await AcademicFacultyServices.updateAcademicFacultyFromDB(
    req.params.facultyId,
    req.body,
  );
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
