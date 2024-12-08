/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

// This file sends error responses to client

import { ZodError } from 'zod';
import { ErrorRequestHandler, httpStatus } from '../utils';
import handleZodError from '../errors/handleZodError';
import { TErrorObject, TResponse } from '../types';
import getCurrentDateTime from '../utils/getCurrentDateTime';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  let errorCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage: string = 'Something went wrong';
  let errorDetails: Array<TErrorObject> = [{ path: '', message: 'Something went wrong' }];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorCode = simplifiedError.code;
    errorMessage =
      config.nodeEnv !== 'production' ? simplifiedError.message : 'Validation Error';
    errorDetails = simplifiedError.details;
  }

  if (err.name === 'ValidationError') {
    const shortError = handleValidationError(err);
    errorCode = shortError.code;
    errorMessage = config.nodeEnv === 'production' ? shortError.message : err.message;
    errorDetails = shortError.details;
  }

  if (err.name === 'CastError') {
    const shortError = handleCastError(err);
    errorCode = shortError.code;
    errorMessage =
      config.nodeEnv !== 'production' ? shortError.message : `Invalid ${err.kind} Error`;
    errorDetails = shortError.details;
  }

  if (err.code === 11000) {
    const shortError = handleDuplicateError(err);
    errorCode = shortError.code;
    errorMessage =
      config.nodeEnv !== 'production' ? shortError.message : 'Duplicate Key Error';
    errorDetails = shortError.details;
  }

  if (err instanceof AppError) {
    errorCode = err.code;
    errorMessage = err.message;
    errorDetails = [{ path: err.path as string | number, message: err.message }];
  }

  if (err instanceof Error) {
    errorMessage = err.message;
    errorDetails = [{ path: '', message: err.message }];
  }

  res.status(errorCode).json({
    status: 'error',
    message: errorMessage,
    details: errorDetails,
    timestamp: getCurrentDateTime(),
    ...(config.nodeEnv !== 'production'
      ? {
          debugInfo: {
            method: req.method ?? 'no method provided',
            url: req.url ?? 'no url provided',
            stack: err.stack ?? 'no stack provided',
          },
        }
      : {}),
  });
};

export default globalErrorHandler;
