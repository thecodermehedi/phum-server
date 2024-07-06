import { TReturnError } from '../types';
import { httpStatus, mongoose } from '../utils';

const handleCastError = (err: mongoose.Error.CastError): TReturnError => {
  return {
    code: httpStatus.BAD_REQUEST,
    message: err.name,
    details: [
      {
        path: err.path,
        message: err.message.split(' ').slice(0, 4).join(' '),
      },
    ],
  };
};

export default handleCastError;
