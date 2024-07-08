import { AcademicDepartmentModel } from './academicDepartment.model';
import { TAcademicDepartment } from './academicDepartment.types';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  return await AcademicDepartmentModel.create(payload);
};

const getAcademicDepartmentFromDB = (id: string) =>
  AcademicDepartmentModel.findById(id).populate('academicFaculty');

const getAcademicDepartmentsFromDB = () =>
  AcademicDepartmentModel.find().populate('academicFaculty');

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  return await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentFromDB,
  getAcademicDepartmentsFromDB,
  updateAcademicDepartmentFromDB,
};
