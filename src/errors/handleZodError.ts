import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse } from './error.types';
import { httpStatus } from '../utils';

const handleZodError = (err: ZodError): TErrorResponse => {
  return {
    status: 'error',
    code: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    timestamp: new Date().toISOString(),
    details: err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    }),
  };
};

export default handleZodError;
