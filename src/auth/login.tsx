import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../atom/atom";

export default function Auth() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    getToken()
      .then((res) => {
        if (res) {
          authLoginFunc(res.data.access_token);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const getToken = async () => {
    const token = new URL(window.location.href).searchParams.get("code");
    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_KEY,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code: token,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return res;
  };

  const authLoginFunc = async (token: string) => {
    try {
      const res = await axios.post("https://api.damaba.me/api/v1/auth/login", {
        loginType: "KAKAO",
        authKey: JSON.stringify(token).slice(1, -1),
      });
      localStorage.setItem("accessToken", res.data.accessToken.value);
      localStorage.setItem("refreshToken", res.data.refreshToken.value);
      if (res.status === 200 && res.data.isRegistrationCompleted) {
        setUser({ id: res.data.user.id, roles: res.data.user.roles });
        navigate("/");
      } else navigate("/signup");
    } catch (e) {
      console.log(e);
    }
  };

  return <></>;
}
