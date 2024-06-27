import { StudentRoutes } from '../modules/student/student.routes';
import { UserRoutes } from '../modules/User/user.routes';
import createRouter from '../utils/createRouter';
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.routes';

const router = createRouter();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
