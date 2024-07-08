import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { AcademicSemesterControllers } from './AcademicSemester.controller';
import { AcademicSemesterValidations } from './AcademicSemester.validator';

const router = createRouter();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAcademicSemesters);

router.get('/:id', AcademicSemesterControllers.getAcademicSemester);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
