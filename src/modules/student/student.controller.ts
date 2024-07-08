import sendResponse from '../../utils/sendResponse';
import { RequestHandler, httpStatus } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';
import AppError from '../../errors/AppError';

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsFromDB(req.query);
  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No students found in the database',
      'students',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: `Students ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentFromDB(req.params.studentId);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student not found in the database',
      'students',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.updateStudentFromDB(
    req.params.studentId,
    req.body.student,
  );
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Student is not updated succesfully',
      'students',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Student is updated successfully',
    data: result,
  });
});

const softDeleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.softDeleteStudentFromDB(req.params.studentId);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Student is not deleted succesfully',
      'students',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'no_content',
    message: 'Student is deleted successfully',
  });
});
const hardDeleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.hardDeleteStudentFromDB(req.params.studentId);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Student is not deleted succesfully',
      'students',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'no_content',
    message: 'Student is deleted successfully',
  });
});

export const StudentControllers = {
  getStudents,
  getStudent,
  updateStudent,
  softDeleteStudent,
  hardDeleteStudent,
};
