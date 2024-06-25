import { Types } from '../../utils';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// type TAddress = {
//   division: string;
//   district: string;
//   upazila: string;
//   union?: string;
//   village?: string;
//   postOffice?: string;
//   postCode: string;
// };

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  userId: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | '3rdGender';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isDeleted?: boolean;
};
