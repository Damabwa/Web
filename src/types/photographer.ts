import { Address, ImageFile, Region } from "./common";
import { Gender } from "./user";

export interface PhotographerRegistrationBody {
  nickname: string;
  gender: Gender;
  instagramId?: string | null;
  profileImage?: ImageFile | null;
  mainPhotographyTypes: string[];
  activeRegions: Region[];
}

export interface ModifyPhotographerProfileBody {
  nickname?: string;
  profileImage?: ImageFile | null;
  mainPhotographyTypes?: string[];
  activeRegions?: Region[];
}

export interface PhotographerPageBody {
  portfolio: ImageFile[];
  address: Address;
  instagramId?: string;
  contactLink?: string;
  description?: string;
}

export interface PhotographerListItem {
  id: number;
  profileImage: ImageFile;
  nickname: string;
  mainPhotographyTypes: string[];
  isSaved: boolean;
}

export interface PhotographerDetail {
  id: number;
  profileImage: ImageFile;
  nickname: string;
  mainPhotographyTypes: string[];
  activeRegions: Region[];
  saveCount: number;
  isSaved: boolean;
  instagramId?: string;
  contactLink?: string;
  portfolio?: ImageFile[];
  address?: Address;
  description?: string;
}
