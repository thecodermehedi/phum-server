import { Request, Response } from '../utils';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    sucess: false,
    message: 'Route not found',
    error: null,
  });
};

export default notFound;
