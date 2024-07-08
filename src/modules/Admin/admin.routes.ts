import validateRequest from '../../middlewares/validateRequest';
import createRouter from '../../utils/createRouter';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validator';

const router = createRouter();

router.get('/', AdminControllers.getAdmins);

router.get('/:id', AdminControllers.getAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:id', AdminControllers.softDeleteAdmin);

export const AdminRoutes = router;
