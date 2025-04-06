import { setRecoil } from "recoil-nexus";
import { useNavigate } from "react-router-dom";
import { userState } from "../atom/atom";

export const logout = () => {
  const navigation = useNavigate();
  setRecoil(userState, { id: -1, roles: [] });
  localStorage.removeItem("accessToken");
  navigation(`/`);
};
