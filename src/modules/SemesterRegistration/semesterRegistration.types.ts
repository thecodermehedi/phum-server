import { ObjectId } from '../../utils';

export type TStatus = 'UPCOMING' | 'ONGOING' | 'ENDED';

export type TSemesterRegistration = {
  academicSemester: ObjectId;
  status: TStatus;
  startDate: Date;
  endDate: Date;
  minCredit: number;
  maxCredit: number;
};
