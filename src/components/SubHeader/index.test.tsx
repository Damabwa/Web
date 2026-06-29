import { useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import SubHeader from ".";

// 현재 경로를 노출해 navigate(-1) 동작을 관찰하기 위한 프로브
function LocationProbe() {
  const location = useLocation();
  return <div data-testid="path">{location.pathname}</div>;
}

describe("SubHeader", () => {
  it("제목을 렌더한다", () => {
    renderWithProviders(<SubHeader title="프로필 수정" />);
    expect(screen.getByText("프로필 수정")).toBeInTheDocument();
  });

  it("뒤로가기 클릭 시 이전 경로로 이동한다(navigate(-1))", async () => {
    renderWithProviders(
      <>
        <SubHeader title="상세" />
        <LocationProbe />
      </>,
      { initialEntries: ["/first", "/second"], initialIndex: 1 }
    );

    expect(screen.getByTestId("path")).toHaveTextContent("/second");

    await userEvent.click(screen.getByAltText("뒤로가기"));
    expect(screen.getByTestId("path")).toHaveTextContent("/first");
  });
});
