import { model, Schema, Types } from '../../utils';
import { TCourse, TCoursefaculty, TPreRequisiteCourse } from './course.types';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourse>(
  {
    course: {
      type: Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const CourseModel = model<TCourse>('Course', CourseSchema);

const CourseFacultySchema = new Schema<TCoursefaculty>({
  course: {
    type: Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFacultyModel = model<TCoursefaculty>(
  'CourseFaculty',
  CourseFacultySchema,
);
