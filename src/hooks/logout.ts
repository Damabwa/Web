import { setRecoil } from "recoil-nexus";
import { userState } from "../atom/atom";

export const logout = () => {
  setRecoil(userState, { id: -1, roles: [] });
  localStorage.removeItem("accessToken");
  window.location.href = "/";
};
