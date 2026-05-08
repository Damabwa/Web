import { ImageFile } from "./common";

export type Gender = "MALE" | "FEMALE";

export interface UserRegistrationBody {
  nickname: string;
  gender: Gender;
  instagramId?: string | null;
}

export interface ModifyProfileBody {
  nickname?: string;
  instagramId?: string;
  profileImage?: ImageFile | null;
}

export interface RegistrationResponse {
  id: number;
  roles: string[];
  [key: string]: unknown;
}

export interface UserInfo {
  id: number;
  nickname: string;
  gender: Gender;
  instagramId: string;
  profileImage: ImageFile | null;
  roles: string[];
}
