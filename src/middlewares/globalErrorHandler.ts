import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';
  const ponse = res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
  return ponse;
};

export default globalErrorHandler;
