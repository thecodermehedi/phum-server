export type TErrorResponse = {
  status: 'error';
  code: number;
  message: string;
  errorCode?: string;
  details?: Array<{
    path: string | number;
    message: string;
  }>;
  timestamp: string;
  stack?: string;
};
