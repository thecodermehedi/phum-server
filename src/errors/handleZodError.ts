import { ZodError, ZodIssue } from 'zod';
import { TErrorObject, TReturnError } from '../types';
import { httpStatus } from '../utils';
const handleZodError = (err: ZodError): TReturnError => {
  return {
    code: httpStatus.BAD_REQUEST,
    message: err.name,
    details: err.issues.map((issue: ZodIssue): TErrorObject => {
      return {
        path: issue.path.join(' --> '),
        message: issue.message,
      };
    }),
  };
};

export default handleZodError;
