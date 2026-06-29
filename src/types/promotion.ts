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
  activeRegions: string[];
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
}

export interface PromotionDetail extends PromotionListItem {
  content: string;
  externalLink: string;
  startedAt: string;
  promotionType: string;
}
