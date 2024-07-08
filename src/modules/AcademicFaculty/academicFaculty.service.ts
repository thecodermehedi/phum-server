import { AcademicFacultyModel } from './academicFaculty.model';
import { TAcademicFaculty } from './academicFaculty.types';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  return await AcademicFacultyModel.create(payload);
};

const getAcademicFacultyFromDB = (id: string) => AcademicFacultyModel.findById(id);

const getAcademicFacultiesFromDB = () => AcademicFacultyModel.find();

const updateAcademicFacultyFromDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  return await AcademicFacultyModel.findByIdAndUpdate(id, payload, { new: true });
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultyFromDB,
  getAcademicFacultiesFromDB,
  updateAcademicFacultyFromDB,
};
