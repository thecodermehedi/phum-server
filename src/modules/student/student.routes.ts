import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './student.validator';

const router = createRouter();

router.get('/', StudentControllers.getStudents);

router.get('/:studentId', StudentControllers.getStudent);

router.patch(
  '/:studentId',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.softDeleteStudent);
router.delete('/delete/:studentId', StudentControllers.hardDeleteStudent);

export const StudentRoutes = router;
