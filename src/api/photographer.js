import { GET, PUT, POST, DELETE } from "../utils/axios";

export const checkPhotographerExistence = async (nickname) =>
  await GET(`/photographers/nicknames/existence?nickname=${nickname}`, true);
