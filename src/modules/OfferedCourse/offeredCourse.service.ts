import { httpStatus, ObjectId } from "../../utils";
import AppError from "../../errors/AppError";
import { TOfferedCourse } from "./offeredCourse.types";
import { SemesterRegistrationModel } from "../SemesterRegistration/semesterRegistration.model";
import { AcademicDepartmentModel } from "../AcademicDepartment/academicDepartment.model";
import { CourseModel } from "../Course/course.model";
import { FacultyModel } from "../Faculty/faculty.model";
import { OfferedCourseModel } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";
import { AcademicFacultyModel } from "../AcademicFaculty/academicFaculty.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  //? Function to check if a document with the given id exists in the database
  const checkIfExists = async (Model: any, id: ObjectId, errorMessage: string) => {
    const exists = await Model.findById(id);
    if (!exists) {
      throw new AppError(httpStatus.NOT_FOUND, errorMessage);
    }
  };

  //? Check if required documents exist
  await checkIfExists(SemesterRegistrationModel, semesterRegistration, 'Semester registration not found !');
  await checkIfExists(AcademicFacultyModel, academicFaculty, 'Academic Faculty not found !');
  await checkIfExists(AcademicDepartmentModel, academicDepartment, 'Academic Department not found !');
  await checkIfExists(CourseModel, course, 'Course not found !');
  await checkIfExists(FacultyModel, faculty, 'Faculty not found !');

  //? Check if the academic department belongs to the specified faculty inline
  if (!await AcademicDepartmentModel.findOne({ _id: academicDepartment, academicFaculty })) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This department does not belong to this faculty');
  }

  //? Check for existing offered course with the same section
  if (await OfferedCourseModel.findOne({ semesterRegistration, course, section })) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Offered course with same section already exists!');
  }

  //? Check for time conflicts with assigned schedules
  const assignedSchedules = await OfferedCourseModel.find({ semesterRegistration, faculty, days: { $in: days } }).select('days startTime endTime');
  if (hasTimeConflict(assignedSchedules, { days, startTime, endTime })) {
    throw new AppError(httpStatus.CONFLICT, 'This faculty is not available at that time! Choose another time or day');
  }

  //? Create and return the OfferedCourse document
  const academicSemester = (await SemesterRegistrationModel.findById(semesterRegistration))?.academicSemester;
  return OfferedCourseModel.create({ ...payload, academicSemester });
};

const getOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const queryModel = OfferedCourseModel.find()
  const offeredCourseQuery = new QueryBuilder(queryModel, query)
  const finalQuery = offeredCourseQuery.filter().sort().paginate().fields();
  return await finalQuery.modelQuery;
};

const getOfferedCourseFromDB = async (id: string) => {
  return await OfferedCourseModel.findById(id);
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }

  const isFacultyExists = await FacultyModel.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  // get the schedules of the faculties


  // Checking the status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    );
  }

  // check if the faculty is available at that time.
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    );
  }

  return await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

const deleteOfferedCourseFromDB = async (id: string) => {
  const isOfferedCourseExists = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found');
  }

  const semesterRegistation = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistation).select('status');

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course can not update ! because the semester ${semesterRegistrationStatus}`,
    );
  }
  return await OfferedCourseModel.findByIdAndDelete(id);
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getOfferedCoursesFromDB,
  getOfferedCourseFromDB,
  deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
