import AppError from '../../errors/AppError';
import { httpStatus, RequestHandler } from '../../utils';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
const getAdmins: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminsFromDB(req.query);
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No admins found in the database', 'admins');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: `Admins ( ${result.length} ) are retrieved successfully`,
    data: result,
  });
});

const getAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminFromDB(req.params.id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found in the database', 'admins');
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Admin is retrieved successfully',
    data: result,
  });
});

const updateAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminIntoDB(req.params.id, req.body.admin);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Admin is not updated succesfully',
      'admins',
    );
  }
  sendResponse(req, res, {
    status: 'success',
    code: httpStatus.OK,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const softDeleteAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await AdminServices.softDeleteAdminFromDB(req.params.id);
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Admin is not deleted succesfully',
      'admins',
    );
  }
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'no_content',
    message: 'Admin is deleted successfully',
  });
});

export const AdminControllers = {
  getAdmins,
  getAdmin,
  updateAdmin,
  softDeleteAdmin,
};
