import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import Login from ".";

describe("Login", () => {
  const originalLocation = window.location;
  const originalOpen = window.open;

  beforeEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: { href: "" },
    });
    window.open = jest.fn();
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
    window.open = originalOpen;
  });

  it("로고와 카카오 로그인, 약관/정책 버튼을 렌더한다", () => {
    renderWithProviders(<Login />);
    expect(screen.getByAltText("담아봐 로고")).toBeInTheDocument();
    expect(screen.getByAltText("카카오 로그인")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "개인정보처리방침" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이용약관" })).toBeInTheDocument();
  });

  it("카카오 로그인 클릭 시 카카오 인증 URL로 이동한다", async () => {
    renderWithProviders(<Login />);
    await userEvent.click(screen.getByAltText("카카오 로그인"));
    expect(window.location.href).toContain(
      "https://kauth.kakao.com/oauth/authorize"
    );
  });

  it("개인정보처리방침/이용약관 버튼은 새 창으로 연다", async () => {
    renderWithProviders(<Login />);
    await userEvent.click(
      screen.getByRole("button", { name: "개인정보처리방침" })
    );
    await userEvent.click(screen.getByRole("button", { name: "이용약관" }));
    expect(window.open).toHaveBeenCalledTimes(2);
  });
});
