import { TErrorObject, TReturnError } from '../types';
import { httpStatus, mongoose } from '../utils';

type TMongooseError = mongoose.Error.ValidatorError | mongoose.Error.CastError;

const handleValidationError = (err: mongoose.Error.ValidationError): TReturnError => {
  return {
    code: httpStatus.BAD_REQUEST,
    message: 'Mongoose Error',
    details: Object.values(err.errors).map((issue: TMongooseError): TErrorObject => {
      return {
        path: issue?.path,
        message: issue?.message,
      };
    }),
  };
};

export default handleValidationError;
