import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { AcademicSemesterControllers } from './AcademicSemester.controller';
import { AcademicSemesterValidations } from './AcademicSemester.validator';

const router = createRouter();

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);

router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);

router.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

// router.delete('/:semesterId', AcademicSemesterControllers.deleteSingleAcademicSemester);

export const AcademicSemesterRoutes = router;
