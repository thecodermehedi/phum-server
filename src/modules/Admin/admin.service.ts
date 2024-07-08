import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { httpStatus, mongoose } from '../../utils';
import UserModel from '../User/user.model';
import { AdminSearchableFields } from './admin.constant';
import { AdminModel } from './admin.model';
import { TAdmin } from './admin.types';

const getAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find().populate('user'), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  return await adminQuery.modelQuery;
};

const getAdminFromDB = async (id: string) => {
  return await AdminModel.findById(id).populate('user');
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  let modifiedPayload: Record<string, unknown> = {};
  if (payload?.name) {
    const { name, ...rest } = payload;
    modifiedPayload = { ...rest };
    if (Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedPayload[`name.${key}`] = value;
      }
    }
  }
  modifiedPayload = payload;
  return await AdminModel.findByIdAndUpdate(id, modifiedPayload, {
    new: true,
    runValidators: true,
  });
};

const softDeleteAdminFromDB = async (id: string) => {
  let isDeleted: boolean = false;
  const currentSession = await mongoose.startSession();
  try {
    currentSession.startTransaction();
    const deletedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    ).session(currentSession);

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin', 'admin user');
    }
    const deletedUser = await UserModel.findByIdAndUpdate(
      deletedAdmin.user,
      { isDeleted: true },
      { new: true },
    ).session(currentSession);
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user', 'admin user');
    }
    await currentSession.commitTransaction();
    isDeleted = true;
    return isDeleted;
  } catch (err: any) {
    await currentSession.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, err.message, 'admin user');
  } finally {
    await currentSession.endSession();
  }
};

export const AdminServices = {
  getAdminsFromDB,
  getAdminFromDB,
  updateAdminIntoDB,
  softDeleteAdminFromDB,
};
