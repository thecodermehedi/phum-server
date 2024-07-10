import { TStatus } from './semesterRegistration.types';

export const EStatus: Array<TStatus> = ['UPCOMING', 'ONGOING', 'ENDED'];

export const RegistrationStatus = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  ENDED: 'ENDED',
} as const;
