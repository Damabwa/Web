import { atom } from "recoil";

export interface User {
  id: number;
  roles: string[];
}

export const userState = atom<User>({
  key: "userState",
  default: {
    id: -1,
    roles: [],
  },
});
