import axios from "axios";

const fetchWrap = async ({ method, url, body, auth }) => {
  const baseURL = "https://api-dev.damaba.me/api/v1";
  try {
    // const config = {
    //   baseURL: "https://api-dev.damaba.me/api/v1",
    //   withCredentials: true,
    // };

    // if (auth === true) {
    //   if (url === "/refresh-token")
    //     config.headers = {
    //       "REFRESH-TOKEN": `Bearer ${localStorage.getItem("refreshToken")}`,
    //     };
    //   else
    //     config.headers = {
    //       "ACCESS-TOKEN": `Bearer ${localStorage.getItem("accessToken")}`,
    //     };
    // }

    const { data } =
      (method === "get" && (await axios.get(baseURL + url))) ||
      (method === "post" && (await axios.post(baseURL + url, body))) ||
      (method === "put" && (await axios.put(baseURL + url, body))) ||
      (method === "delete" && (await axios.delete(baseURL + url))) ||
      {};

    return data;
  } catch (error) {
    throw error;
  }
};

export const GET = (url, auth = false) =>
  fetchWrap({ method: "get", url, auth });

export const POST = (url, body, auth = false) =>
  fetchWrap({ method: "post", url, body, auth });

export const PUT = (url, body, auth = false) =>
  fetchWrap({ method: "put", url, body, auth });

export const DELETE = (url, auth = false) =>
  fetchWrap({ method: "delete", url, auth });
