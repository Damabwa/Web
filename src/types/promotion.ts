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

// 상세 응답의 author는 목록(author:{nickname,isAdmin})보다 풍부하다.
export interface Author {
  id: number;
  nickname: string;
  isAdmin: boolean;
  instagramId?: string;
  profileImage?: ImageFile;
  roles?: string[];
}

export interface PromotionDetail
  extends Omit<PromotionListItem, "author" | "photographyTypes"> {
  author: Author | null;
  photographyTypes: string[];
  content: string;
  externalLink: string;
  startedAt: string;
  promotionType: string;
  isAuthorHidden?: boolean;
}
