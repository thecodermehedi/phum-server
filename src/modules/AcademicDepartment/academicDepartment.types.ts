import { ObjectId } from '../../utils';

export type TAcademicDepartment = {
  name: string;
  academicFaculty: ObjectId;
};
