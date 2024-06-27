import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { studentValidations } from '../student/student.validator';
import { UserControllers } from './user.controller';

const router = createRouter();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
