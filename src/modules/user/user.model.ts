import bcrypt from 'bcrypt';
import { Schema, model } from '../../utils';
import { TUser } from './user.types';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(user.password, config.bcrypt_salt_rounds);
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

const UserModel = model<TUser>('User', userSchema);

export default UserModel;
