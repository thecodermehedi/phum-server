import { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { upload } from '../../utils/multer';
import { AdminValidations } from '../Admin/admin.validator';
import { FacultyValidations } from '../Faculty/faculty.validator';
import { StudentValidations } from '../student/student.validator';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { userValidations } from './user.validator';

const router = createRouter();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  //TODO: auth middleware will be commented out until we have a super admin
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);


router.get('/me', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), UserControllers.getMe);

router.patch('/change-status/:userId', auth(USER_ROLE.admin), validateRequest(userValidations.statusUpdateValidationSchema), UserControllers.changeStatus);

export const UserRoutes = router;
