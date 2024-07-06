import sendResponse from '../../utils/sendResponse';
import { RequestHandler, httpStatus } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsFromDB();
  if (!result.length) {
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.NOT_FOUND,
      message: 'No students found in the database',
    });
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentFromDB(req.params.studentId);
  if (!result) {
    return sendResponse(req, res, {
      code: httpStatus.NOT_FOUND,
      status: 'error',
      message: 'Student not found in the database',
    });
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
    return sendResponse(req, res, {
      status: 'error',
      code: httpStatus.BAD_REQUEST,
      message: 'Student is not updated succesfully',
    });
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.deleteStudentFromDB(req.params.studentId);
  if (!result) {
    return sendResponse(req, res, {
      code: httpStatus.BAD_REQUEST,
      status: 'error',
      message: 'Student is not deleted succesfully',
    });
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
  deleteStudent,
};
