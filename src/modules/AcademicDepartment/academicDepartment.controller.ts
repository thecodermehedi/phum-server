import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import isValidObjectId from '../../utils/isValidObjectId';
import { RequestHandler, httpStatus } from '../../utils';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );
  sendResponse(req, res, {
    status: 'created',
    code: httpStatus.OK,
    message: 'Academic Department is created successfully',
    data: result,
  });
});

const getAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAcademicFacultiesFromDB();
  if (!result.length) {
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.NOT_FOUND,
      message: 'No Academic Department found in the database',
    });
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Departments are retrieved successfully',
    data: result,
  });
});

const getAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.departmentId);
  if (!isValid) {
    return sendResponse(req, res, {
      code: httpStatus.BAD_REQUEST,
      status: 'error',
      message: 'Academic Department Id is not valid',
    });
  }
  const result = await AcademicDepartmentServices.getAcademicDepartmentFromDB(
    req.params.departmentId,
  );
  if (!result) {
    return sendResponse(req, res, {
      code: httpStatus.NOT_FOUND,
      status: 'error',
      message: 'Academic Department is not found in the database',
    });
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.departmentId);
  if (!isValid) {
    return sendResponse(req, res, {
      code: httpStatus.BAD_REQUEST,
      status: 'error',
      message: 'Academic Department Id is not valid',
    });
  }
  const result = await AcademicDepartmentServices.updateAcademicDepartmentFromDB(
    req.params.departmentId,
    req.body,
  );
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
  getAcademicFaculties,
  updateAcademicDepartment,
};
