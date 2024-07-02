import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validator';

const router = createRouter();

router.get('/', StudentControllers.getStudents);

router.get('/:studentId', StudentControllers.getStudent);

router.patch('/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);

router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router;
