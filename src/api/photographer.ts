import { GET, PUT, POST, DELETE } from "../utils/axios";

export const checkPhotographerExistence = async (nickname: string) =>
  await GET(`/photographers/nicknames/existence?nickname=${nickname}`);

export const getPhotographerList = async (params: string) =>
  await GET(
    `/photographers/list?${params}`,
    localStorage.getItem("accessToken") ? true : false
  );

export const getSavedPhotographerList = async () =>
  await GET(`/photographers/saved`, true);

export const getPhotographerInfo = async (
  photographerId: number,
  isMyPage: boolean
) => await GET(`/photographers/${photographerId}`, isMyPage);

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
