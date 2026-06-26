import { logout } from "./logout";
import { setRecoil } from "recoil-nexus";
import { userState } from "../atom/atom";

// recoil 런타임 의존을 끊기 위해 recoil-nexus와 atom 모듈을 모킹한다.
jest.mock("recoil-nexus", () => ({ setRecoil: jest.fn() }));
jest.mock("../atom/atom", () => ({ userState: { key: "userState" } }));

const mockSetRecoil = setRecoil as jest.MockedFunction<typeof setRecoil>;

describe("logout", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("accessToken", "a");
    localStorage.setItem("refreshToken", "r");
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  const stubLocation = (pathname: string) => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { pathname, href: "" },
    });
  };

  it("userState를 초기화하고 토큰을 제거한다", () => {
    stubLocation("/mypage");
    logout();

    expect(mockSetRecoil).toHaveBeenCalledWith(userState, { id: -1, roles: [] });
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });

  it("현재 경로가 홈이 아니면 홈으로 리다이렉트한다", () => {
    stubLocation("/mypage");
    logout();
    expect(window.location.href).toBe("/");
  });

  it("현재 경로가 이미 홈이면 리다이렉트하지 않는다", () => {
    stubLocation("/");
    logout();
    expect(window.location.href).toBe("");
  });
});
