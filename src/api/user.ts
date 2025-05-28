import { GET, PUT, POST, DELETE } from "../utils/axios";

export const refresh = async () => await GET("/refresh-token", true);

export const checkUserExistence = async (nickname: string) =>
  await GET(`/users/nicknames/existence?nickname=${nickname}`);

export const getUserInfo = async () => await GET(`/users/me`, true);

export const deleteUser = async () => await DELETE(`/users/me`, true);

export const userRegistration = async (body: any) =>
  await POST(`/users/me/registration`, body, true);

export const modifyProfile = async (body: any) =>
  await PUT(`/users/me/profile`, body, true);
