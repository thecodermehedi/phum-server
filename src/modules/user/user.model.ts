import bcrypt from 'bcrypt';
import { Schema, model } from '../../utils';
import { IUser, TUser } from './user.types';
import config from '../../config';

const userSchema = new Schema<TUser, IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: { type: Date, default: '1970-01-01' },
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

userSchema.statics.isUserExistsByCustomId = async (id: string) =>
  await UserModel.findOne({ id }).select('+password');

userSchema.statics.isPasswordMatched = async (plainTextPassword, hashedPassword) =>
  await bcrypt.compare(plainTextPassword, hashedPassword);

userSchema.statics.isTokenIssuedBeforePasswordChange = (
  passwordChangedTimestamp: Date,
  tokenIssudedTimestamp: number,
) => new Date(passwordChangedTimestamp).getTime() / 1000 > tokenIssudedTimestamp;

const UserModel = model<TUser, IUser>('User', userSchema);

export default UserModel;
