import { AcademicFacultyModel } from './academicFaculty.model';
import { TAcademicFaculty } from './academicFaculty.types';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  return await AcademicFacultyModel.create(payload);
};

const getAcademicFacultyFromDB = (facultyId: string) =>
  AcademicFacultyModel.findById(facultyId);

const getAcademicFacultiesFromDB = () => AcademicFacultyModel.find();

const updateAcademicFacultyFromDB = async (
  facultyId: string,
  payload: Partial<TAcademicFaculty>,
) => {
  return await AcademicFacultyModel.findByIdAndUpdate(facultyId, payload, { new: true });
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultyFromDB,
  getAcademicFacultiesFromDB,
  updateAcademicFacultyFromDB,
};
