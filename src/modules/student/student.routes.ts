import { StudentControllers } from './student.controller';
import createRouter from '../../utils/createRouter';

const router = createRouter();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
