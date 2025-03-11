import { GET, PUT, POST, DELETE } from "../utils/axios";

export const checkPhotographerExistence = async (nickname: string) =>
  await GET(`/photographers/nicknames/existence?nickname=${nickname}`);

export const photographerRegistration = async (body: any) =>
  await POST(`/photographers/me/registration`, body, true);

export const getPhotographerInfo = async (photographerId: number) =>
  await GET(`/photographers/${photographerId}`);

export const putPhotographerPage = async (body: any) =>
  await PUT(`/photographers/me/page`, body, true);

export const modifyPhotographerProfile = async (body: any) =>
  await PUT(`/photographers/me/profile`, body, true);
