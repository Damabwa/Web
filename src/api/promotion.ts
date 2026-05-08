import { GET, PUT, POST, DELETE } from "../utils/axios";
import { PromotionBody, PromotionDetail, PromotionListItem } from "../types/promotion";
import { PaginatedResponse } from "../types/common";

export const getPromotionList = async (params: string) =>
  await GET<PaginatedResponse<PromotionListItem>>(
    `/promotions/list?${params}`,
    localStorage.getItem("accessToken") ? true : false
  );

export const getSavedPromotionList = async () =>
  await GET<PaginatedResponse<PromotionListItem>>(`/promotions/saved`, true);

export const getPromotionDetail = async (promotionId: number) =>
  await GET<PromotionDetail>(
    `/promotions/${promotionId}/details`,
    localStorage.getItem("accessToken") ? true : false
  );

export const getPromotion = async (promotionId: number) =>
  await GET<PromotionDetail>(`/promotions/${promotionId}`);

export const postPromotion = async (body: PromotionBody) =>
  await POST(`/promotions`, body, true);

export const savePromotion = async (promotionId: number) =>
  await POST(`/promotions/${promotionId}/save`, {}, true);

export const putPromotion = async (promotionId: number, body: PromotionBody) =>
  await PUT(`/promotions/${promotionId}`, body, true);

export const deleteSavedPromotion = async (promotionId: number) =>
  await DELETE(`/promotions/${promotionId}/unsave`, true);

export const deletePromotion = async (promotionId: number) =>
  await DELETE(`/promotions/${promotionId}`, true);
