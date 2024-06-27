import createRouter from '../../utils/createRouter';
import { StudentControllers } from './student.controller';

const router = createRouter();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
