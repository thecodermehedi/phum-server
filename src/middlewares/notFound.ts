import { RequestHandler, httpStatus } from '../utils';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound: RequestHandler = (req, res, next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    sucess: false,
    message: 'Route not found',
    error: null,
  });
};

export default notFound;
