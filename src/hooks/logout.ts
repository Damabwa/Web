import { setRecoil } from "recoil-nexus";
import { userState } from "../atom/atom";
import { tokenStore } from "../utils/tokenStore";

export const logout = () => {
  setRecoil(userState, { id: -1, roles: [] });
  tokenStore.clearAccessToken();
  if (window.location.pathname !== "/") window.location.href = "/";
};
