import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterNameCodeMapper } from './AcademicSemester.constant';
import AcademicSemesterModel from './AcademicSemester.model';
import { TAcademicSemester } from './AcademicSemester.types';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) return null;
  return await AcademicSemesterModel.create(payload);
};

const getAcademicSemesterFromDB = async (semesterId: string) =>
  AcademicSemesterModel.findById(semesterId);

const getAcademicSemestersFromDB = () => AcademicSemesterModel.find();

const updateAcademicSemesterFromDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code', 'name & code');
  }
  return await AcademicSemesterModel.findByIdAndUpdate(semesterId, payload, {
    new: true,
  });
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getAcademicSemestersFromDB,
  updateAcademicSemesterFromDB,
};
