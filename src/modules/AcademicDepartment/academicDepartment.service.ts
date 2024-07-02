import { AcademicDepartmentModel } from './academicDepartment.model';
import { TAcademicDepartment } from './academicDepartment.types';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartmentModel.create(payload);
};

const getAcademicDepartmentFromDB = (departmentId: string) =>
  AcademicDepartmentModel.findById(departmentId).populate('academicFaculty');

const getAcademicFacultiesFromDB = () => AcademicDepartmentModel.find().populate('academicFaculty');

const updateAcademicDepartmentFromDB = async (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) => {
  return await AcademicDepartmentModel.findByIdAndUpdate(departmentId, payload, {
    new: true,
  });
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentFromDB,
  getAcademicFacultiesFromDB,
  updateAcademicDepartmentFromDB,
};
