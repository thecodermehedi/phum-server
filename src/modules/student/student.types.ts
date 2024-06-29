import { ObjectId } from '../../utils';

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
export type TGender = 'male' | 'female' | '3rdGender';
export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

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
  userId: ObjectId;
  name: TUserName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: ObjectId;
  profileImg?: string;
  isDeleted?: boolean;
};
