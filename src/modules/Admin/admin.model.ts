import { model, Schema } from '../../utils';
import { BloodGroups, Genders } from '../student/student.constant';
import { userNameSchema } from '../student/student.model';
import { TAdmin } from './admin.types';

const AdminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Genders,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroups,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

AdminSchema.virtual('fullName').get(function () {
  const { firstName, middleName, lastName } = this.name;
  if (middleName) {
    return `${firstName} ${middleName} ${lastName}`;
  } else {
    return `${firstName} ${lastName}`;
  }
});

AdminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const AdminModel = model<TAdmin>('Admin', AdminSchema);
