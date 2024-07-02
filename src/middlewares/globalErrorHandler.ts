import { ZodError } from 'zod';
import { ErrorRequestHandler, httpStatus } from '../utils';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
  if (err instanceof ZodError) {
    const errorMessages =
      err.issues.length === 1
        ? err.issues[0].message
        : err.issues.map((issue) => issue.message).join(', ');
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: `${err.issues.length > 1 ? `${err.issues.length} validation error(s): ` : ''}${errorMessages}`,
      errors: err.issues,
    });
  } else {
    return res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: Object.keys(err).length === 0 ? null : err,
    });
  }
};

export default globalErrorHandler;
