import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validator';

const router = createRouter();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getSemesterRegistrations);

router.get('/:id', SemesterRegistrationControllers.getSemesterRegistration);

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);

router.get('/:id', SemesterRegistrationControllers.getSemesterRegistration);

router.delete('/:id', SemesterRegistrationControllers.deleteSemesterRegistration);

export const semesterRegistrationRoutes = router;
