import AppError from '../../errors/AppError';
import { Schema, httpStatus, model } from '../../utils';
import { TAcademicFaculty } from './academicFaculty.types';

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

AcademicFacultySchema.pre('save', async function (next) {
  const isAcademicFacultyExists = await AcademicFacultyModel.findOne({
    name: this.name,
  });
  if (isAcademicFacultyExists) {
    throw new AppError(httpStatus.CONFLICT, 'Academic Faculty is already exists!');
  }
  next();
});

AcademicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const id = this.getQuery()._id;
  const existingDepartment = await AcademicFacultyModel.findById(id);
  if (!existingDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found!');
  }

  next();
});

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
