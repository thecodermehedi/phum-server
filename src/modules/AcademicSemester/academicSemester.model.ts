import AppError from '../../errors/AppError';
import { Schema, httpStatus, model } from '../../utils';
import {
  AcademicSemesterCodes,
  AcademicSemesterNames,
  Months,
} from './AcademicSemester.constant';
import { TAcademicSemester } from './AcademicSemester.types';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save', async function (next) {
  const isAcademicSemesterExists = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isAcademicSemesterExists) {
    throw new AppError(httpStatus.CONFLICT, 'Academic Semester is already exists!');
  }
  next();
});

AcademicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const id = this.getQuery()._id;
  const existingDepartment = await AcademicSemesterModel.findById(id);
  if (!existingDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found!');
  }
  next();
});

const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);

export default AcademicSemesterModel;
