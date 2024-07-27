import { AnyZodObject } from 'zod';
import { RequestHandler } from '../utils';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject): RequestHandler => {
  return catchAsync(async (req, res, next) => {
    await schema.parseAsync({ body: req.body });
    next();
  })
};

export default validateRequest;
