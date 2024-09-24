import { z } from 'zod';
import { userStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(20, {
      message: 'Password cannot me more than 20 characters',
    })
    .optional(),
});

const statusUpdateValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});

export const userValidations = {
  userValidationSchema,
  statusUpdateValidationSchema,
};
