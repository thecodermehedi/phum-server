import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { SemesterRegistrationModel } from "./semesterRegistration.model";
import { TSemesterRegistration } from "./semesterRegistration.types";
import AcademicSemesterModel from "../AcademicSemester/AcademicSemester.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { mongoose } from "../../utils";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

  //? Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester = await SemesterRegistrationModel.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });

  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    );
  }

  //? Check if the semester is exist
  const isAcademicSemesterExists = await AcademicSemesterModel.findById(payload?.academicSemester);
  if (!isAcademicSemesterExists) throw new AppError(httpStatus.NOT_FOUND, 'This academic semester not found !');

  //? Check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({ academicSemester: payload.academicSemester });
  if (isSemesterRegistrationExists) throw new AppError(httpStatus.CONFLICT, 'This semester is already registered!');

  //? Create the semester registration
  return await SemesterRegistrationModel.create(payload);

};

const getSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
  const queryModel = SemesterRegistrationModel.find().populate('academicSemester');
  const semesterRegistrationQuery = new QueryBuilder(queryModel, query)
  const finalQuery = semesterRegistrationQuery.filter().sort().paginate().fields()
  return await finalQuery.modelQuery;
};

const getSemesterRegistrationFromDB = async (id: string) => {
  return await SemesterRegistrationModel.findById(id);
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {

  //? Check if the requested semester registration exists
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(id);
  if (!isSemesterRegistrationExists) throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');

  //? Get the current status and requested status
  const currentStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  //? Handle case where the semester is already ended
  if (currentStatus === RegistrationStatus.ENDED) throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentStatus}`);

  //? Check for invalid status transitions
  const invalidTransitionMsg = `You cannot directly change status from ${currentStatus} to ${requestedStatus}`;
  if ((currentStatus === RegistrationStatus.UPCOMING && requestedStatus === RegistrationStatus.ENDED) || (currentStatus === RegistrationStatus.ONGOING && requestedStatus === RegistrationStatus.UPCOMING)) throw new AppError(httpStatus.BAD_REQUEST, invalidTransitionMsg);

  //? Update the semester registration and return the result
  return await SemesterRegistrationModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

const deleteSemesterRegistrationFromDB = async (id: string) => {

  //? Check if the semester registration exists
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) throw new AppError(httpStatus.NOT_FOUND, 'This registered semester is not found !');

  //? Get the current status of the semester registration
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  //? Ensure the semester registration status is 'UPCOMING' for update
  if (semesterRegistrationStatus !== 'UPCOMING') throw new AppError(httpStatus.BAD_REQUEST, `You can not update as the registered semester is ${semesterRegistrationStatus}`);

  //? Start a new session for deleting the semester registration
  const deleteSession = await mongoose.startSession();

  try {
    //? Start a transaction within the session
    deleteSession.startTransaction();

    //? Delete associated offered courses with the session
    const deletedOfferedCourse = await OfferedCourseModel.deleteMany({ semesterRegistration: id }).session(deleteSession);

    if (!deletedOfferedCourse) throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete associated offered courses !');

    //? Delete the semester registration with the session
    const deletedSemesterRegistration = await SemesterRegistrationModel.findByIdAndDelete(id, { new: true }).session(deleteSession);

    if (!deletedSemesterRegistration) throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete semester registration !');

    //? Commit the transaction and return null
    await deleteSession.commitTransaction();
    return null;
    
  } catch (error: any) {
    //? In case of an error, abort the transaction and throw an error
    await deleteSession.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message, 'An error occurred while deleting semester registration');
  } finally {
    //? End the session after completion
    await deleteSession.endSession();
  }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationsFromDB,
  getSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
