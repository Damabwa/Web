import { ImageFile, Region } from "./common";

export interface PromotionBody {
  promotionType: string;
  title: string;
  content: string;
  externalLink: string;
  startedAt: string;
  endedAt: string;
  photographyTypes: string[];
  images: ImageFile[];
  activeRegions: Region[];
  hashtags: string[];
  isAuthorHidden: boolean;
}

export interface PromotionListItem {
  id: number;
  images: ImageFile[];
  title: string;
  author: { nickname: string; isAdmin: boolean } | null;
  hashtags: string[];
  endedAt: string;
  activeRegions: Region[];
  saveCount: number;
  isSaved: boolean;
  // 리스트 응답에 포함될 수 있는 선택 필드(메인 EventBox에서 사용).
  // 응답에 없을 수 있으므로 optional — 사용처에서 방어적으로 접근한다.
  startedAt?: string;
  photographyTypes?: string[];
}

export interface PromotionDetail extends PromotionListItem {
  content: string;
  externalLink: string;
  startedAt: string;
  promotionType: string;
}
