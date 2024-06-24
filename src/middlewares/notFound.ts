import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const ponse = res.status(httpStatus.NOT_FOUND).json({
    sucess: false,
    message: 'Route not found',
    error: null,
  });
  return ponse;
};

export default notFound;
