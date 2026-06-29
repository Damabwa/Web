import {
  renderWithProviders,
  screen,
} from "../../../test-utils/renderWithProviders";
import ImageBox from ".";

jest.mock("../../../utils/device", () => ({ isMobileDevice: () => false }));

// jsdom은 IntersectionObserver를 구현하지 않으므로 no-op로 모킹
beforeAll(() => {
  // @ts-expect-error 테스트 폴리필
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const images = [
  { url: "https://cdn/a.jpg" },
  { url: "https://cdn/b.jpg" },
  { url: "https://cdn/c.jpg" },
];

describe("EventDetail ImageBox", () => {
  it("이미지 슬라이드를 모두 렌더하고 인덱스 인디케이터를 보여준다", () => {
    renderWithProviders(<ImageBox images={images} promotionType="FREE" />);
    expect(screen.getAllByAltText("이벤트 이미지")).toHaveLength(3);
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  it("스크롤 컨테이너에 scrollbar-hide가 적용된다", () => {
    const { container } = renderWithProviders(
      <ImageBox images={images} promotionType="NORMAL" />
    );
    expect(container.querySelector(".scrollbar-hide")).toBeInTheDocument();
  });

  it("이미지가 1장이면 인덱스 인디케이터를 표시하지 않는다", () => {
    renderWithProviders(
      <ImageBox images={[images[0]]} promotionType="NORMAL" />
    );
    expect(screen.queryByText("1/1")).not.toBeInTheDocument();
  });
});
