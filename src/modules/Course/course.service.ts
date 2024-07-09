import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { CourseModel } from "./course.model"
import { TCourse } from "./course.types"

const createCourseIntoDB = async (payload: TCourse) => {
  return await CourseModel.create(payload)
}

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find()/* .populate('preRequisiteCourses.course') */, query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  return await courseQuery.modelQuery;
}

const getCourseFromDB = async (id: string) => {
  return await CourseModel.findById(id).populate('preRequisiteCourses.course')
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  

  // return await CourseModel.findByIdAndUpdate(id,  payload, {new: true}).session()
}

const deleteCourseFromDB = async (id: string) => {
  // return await CourseModel.findByIdAndUpdate(id, { isDelered: true }, { new: true }).session()
}

export const CourseServices = {
  createCourseIntoDB,
  getCoursesFromDB,
  getCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB
}
