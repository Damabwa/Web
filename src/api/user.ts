import { GET, PUT, POST, DELETE } from "../utils/axios";

export const refresh = async () => await GET("/refresh-token", true);

export const checkUserExistence = async (nickname: string) =>
  await GET(`/users/nicknames/existence?nickname=${nickname}`);

export const userRegistration = async (body: any) =>
  await POST(`/users/me/registration`, body, true);
