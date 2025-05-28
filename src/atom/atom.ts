import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface User {
  id: number;
  roles: string[];
}

export const userState = atom<User>({
  key: "userState",
  default: {
    id: -1,
    roles: [""],
  },
  effects_UNSTABLE: [persistAtom],
});
