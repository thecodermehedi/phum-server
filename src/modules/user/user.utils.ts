import { TAcademicSemester } from '../AcademicSemester/academicSemester.types';
import UserModel from './user.model';

// (year)-> 2024 (SemesterCode)-> 01 (default 4 digit number)-> 0000
// StudentId Format -->: 2024010000
const findLastStudentId = async () => {
  const lastStudentId = (
    await UserModel.findOne({ role: 'student' }, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean()
  )?.id;
  return lastStudentId
    ? {
      year: lastStudentId.substring(0, 4),
      code: lastStudentId.substring(4, 6),
      suffixId: lastStudentId.substring(6),
    }
    : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const lastStudentId = await findLastStudentId();

  const isSameSemesterAndYear =
    lastStudentId?.year === payload.year && lastStudentId?.code === payload.code;

  const studentIdSuffix = isSameSemesterAndYear ? lastStudentId?.suffixId : '0000';

  const incrementedSuffix = String(Number(studentIdSuffix) + 1).padStart(4, '0');

  return `${payload.year}${payload.code}${incrementedSuffix}`;
};

// FacultyId Format -->: F-0000
const findLastFacultyId = async () => {
  const lastFacultyId = (
    await UserModel.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean()
  )?.id;
  return lastFacultyId ? Number(lastFacultyId.substring(2)) : undefined;
};

export const generateFacultyId = async () => {
  const lastFaultyId = await findLastFacultyId();
  const facultyIdSuffix = lastFaultyId ? lastFaultyId : '0000';
  const incrementedSuffix = String(Number(facultyIdSuffix) + 1).padStart(4, '0');
  return `F-${incrementedSuffix}`;
};

// AdminId Format -->: A-0000
const findLastAdminId = async () => {
  const lastAdminId = (
    await UserModel.findOne({ role: 'admin' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean()
  )?.id;
  return lastAdminId ? Number(lastAdminId.substring(2)) : undefined;
};

export const generateAdminId = async () => {
  const lastAdminId = await findLastAdminId();
  const adminIdSuffix = lastAdminId ? lastAdminId : '0000';
  const incrementedSuffix = String(Number(adminIdSuffix) + 1).padStart(4, '0');
  return `A-${incrementedSuffix}`;
};
