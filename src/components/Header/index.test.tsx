import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import Header from ".";

describe("Header", () => {
  it("Left/Center/Right 슬롯의 children을 모두 렌더한다", () => {
    renderWithProviders(
      <Header>
        <Header.Left>왼쪽</Header.Left>
        <Header.Center>가운데</Header.Center>
        <Header.Right>오른쪽</Header.Right>
      </Header>
    );

    expect(screen.getByText("왼쪽")).toBeInTheDocument();
    expect(screen.getByText("가운데")).toBeInTheDocument();
    expect(screen.getByText("오른쪽")).toBeInTheDocument();
  });

  it("children 없이도 렌더된다", () => {
    const { container } = renderWithProviders(<Header />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
