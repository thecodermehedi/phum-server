import sendResponse from '../../utils/sendResponse';
import { RequestHandler, httpStatus } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import { StudentServices } from './student.service';

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentsFromDB();
  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No students found in the database',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

const getStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentFromDB(req.params.studentId);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Student not found in the database',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.updateStudentFromDB(req.params.studentId, req.body)
  if(!result){
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Student is not updated succesfully',
      data: null
    })
  }
})

const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.deleteStudentFromDB(req.params.studentId)
  if(!result){
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Student is not deleted succesfully',
      data: null
    })
  }
})

export const StudentControllers = {
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
