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

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let statusMessage: string = 'Something went wrong'
  let statusDetails: Array<TErrorObject> = [{ path: '', message: 'Something went wrong' }]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.code;
    statusMessage = config.nodeEnv !== 'production' ? simplifiedError.message : 'Validation Error';
    statusDetails = simplifiedError.details
  }

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.code;
    statusMessage = config.nodeEnv === 'production' ? simplifiedError.message : err.message;
    statusDetails = simplifiedError.details
  }

  return res.status(statusCode).json({
    status: 'error',
    message: statusMessage,
    details: statusDetails,
    old: err,
    timestamp: getCurrentDateTime(),
    ...(config.nodeEnv !== 'production' ? { debugInfo: { method: req.method ?? 'no method provided', url: req.url ?? 'no url provided', stack: err.stack ?? 'no stack provided' } } : {}),
  })
};

export default globalErrorHandler;
