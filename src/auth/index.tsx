// import axios from "axios";
// function Auth() {
//   const getToken = async () => {
//     const token = new URL(window.location.href).searchParams.get("code");
//     const res = axios.post(
//       "https://kauth.kakao.com/oauth/token",
//       {
//         grant_type: "authorization_code",
//         client_id: process.env.REACT_APP_KAKAO_APP_KEY,
//         redirect_uri: "http://localhost:3000/auth/redirect",
//         code: token,
//       },
//       {
//         headers: {
//           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//         },
//       }
//     );
//     return res;
//   };
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
  const navigate = useNavigate();
  const getToken = async () => {
    const token = new URL(window.location.href).searchParams.get("code");
    const res = axios.post(
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

  useEffect(() => {
    getToken()
      .then((res) => {
        if (res) {
          localStorage.setItem("token", JSON.stringify(res.data.access_token));
          navigate("/signup");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return <></>;
}

export default Auth;
