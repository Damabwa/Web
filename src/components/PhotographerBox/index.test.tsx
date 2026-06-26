import { useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import PhotographerBox from ".";
import { isMobileDevice } from "../../utils/device";

// axios(ESM) 로드를 피하기 위해 api와 device 유틸을 모킹한다.
jest.mock("../../api/photographer", () => ({
  createSavedPhotographer: jest.fn(),
  deleteSavedPhotographer: jest.fn(),
}));
jest.mock("../../utils/device", () => ({ isMobileDevice: jest.fn() }));

const mockIsMobile = isMobileDevice as jest.MockedFunction<
  typeof isMobileDevice
>;

const data = {
  id: 7,
  profileImage: { name: "p", url: "https://cdn/p.jpg" },
  nickname: "작가A",
  mainPhotographyTypes: ["SNAP"],
  isSaved: false,
};

function LocationProbe() {
  return <div data-testid="path">{useLocation().pathname}</div>;
}

describe("PhotographerBox", () => {
  const originalOpen = window.open;

  beforeEach(() => {
    jest.clearAllMocks();
    window.open = jest.fn();
  });

  afterEach(() => {
    window.open = originalOpen;
  });

  it("모바일에서는 같은 탭으로 상세 페이지로 이동한다(navigate)", async () => {
    mockIsMobile.mockReturnValue(true);
    renderWithProviders(
      <>
        <PhotographerBox data={data} />
        <LocationProbe />
      </>
    );

    await userEvent.click(screen.getByText("작가A"));
    expect(screen.getByTestId("path")).toHaveTextContent("/photographer/7");
    expect(window.open).not.toHaveBeenCalled();
  });

  it("데스크탑에서는 새 탭으로 연다(window.open)", async () => {
    mockIsMobile.mockReturnValue(false);
    renderWithProviders(
      <>
        <PhotographerBox data={data} />
        <LocationProbe />
      </>
    );

    await userEvent.click(screen.getByText("작가A"));
    expect(window.open).toHaveBeenCalledWith("/photographer/7");
    expect(screen.getByTestId("path")).toHaveTextContent("/");
  });
});
