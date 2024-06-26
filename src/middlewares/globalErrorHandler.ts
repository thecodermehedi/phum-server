import { ZodError } from 'zod';
import { ErrorRequestHandler } from '../utils';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next
) => {
  if (err instanceof ZodError) {
    const errorMessages =
      err.issues.length === 1
        ? err.issues[0].message
        : err.issues.map((issue) => issue.message).join(', ');
    res.status(400).json({
      success: false,
      message: `${err.issues.length > 1 ? `${err.issues.length} validation error(s): ` : ''}${errorMessages}`,
      errors: err.issues,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export default globalErrorHandler;
