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

const fetchWrap = async <T = unknown>({
  method,
  url,
  body,
  auth,
}: FetchWrapParams): Promise<T> => {
  const baseURL = process.env.REACT_APP_SERVER_URL ?? "";
  const headers = auth
    ? { Authorization: `Bearer ${tokenStore.getAccessToken()}` }
    : {};
  const config = { headers };

  try {
    let response: AxiosResponse<T>;

    switch (method) {
      case "get":
        response = await axios.get<T>(baseURL + url, config);
        break;
      case "post":
        response = await axios.post<T>(baseURL + url, body, config);
        break;
      case "put":
        response = await axios.put<T>(baseURL + url, body, config);
        break;
      case "delete":
        response = await axios.delete<T>(baseURL + url, config);
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

export const GET = <T = unknown>(url: string, auth = false) =>
  fetchWrap<T>({ method: "get", url, auth });

export const POST = <T = unknown>(url: string, body: unknown, auth = false) =>
  fetchWrap<T>({ method: "post", url, body, auth });

export const PUT = <T = unknown>(url: string, body: unknown, auth = false) =>
  fetchWrap<T>({ method: "put", url, body, auth });

export const DELETE = <T = unknown>(url: string, auth = false) =>
  fetchWrap<T>({ method: "delete", url, auth });
