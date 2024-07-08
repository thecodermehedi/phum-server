import { ObjectId } from '../../utils';
import { TBloodGroup, TFullName, TGender } from '../student/student.types';

export type TAdmin = {
  id: string;
  user: ObjectId;
  designation: string;
  name: TFullName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  isDeleted: boolean;
};
