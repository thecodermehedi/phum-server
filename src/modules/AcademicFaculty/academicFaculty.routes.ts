import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validator';

const router = createRouter();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAcademicFaculties);

router.get('/:id', AcademicFacultyControllers.getAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
