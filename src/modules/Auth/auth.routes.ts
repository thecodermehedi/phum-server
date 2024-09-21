import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { USER_ROLE } from '../User/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validator';

const router = createRouter();

router.post(
  '/login',
  validateRequest(AuthValidation.loginUserValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

export const AuthRoutes = router;
