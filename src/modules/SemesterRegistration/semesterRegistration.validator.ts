import { z } from 'zod';
import { EStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum(EStatus as [string, ...string[]]).default('UPCOMING'),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().default(3),
    maxCredit: z.number().default(15),
  }),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z.enum(EStatus as [string, ...string[]]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
