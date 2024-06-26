import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { studentValidations } from '../student/student.validator';
import { UserControllers } from './user.controller';

const router = createRouter();

router.post('/create-student', validateRequest(studentValidations.studentValidationSchema), UserControllers.createStudent);

export const UserRoutes = router;
