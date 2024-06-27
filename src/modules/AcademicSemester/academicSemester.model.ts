import { Schema, model } from '../../utils';
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
    throw new Error('Academic Semester is already exists!');
  }
  next();
});

const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);

export default AcademicSemesterModel;
