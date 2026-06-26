import { act, renderHook } from "@testing-library/react";
import { useLoginGuard } from "./useLoginGuard";

const mockNavigate = jest.fn();

// react-router-dom의 useNavigate만 모킹한다 (라우터 컨텍스트 없이 훅 단독 테스트).
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useLoginGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("초기 상태에서 모달은 닫혀 있다", () => {
    const { result } = renderHook(() => useLoginGuard());
    expect(result.current.showLoginModal).toBe(false);
  });

  it("토큰이 없으면 requireLogin이 콜백을 호출하지 않고 모달을 연다", () => {
    const onAuthorized = jest.fn();
    const { result } = renderHook(() => useLoginGuard());

    act(() => {
      result.current.requireLogin(onAuthorized);
    });

    expect(onAuthorized).not.toHaveBeenCalled();
    expect(result.current.showLoginModal).toBe(true);
  });

  it("토큰이 있으면 requireLogin이 콜백을 실행하고 모달을 열지 않는다", () => {
    localStorage.setItem("accessToken", "token-abc");
    const onAuthorized = jest.fn();
    const { result } = renderHook(() => useLoginGuard());

    act(() => {
      result.current.requireLogin(onAuthorized);
    });

    expect(onAuthorized).toHaveBeenCalledTimes(1);
    expect(result.current.showLoginModal).toBe(false);
  });

  it("loginModalProps.onClick은 /login으로 이동시킨다", () => {
    const { result } = renderHook(() => useLoginGuard());

    act(() => {
      result.current.loginModalProps.onClick();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
