export type TStatus = 'success' | 'error' | 'created' | 'no_content';

export type TErrorObject = {
  path: string | number;
  message: string;
};

type TDebugInfo = {
  method: string;
  url: string;
  stack?: string;
};

export type TResponse<T> = {
  status: TStatus;
  code: number;
  message: string;
  data?: T;
  errorCode?: string;
  details?: Array<TErrorObject>;
  timestamp?: string;
  debugInfo?: TDebugInfo;
};

export type TReturnError = {
  code: number;
  message: string;
  details: Array<TErrorObject>;
};
