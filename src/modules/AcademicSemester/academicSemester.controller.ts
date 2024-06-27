import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from '../../utils';
import { AcademicSemesterServices } from './AcademicSemester.service';
import isValidObjectId from '../../utils/isValidObjectId';

const getSingleAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const isValid = isValidObjectId(req.params.semesterId)
  if (!isValid) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Academic Semester Id is not valid',
      data: null
    })
  }
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(req.params.semesterId);
  if (!result.length) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Academic Semester not found in the database',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  });
});

const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters are retrieved successfully',
    data: result,
  });
});

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is created successfully',
    data: result,
  });
});



// const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
//   const { studentId } = req.params;
//   const result = await StudentServices.deleteStudentFromDB(studentId);
//   if (!result.modifiedCount) {
//     return sendResponse(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       success: false,
//       message: 'Student not found in the database',
//       data: null,
//     });
//   }
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Student is deleted succesfully',
//     data: result,
//   });
// });

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getSingleAcademicSemester,
  getAllAcademicSemesters
};
