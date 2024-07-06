// This file sends success responses to client

import { Request, Response } from '.';
import config from '../config';
import { TResponse } from '../types';
import getCurrentDateTime from './getCurrentDateTime';

const sendResponse = <T>(req: Request, res: Response, data: TResponse<T>) => {
  res.status(data.code).json({
    status: data.status ?? 'unknown',
    message: data.message ?? 'No message provided',
    data: data.data ?? {},
    ...(config.nodeEnv !== 'production'
      ? {
          debugInfo: {
            method: req.method ?? 'no method provided',
            url: req.url ?? 'no url provided',
          },
        }
      : {}),
    timestamp: getCurrentDateTime(),
  });
};

export default sendResponse;
