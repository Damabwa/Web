import { GET, PUT, POST, DELETE } from "../utils/axios";
import {
  ModifyPhotographerProfileBody,
  PhotographerDetail,
  PhotographerListItem,
  PhotographerPageBody,
  PhotographerRegistrationBody,
} from "../types/photographer";
import { PaginatedResponse, RegistrationResponse } from "../types/common";

export const checkPhotographerExistence = async (nickname: string) =>
  await GET<{ exists: boolean }>(
    `/photographers/nicknames/existence?nickname=${nickname}`
  );

export const getPhotographerList = async (params: URLSearchParams) =>
  await GET<PaginatedResponse<PhotographerListItem>>(
    `/photographers/list?${params.toString()}`,
    localStorage.getItem("accessToken") ? true : false
  );

export const getSavedPhotographerList = async () =>
  await GET<PaginatedResponse<PhotographerListItem>>(
    `/photographers/saved`,
    true
  );

export const getPhotographerInfo = async (photographerId: number) =>
  await GET<PhotographerDetail>(
    `/photographers/${photographerId}/details`,
    true
  );

export const createPhotographer = async (
  body: PhotographerRegistrationBody
) => await POST<RegistrationResponse>(`/photographers/me/registration`, body, true);

export const createSavedPhotographer = async (photographerId: number) =>
  await POST(`/photographers/${photographerId}/save`, {}, true);

export const updatePhotographerPage = async (body: PhotographerPageBody) =>
  await PUT(`/photographers/me/page`, body, true);

export const updatePhotographerProfile = async (
  body: ModifyPhotographerProfileBody
) => await PUT(`/photographers/me/profile`, body, true);

export const deleteSavedPhotographer = async (photographerId: number) =>
  await DELETE(`/photographers/${photographerId}/unsave`, true);
