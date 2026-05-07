import axios from "axios";
import { logout } from "../hooks/logout";
import { tokenStore } from "./tokenStore";

const fetchWrap = async ({ method, url, body, auth }) => {
  const baseURL = `${process.env.REACT_APP_SERVER_URL}`;
  try {
    const headers = auth
      ? { Authorization: `Bearer ${tokenStore.getAccessToken()}` }
      : {};

    const { data } =
      (method === "get" && (await axios.get(baseURL + url, { headers }))) ||
      (method === "post" &&
        (await axios.post(baseURL + url, body, { headers }))) ||
      (method === "put" &&
        (await axios.put(baseURL + url, body, { headers }))) ||
      (method === "delete" &&
        (await axios.delete(baseURL + url, { headers }))) ||
      {};

    return data;
  } catch (error) {
    if (error.response?.status === 401) logout();
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
