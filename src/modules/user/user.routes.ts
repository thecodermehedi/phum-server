import createRouter from '../../utils/createRouter';
import { UserControllers } from './user.controller';

const router = createRouter();

router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;
