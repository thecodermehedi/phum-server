import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { AdminValidations } from '../Admin/admin.validator';
import { FacultyValidations } from '../Faculty/faculty.validator';
import { StudentValidations } from '../student/student.validator';
import { UserControllers } from './user.controller';

const router = createRouter();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
