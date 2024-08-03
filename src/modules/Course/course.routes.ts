import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { USER_ROLE } from '../User/user.constant';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validator';

const router = createRouter();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getCourses);

router.get('/:id', CourseControllers.getCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
