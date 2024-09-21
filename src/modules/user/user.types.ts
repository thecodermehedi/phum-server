/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export type TUserRole = keyof typeof USER_ROLE;

export interface IUser extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
  //
  isTokenIssuedBeforePasswordChange(
    passwordChangedTimestamp: Date,
    tokenIssudedTimestamp: number,
  ): boolean;
}
