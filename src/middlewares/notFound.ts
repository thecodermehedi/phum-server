import config from '../config';
import { RequestHandler, httpStatus } from '../utils';
import getCurrentDateTime from '../utils/getCurrentDateTime';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound: RequestHandler = (req, res, _next) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: 'error',
    message: 'Resource not found',
    timestamp: getCurrentDateTime(),
    ...(config.nodeEnv !== 'production'
      ? {
          debugInfo: {
            method: req.method ?? 'no method provided',
            url: req.url ?? 'no url provided',
          },
        }
      : {}),
  });
};

export default notFound;
