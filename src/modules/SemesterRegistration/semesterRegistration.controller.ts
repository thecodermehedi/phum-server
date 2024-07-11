import { httpStatus, RequestHandler } from "../../utils";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(
    req.body,
  );
  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Semester Registration is created successfully!',
    data: result,
  });
});

const getSemesterRegistrations: RequestHandler = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationService.getSemesterRegistrationsFromDB(
    req.query,
  );

  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Semester Registration is retrieved successfully !',
    data: result,
  });
});

const getSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result =
    await SemesterRegistrationService.getSemesterRegistrationFromDB(id);

  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Semester Registration is retrieved successfully',
    data: result,
  });
});

const updateSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
    id,
    req.body,
  );

  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Semester Registration is updated successfully',
    data: result,
  });
});

const deleteSemesterRegistration: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegistrationService.deleteSemesterRegistrationFromDB(id);

  sendResponse(req, res, {
    code: httpStatus.OK,
    status: 'success',
    message: 'Semester Registration is updated successfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getSemesterRegistrations,
  getSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
