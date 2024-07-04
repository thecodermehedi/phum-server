import { ZodError, ZodIssue } from 'zod';
import { TErrorObject, TReturnError } from '../types';
import httpStatus from 'http-status';
const handleZodError = (err: ZodError): TReturnError => {
  return {
    code: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    details: err.issues.map((issue: ZodIssue): TErrorObject => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    }),
  };
};

export default handleZodError;
