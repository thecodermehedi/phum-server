import { Schema, model } from '../../utils';
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

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
