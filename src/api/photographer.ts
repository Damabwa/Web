import { GET, PUT, POST, DELETE } from "../utils/axios";
import { tokenStore } from "../utils/tokenStore";
import {
  ModifyPhotographerProfileBody,
  PhotographerDetail,
  PhotographerListItem,
  PhotographerPageBody,
  PhotographerRegistrationBody,
  RegistrationResponse,
} from "../types/photographer";
import { PaginatedResponse } from "../types/common";

export const checkPhotographerExistence = async (nickname: string) =>
  await GET<{ exists: boolean }>(
    `/photographers/nicknames/existence?nickname=${nickname}`
  );

export const getPhotographerList = async (params: string) =>
  await GET<PaginatedResponse<PhotographerListItem>>(
    `/photographers/list?${params}`,
    tokenStore.getAccessToken() ? true : false
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

export const photographerRegistration = async (
  body: PhotographerRegistrationBody
) => await POST<RegistrationResponse>(`/photographers/me/registration`, body, true);

export const savePhotographer = async (photographerId: number) =>
  await POST(`/photographers/${photographerId}/save`, {}, true);

export const putPhotographerPage = async (body: PhotographerPageBody) =>
  await PUT(`/photographers/me/page`, body, true);

export const modifyPhotographerProfile = async (
  body: ModifyPhotographerProfileBody
) => await PUT(`/photographers/me/profile`, body, true);

export const deleteSavedPhotographer = async (photographerId: number) =>
  await DELETE(`/photographers/${photographerId}/unsave`, true);
