import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import { AcademicDepartmentValidations } from './academicDepartment.validator';

const router = createRouter();

router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAcademicDepartments);

router.get('/:id', AcademicDepartmentControllers.getAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
