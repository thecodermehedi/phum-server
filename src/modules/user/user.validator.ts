import { z } from 'zod';

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

export const userValidations = {
  userValidationSchema,
};
