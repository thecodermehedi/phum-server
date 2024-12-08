import config from '../config';
import { USER_ROLE } from '../modules/User/user.constant';
import UserModel from '../modules/User/user.model';

const superAdmin = {
  id: '0001',
  email: 'thecodermehedi@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superadmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExits = await UserModel.findOne({ role: USER_ROLE.superadmin });
  if (!isSuperAdminExits) {
    await UserModel.create(superAdmin);
  }
};

export default seedSuperAdmin;
