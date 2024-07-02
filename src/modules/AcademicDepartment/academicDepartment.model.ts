import AppError from '../../errors/AppError';
import { Schema, Types, httpStatus, model } from '../../utils';
import { TAcademicDepartment } from './academicDepartment.types';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const isAcademicFacultyExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isAcademicFacultyExists) {
    throw new AppError(httpStatus.CONFLICT, 'Academic Department is already exists!');
  }
  next();
});

AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const id = this.getQuery()._id;
  const existingDepartment = await AcademicDepartmentModel.findById(id);
  if (!existingDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found!');
  }

  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
