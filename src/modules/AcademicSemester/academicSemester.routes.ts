import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { USER_ROLE } from '../User/user.constant';
import { AcademicSemesterControllers } from './AcademicSemester.controller';
import { AcademicSemesterValidations } from './AcademicSemester.validator';

const router = createRouter();

router.post(
 '/create-academic-semester',
 auth(USER_ROLE.superadmin, USER_ROLE.admin),
 validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
 AcademicSemesterControllers.createAcademicSemester,
);

router.get(
 '/',
 auth(USER_ROLE.superadmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
 AcademicSemesterControllers.getAcademicSemesters,
);

router.get('/:id', auth(USER_ROLE.superadmin, USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), AcademicSemesterControllers.getAcademicSemester);

router.patch(
 '/:id',
 auth(USER_ROLE.superadmin, USER_ROLE.admin),
 validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
 AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
