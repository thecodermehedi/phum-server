import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { httpStatus, mongoose } from '../../utils';
import { CourseSearchableFields } from './course.constant';
import { CourseFacultyModel, CourseModel } from './course.model';
import { TCourse, TCoursefaculty } from './course.types';

const createCourseIntoDB = async (payload: TCourse) => {
  return await CourseModel.create(payload);
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  return await courseQuery.modelQuery;
};

const getCourseFromDB = async (id: string) => {
  return await CourseModel.findById(id).populate('preRequisiteCourses.course');
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...rest } = payload;
  const updateCourseSession = await mongoose.startSession();

  try {
    updateCourseSession.startTransaction();

    const updatedCourse = await CourseModel.findByIdAndUpdate(id, rest, {
      new: true,
      runValidators: true,
    }).session(updateCourseSession);

    if (!updatedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!', 'courses');
    }

    if (preRequisiteCourses?.length) {
      const deletedCourses =
        preRequisiteCourses
          ?.filter((el) => el?.course && el.isDeleted)
          .map((el) => el.course) ?? [];

      if (deletedCourses.length > 0) {
        await CourseModel.findByIdAndUpdate(
          id,
          { $pull: { preRequisiteCourses: { course: { $in: deletedCourses } } } },
          { new: true, runValidators: true },
        ).session(updateCourseSession);
      }

      const newCourses =
        preRequisiteCourses?.filter((el) => el?.course && !el.isDeleted) ?? [];

      if (newCourses.length > 0) {
        await CourseModel.findByIdAndUpdate(
          id,
          { $addToSet: { preRequisiteCourses: { $each: newCourses } } },
          { new: true, runValidators: true },
        ).session(updateCourseSession);
      }
    }

    await updateCourseSession.commitTransaction();

    return await CourseModel.findById(id).populate('preRequisiteCourses.course');
  } catch (err: any) {
    await updateCourseSession.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, err.message, 'Failed to update course');
  } finally {
    await updateCourseSession.endSession();
  }
};

const deleteCourseFromDB = async (id: string) => {
  return await CourseModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  return await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCoursefaculty>,
) => {
  return await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
};

export const CourseServices = {
  createCourseIntoDB,
  getCoursesFromDB,
  getCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
};
