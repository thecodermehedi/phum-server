class AppError extends Error {
  constructor(
    public code: number,
    message: string,
    public path?: string,
    stack?: string,
  ) {
    super(message);
    this.code = code;
    this.path = path;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
