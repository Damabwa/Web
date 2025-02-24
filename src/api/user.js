import { GET, PUT, POST, DELETE } from "../utils/axios";

export const checkUserExistence = async (nickname) =>
  await GET(`/users/nicknames/existence?nickname=${nickname}`, true);
