import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
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
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
