import AppError from '../../errors/AppError';
import { httpStatus, RequestHandler } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyServices.getFacultiesFromDB(req.query);
  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No faculties found in the database',
      'faculties',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: `Faculties ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyServices.getFacultyFromDB(req.params.id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faculty not found in the database',
      'faculties',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyServices.updateFacultyIntoDB(
    req.params.id,
    req.body.faculty,
  );
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculty is not updated succesfully',
      'faculties',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

const softDeleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacultyServices.softDeleteFacultyFromDB(req.params.id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faculty is not deleted succesfully',
      'faculties',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'no_content',
    message: 'Faculty is deleted successfully',
  });
});

export const FacultyControllers = {
  getFaculties,
  getFaculty,
  updateFaculty,
  softDeleteFaculty,
};
