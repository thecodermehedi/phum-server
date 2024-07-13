/* eslint-disable @typescript-eslint/no-explicit-any */
import { TReturnError } from '../types';
import { httpStatus } from '../utils';

const handleDuplicateError = (err: any): TReturnError => {
  const match = err.errorResponse.errmsg.match(/{ (\w+): "([^"]+)" }/);
  const result = match ? { key: match[1], value: match[2] } : null;
  return {
    code: httpStatus.CONFLICT,
    message: 'MongoServerError',
    details: [
      {
        path: result?.key,
        message: `${result?.value} is already exists`,
      },
    ],
  };
};

export default handleDuplicateError;
