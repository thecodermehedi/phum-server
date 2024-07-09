import AppError from '../../errors/AppError';
import { httpStatus, RequestHandler } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course is not created successfully', 'courses');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.CREATED,
    message: 'Course is created successfully',
    data: result,
  });
});

const getCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getCoursesFromDB(req.query);
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No courses found in the database', 'courses');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: `Courses ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getCourseFromDB(req.params.id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found in the database', 'courses');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.updateCourseIntoDB(req.params.id, req.body);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course is not updated successfully', 'courses');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Course is updated successfully',
    data: result,
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.deleteCourseFromDB(req.params.id);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course is not deleted successfully', 'courses');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Course is deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
