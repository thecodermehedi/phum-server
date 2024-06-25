import { Request, Response } from '../utils';

const globalErrorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
) => {
  return res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong',
    error: err,
  });
};

export default globalErrorHandler;
