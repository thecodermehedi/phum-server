export type TLoginUser = {
  id: string;
  password: string;
};

export type TChangePasswordPayload = { oldPassword: string; newPassword: string }
