import { httpStatus, RequestHandler } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './offeredCourse.service';

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.CREATED,
    message: 'Offered Course is created successfully !',
    data: result,
  });
});

const getOfferedCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getOfferedCoursesFromDB(req.query);
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'OfferedCourses retrieved successfully !',
    data: result,
  });
});

const getOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getOfferedCourseFromDB(req.params.id);
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'OfferedCourse fetched successfully',
    data: result,
  });
});

const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'OfferedCourse updated successfully',
    data: result,
  });
});

const deleteOfferedCourseFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.deleteOfferedCourseFromDB(req.params.id);
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'no_content',
    message: 'OfferedCourse deleted successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getOfferedCourses,
  getOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourseFromDB,
};
