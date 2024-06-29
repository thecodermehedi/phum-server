import { TAcademicSemester } from '../AcademicSemester/academicSemester.types';
import UserModel from './user.model';

// StudentId Format -->: 2024(year) 01 (SemesterCode) 0000 (default 4 digit number)

const findLastStudentId = async () => {
  const lastStudentId = (
    await UserModel.findOne({ role: 'student' }, { id: 1 }).sort({ createdAt: -1 }).lean()
  )?.id;
  return lastStudentId
    ? {
        year: lastStudentId.substring(0, 4),
        code: lastStudentId.substring(4, 6),
        suffixId: lastStudentId.substring(6),
      }
    : {};
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudentId();

  const isSameSemesterAndYear =
    lastStudentId.year === payload.year && lastStudentId.code === payload.code;

  const studentIdSuffix = isSameSemesterAndYear ? lastStudentId.suffixId : '0000';

  const incrementedSuffix = String(Number(studentIdSuffix) + 1).padStart(4, '0');

  return `${payload.year}${payload.code}${incrementedSuffix}`;
};
