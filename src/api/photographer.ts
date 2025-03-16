import { GET, PUT, POST, DELETE } from "../utils/axios";

export const checkPhotographerExistence = async (nickname: string) =>
  await GET(`/photographers/nicknames/existence?nickname=${nickname}`);

export const getPhotographerList = async () =>
  await GET(
    `/photographers/list`,
    localStorage.getItem("accessToken") ? true : false
  );

export const getSavedPhotographerList = async () =>
  await GET(`/photographers/saved`, true);

export const getPhotographerInfo = async (photographerId: number) =>
  await GET(`/photographers/${photographerId}`);

export const photographerRegistration = async (body: any) =>
  await POST(`/photographers/me/registration`, body, true);

export const savePhotographer = async (photographerId: number) =>
  await POST(`/photographers/${photographerId}/save`, {}, true);

export const putPhotographerPage = async (body: any) =>
  await PUT(`/photographers/me/page`, body, true);

export const modifyPhotographerProfile = async (body: any) =>
  await PUT(`/photographers/me/profile`, body, true);

export const deleteSavedPhotographer = async (photographerId: number) =>
  await DELETE(`/photographers/${photographerId}/unsave`, true);
