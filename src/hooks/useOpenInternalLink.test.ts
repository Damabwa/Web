import { renderHook } from "@testing-library/react";
import { useOpenInternalLink } from "./useOpenInternalLink";
import { isMobileDevice } from "../utils/device";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));
jest.mock("../utils/device", () => ({ isMobileDevice: jest.fn() }));

const mockIsMobile = isMobileDevice as jest.MockedFunction<
  typeof isMobileDevice
>;

describe("useOpenInternalLink", () => {
  const originalOpen = window.open;

  beforeEach(() => {
    jest.clearAllMocks();
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
  });

  it("모바일에서는 같은 탭으로 navigate한다", () => {
    mockIsMobile.mockReturnValue(true);
    const { result } = renderHook(() => useOpenInternalLink());

    result.current("/event/3");

    expect(mockNavigate).toHaveBeenCalledWith("/event/3");
    expect(window.open).not.toHaveBeenCalled();
  });

  it("데스크탑에서는 새 탭(window.open)으로 연다", () => {
    mockIsMobile.mockReturnValue(false);
    const { result } = renderHook(() => useOpenInternalLink());

    result.current("/photographer/5");

    expect(window.open).toHaveBeenCalledWith("/photographer/5");
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
