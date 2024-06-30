import createRouter from '../../utils/createRouter';
import { StudentControllers } from './student.controller';

const router = createRouter();

router.get('/', StudentControllers.getStudents);

router.get('/:studentId', StudentControllers.getStudent);

export const StudentRoutes = router;
