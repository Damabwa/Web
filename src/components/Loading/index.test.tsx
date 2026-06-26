import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import Loading from ".";

describe("Loading", () => {
  it("isLoading=false이면 아무것도 렌더하지 않는다", () => {
    renderWithProviders(<Loading isLoading={false} />);
    expect(screen.queryByAltText("로딩 중")).not.toBeInTheDocument();
  });

  it("isLoading=true이면 로딩 이미지를 렌더하고 body 스크롤을 잠근다", () => {
    renderWithProviders(<Loading isLoading />);
    expect(screen.getByAltText("로딩 중")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("언마운트 시 body 스크롤을 복원한다", () => {
    const { unmount } = renderWithProviders(<Loading isLoading />);
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });
});
