class AppError extends Error {
  constructor(
    public code: number,
    message: string,
    stack?: string,
  ) {
    super(message);
    this.code = code;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
