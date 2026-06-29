import axios from "axios";
import { GET, POST, PUT, DELETE } from "./axios";
import { logout } from "../hooks/logout";

// axios v1은 ESM이라 CRA jest가 파싱하지 못한다. 패키지 자체를 팩토리 모킹해
// HTTP 메서드와 isAxiosError를 jest.fn으로 대체한다. logout도 모킹해
// 401 처리 분기를 격리 검증한다.
jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    isAxiosError: jest.fn(),
  },
}));
jest.mock("../hooks/logout", () => ({ logout: jest.fn() }));

const mockGet = axios.get as jest.Mock;
const mockPost = axios.post as jest.Mock;
const mockPut = axios.put as jest.Mock;
const mockDelete = axios.delete as jest.Mock;
const mockIsAxiosError = axios.isAxiosError as unknown as jest.Mock;
const mockLogout = logout as jest.MockedFunction<typeof logout>;

describe("fetchWrap (axios 헬퍼)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    process.env.REACT_APP_SERVER_URL = "";
    mockGet.mockResolvedValue({ data: {} });
    mockPost.mockResolvedValue({ data: {} });
    mockPut.mockResolvedValue({ data: {} });
    mockDelete.mockResolvedValue({ data: {} });
    mockIsAxiosError.mockReturnValue(false);
  });

  describe("요청 구성", () => {
    it("비인증 GET은 빈 헤더로 호출하고 response.data를 반환한다", async () => {
      mockGet.mockResolvedValue({ data: { ok: 1 } });
      const result = await GET("/x");
      expect(mockGet).toHaveBeenCalledWith("/x", { headers: {} });
      expect(result).toEqual({ ok: 1 });
    });

    it("auth=true GET은 Authorization 헤더를 붙인다", async () => {
      localStorage.setItem("accessToken", "tk");
      await GET("/me", true);
      expect(mockGet).toHaveBeenCalledWith("/me", {
        headers: { Authorization: "Bearer tk" },
      });
    });

    it("baseURL(REACT_APP_SERVER_URL)을 url 앞에 붙인다", async () => {
      process.env.REACT_APP_SERVER_URL = "https://api.test";
      await GET("/x");
      expect(mockGet).toHaveBeenCalledWith("https://api.test/x", {
        headers: {},
      });
    });

    it("POST는 본문과 설정을 함께 전달한다", async () => {
      const body = { a: 1 };
      await POST("/p", body);
      expect(mockPost).toHaveBeenCalledWith("/p", body, { headers: {} });
    });

    it("PUT은 본문과 인증 헤더를 함께 전달한다", async () => {
      localStorage.setItem("accessToken", "tk");
      const body = { b: 2 };
      await PUT("/u", body, true);
      expect(mockPut).toHaveBeenCalledWith("/u", body, {
        headers: { Authorization: "Bearer tk" },
      });
    });

    it("DELETE는 본문 없이 설정만 전달한다", async () => {
      await DELETE("/d");
      expect(mockDelete).toHaveBeenCalledWith("/d", { headers: {} });
    });
  });

  describe("에러 처리", () => {
    it("401 응답이면 logout()을 호출하고 에러를 다시 던진다", async () => {
      const error = { response: { status: 401 } };
      mockGet.mockRejectedValue(error);
      mockIsAxiosError.mockReturnValue(true);

      await expect(GET("/x", true)).rejects.toBe(error);
      expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    it("401이 아닌 axios 에러는 logout 없이 다시 던진다", async () => {
      const error = { response: { status: 500 } };
      mockPost.mockRejectedValue(error);
      mockIsAxiosError.mockReturnValue(true);

      await expect(POST("/x", {})).rejects.toBe(error);
      expect(mockLogout).not.toHaveBeenCalled();
    });

    it("axios 에러가 아니면 logout 없이 다시 던진다", async () => {
      const error = new Error("network");
      mockGet.mockRejectedValue(error);
      mockIsAxiosError.mockReturnValue(false);

      await expect(GET("/x")).rejects.toBe(error);
      expect(mockLogout).not.toHaveBeenCalled();
    });
  });
});
