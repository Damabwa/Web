import { renderWithProviders, screen } from "../../test-utils/renderWithProviders";
import ListNotFound from ".";

describe("ListNotFound", () => {
  it("아이콘/제목/내용을 렌더한다", () => {
    renderWithProviders(
      <ListNotFound
        icon="/empty.svg"
        title="결과가 없습니다"
        content="다른 조건으로 검색해보세요"
      />
    );

    const icon = screen.getByAltText("NotFound");
    expect(icon).toHaveAttribute("src", "/empty.svg");
    expect(screen.getByText("결과가 없습니다")).toBeInTheDocument();
    expect(screen.getByText("다른 조건으로 검색해보세요")).toBeInTheDocument();
  });
});
