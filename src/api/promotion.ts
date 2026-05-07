import { GET, PUT, POST, DELETE } from "../utils/axios";
import { tokenStore } from "../utils/tokenStore";

export const getPromotionList = async (params: string) =>
  await GET(
    `/promotions/list?${params}`,
    tokenStore.getAccessToken() ? true : false
  );

export const getSavedPromotionList = async () =>
  await GET(`/promotions/saved`, true);

export const getPromotionDetail = async (promotionId: number) =>
  await GET(
    `/promotions/${promotionId}/details`,
    tokenStore.getAccessToken() ? true : false
  );

export const getPromotion = async (promotionId: number) =>
  await GET(`/promotions/${promotionId}`);

export const postPromotion = async (body: any) =>
  await POST(`/promotions`, body, true);

export const savePromotion = async (promotionId: number) =>
  await POST(`/promotions/${promotionId}/save`, {}, true);

export const putPromotion = async (promotionId: number, body: any) =>
  await PUT(`/promotions/${promotionId}`, body, true);

export const deleteSavedPromotion = async (promotionId: number) =>
  await DELETE(`/promotions/${promotionId}/unsave`, true);

export const deletePromotion = async (promotionId: number) =>
  await DELETE(`/promotions/${promotionId}`, true);
