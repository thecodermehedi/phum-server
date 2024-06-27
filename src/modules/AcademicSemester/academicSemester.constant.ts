import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
  TMonth,
} from './academicSemester.types';

export const AcademicSemesterNames: TAcademicSemesterName[] = [
  'Summer',
  'Monsoon',
  'Fall',
  'Autumn',
  'Winter',
  'Spring',
];

export const AcademicSemesterCodes: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
];

export const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Summer: '01',
  Monsoon: '02',
  Fall: '03',
  Autumn: '04',
  Winter: '05',
  Spring: '06',
};
export const Months: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
