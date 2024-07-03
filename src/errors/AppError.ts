class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
