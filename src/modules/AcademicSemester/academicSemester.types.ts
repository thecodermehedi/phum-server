export type TAcademicSemesterName =
  | 'Summer'
  | 'Monsoon'
  | 'Fall'
  | 'Autumn'
  | 'Winter'
  | 'Spring';
export type TAcademicSemesterCode = '01' | '02' | '03' | '04' | '05' | '06';
export type TAcademicSemesterNameCodeMapper = { [key: string]: string };
export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};
