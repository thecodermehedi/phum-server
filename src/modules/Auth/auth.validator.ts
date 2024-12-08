import { z } from 'zod';

const loginUserValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    }),
    password: z.string({
      required_error: 'PASSWORD is required',
      invalid_type_error: 'PASSWORD must be a string',
    }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: ' OLD PASSWORD is required',
      invalid_type_error: ' OLD PASSWORD must be a string',
    }),
    newPassword: z.string({
      required_error: 'NEW PASSWORD is required',
      invalid_type_error: 'NEW PASSWORD must be a string',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'REFRESH TOKEN is required',
      invalid_type_error: 'REFRESH TOKEN must be a string',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    }),
    newPassword: z.string({
      required_error: 'NEW PASSWORD is required',
      invalid_type_error: 'NEW PASSWORD must be a string',
    }),
  }),
});

export const AuthValidation = {
  loginUserValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
