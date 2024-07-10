import { ObjectId } from '../../utils';

export type TPreRequisiteCourse = {
  course: ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: Array<TPreRequisiteCourse>;
  isDeleted: boolean;
};

export type TCoursefaculty = {
  course: ObjectId;
  faculties: Array<ObjectId>;
};
