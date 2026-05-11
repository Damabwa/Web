import { GET, PUT, POST, DELETE } from "../utils/axios";
import { ModifyProfileBody, UserInfo, UserRegistrationBody } from "../types/user";
import { RegistrationResponse } from "../types/common";

export const refresh = async () => await GET("/refresh-token", true);

export const checkUserExistence = async (nickname: string) =>
  await GET<{ exists: boolean }>(`/users/nicknames/existence?nickname=${nickname}`);

export const getUserInfo = async () => await GET<UserInfo>(`/users/me`, true);

export const deleteUser = async () => await DELETE(`/users/me`, true);

export const createUser = async (body: UserRegistrationBody) =>
  await POST<RegistrationResponse>(`/users/me/registration`, body, true);

export const updateProfile = async (body: ModifyProfileBody) =>
  await PUT<UserInfo>(`/users/me/profile`, body, true);
