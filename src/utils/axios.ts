import axios, { AxiosResponse } from "axios";
import { logout } from "../hooks/logout";
import { tokenStore } from "./tokenStore";

type HttpMethod = "get" | "post" | "put" | "delete";

interface FetchWrapParams {
  method: HttpMethod;
  url: string;
  body?: unknown;
  auth: boolean;
}

const fetchWrap = async ({
  method,
  url,
  body,
  auth,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FetchWrapParams): Promise<any> => {
  const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
  const headers = auth
    ? { Authorization: `Bearer ${tokenStore.getAccessToken()}` }
    : {};
  const config = { headers };

  try {
    let response: AxiosResponse;

    switch (method) {
      case "get":
        response = await axios.get(baseURL + url, config);
        break;
      case "post":
        response = await axios.post(baseURL + url, body, config);
        break;
      case "put":
        response = await axios.put(baseURL + url, body, config);
        break;
      case "delete":
        response = await axios.delete(baseURL + url, config);
        break;
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout();
    }
    throw error;
  }
};

export const GET = (url: string, auth = false) =>
  fetchWrap({ method: "get", url, auth });

export const POST = (url: string, body: unknown, auth = false) =>
  fetchWrap({ method: "post", url, body, auth });

export const PUT = (url: string, body: unknown, auth = false) =>
  fetchWrap({ method: "put", url, body, auth });

export const DELETE = (url: string, auth = false) =>
  fetchWrap({ method: "delete", url, auth });
