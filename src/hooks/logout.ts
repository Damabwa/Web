import { setRecoil } from "recoil-nexus";
import { userState } from "../atom/atom";

export const logout = () => {
  setRecoil(userState, { id: -1, roles: [] });
  localStorage.removeItem("accessToken");
  if (window.location.pathname !== "/") window.location.href = "/";
};
