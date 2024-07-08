import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { FacultyControllers } from './faculty.controller';
import { FacultyValidations } from './faculty.validator';

const router = createRouter();

router.get('/', FacultyControllers.getFaculties);

router.get('/:id', FacultyControllers.getFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.softDeleteFaculty);

export const FacultyRoutes = router;
