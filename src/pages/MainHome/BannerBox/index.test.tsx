import { ReactNode } from "react";
import {
  renderWithProviders,
  screen,
} from "../../../test-utils/renderWithProviders";

// Swiper는 ESM subpath라 CRA jest가 해석하지 못해 모킹한다.
// (loop/realIndex 등 Swiper 동작 자체는 jsdom에서 검증 불가 — 빌드/리뷰로 보장)
jest.mock(
  "swiper/react",
  () => ({
    Swiper: ({ children }: { children: ReactNode }) => (
      <div data-testid="swiper">{children}</div>
    ),
    SwiperSlide: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
  }),
  { virtual: true }
);
jest.mock("swiper/modules", () => ({ Autoplay: {} }), { virtual: true });
jest.mock("swiper/css", () => ({}), { virtual: true });

// eslint-disable-next-line import/first
import BannerBox from ".";

describe("BannerBox", () => {
  it("배너 이미지와 인덱스 인디케이터를 렌더한다", () => {
    renderWithProviders(<BannerBox />);
    expect(screen.getAllByAltText("배너").length).toBeGreaterThan(0);
    expect(screen.getByText("1/2")).toBeInTheDocument();
  });
});
