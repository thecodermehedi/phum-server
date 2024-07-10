import { model, Schema } from '../../utils';
import { EStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.types';

const SemesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: EStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'SemesterRegistration',
  SemesterRegistrationSchema,
);
