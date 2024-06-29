import { Types } from '../../utils';
import { AcademicSemesterNameCodeMapper } from './AcademicSemester.constant';
import AcademicSemesterModel from './AcademicSemester.model';
import { TAcademicSemester } from './AcademicSemester.types';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) return null;
  return await AcademicSemesterModel.create(payload);
};

const getSingleAcademicSemesterFromDB = async (semesterId: string) => {
  return AcademicSemesterModel.aggregate([
    { $match: { _id: new Types.ObjectId(semesterId) } },
  ]);
};

const getAllAcademicSemesterFromDB = () => AcademicSemesterModel.find();

const updateSingleAcademicSemesterFromDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  return await AcademicSemesterModel.findByIdAndUpdate(semesterId, payload, {
    new: true,
  });
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getSingleAcademicSemesterFromDB,
  getAllAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
