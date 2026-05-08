import { GET, PUT, POST, DELETE } from "../utils/axios";
import { ModifyProfileBody, RegistrationResponse, UserInfo, UserRegistrationBody } from "../types/user";

export const refresh = async () => await GET("/refresh-token", true);

export const checkUserExistence = async (nickname: string) =>
  await GET<{ exists: boolean }>(`/users/nicknames/existence?nickname=${nickname}`);

export const getUserInfo = async () => await GET<UserInfo>(`/users/me`, true);

export const deleteUser = async () => await DELETE(`/users/me`, true);

export const userRegistration = async (body: UserRegistrationBody) =>
  await POST<RegistrationResponse>(`/users/me/registration`, body, true);

export const modifyProfile = async (body: ModifyProfileBody) =>
  await PUT<UserInfo>(`/users/me/profile`, body, true);
