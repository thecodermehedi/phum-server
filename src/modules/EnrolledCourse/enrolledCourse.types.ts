import { ObjectId } from '../../utils';

export type TGrade = 'A' | 'B' | 'C' | 'D' | 'F' | 'N/A';

export type TEnrolledCourseMarks = {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
};

export type TEnrolledCourse = {
  semesterRegistered: ObjectId;
  academicSemester: ObjectId;
  academicFaculty: ObjectId;
  academicDepartment: ObjectId;
  offeredCourse: ObjectId;
  course: ObjectId;
  student: ObjectId;
  faculty: ObjectId;
  isEnrolled: boolean;
  courseMarks: TEnrolledCourseMarks;
  grade: TGrade;
  gradePoints: number;
  isCompleted: boolean;
};
