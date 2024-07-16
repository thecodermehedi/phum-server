import { httpStatus } from "../../utils"
import AppError from "../../errors/AppError"
import UserModel from "../User/user.model"
import { TLoginUser } from "./auth.types"

const loginUser = async (payload: TLoginUser) => {
  //? Check if the user exists
  const user = await UserModel.findOne({ id: payload?.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exists");
  }

  //? Check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "User is deleted")
  }

  //? Check if the user's status is blocked
  if (user?.status === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked")
  }

  //? Check if the password is correct
  // if (user.password === payload.password) {

  // }

}

const changePassword = () => {

}

const refreshToken = () => {

}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken
}
