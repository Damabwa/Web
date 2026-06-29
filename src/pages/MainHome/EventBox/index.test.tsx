import {
  renderWithProviders,
  screen,
} from "../../../test-utils/renderWithProviders";
import EventBox from ".";
import { usePromotionList } from "../../../hooks/usePromotionList";

jest.mock("../../../hooks/usePromotionList", () => ({
  usePromotionList: jest.fn(),
}));

const mockUse = usePromotionList as jest.MockedFunction<typeof usePromotionList>;

const baseItem = {
  id: 1,
  images: [{ name: "thumb", url: "https://cdn/x.jpg" }],
  title: "이벤트A",
  author: null,
  hashtags: [],
  endedAt: "2025-12-31",
  activeRegions: [],
  saveCount: 0,
  isSaved: false,
};

// ONGOING 호출만 데이터, UPCOMING은 빈 배열 (재렌더에도 안정적이도록 params 기반)
const mockLists = (items: unknown[]) => {
  mockUse.mockReset();
  mockUse.mockImplementation(
    (params: string) =>
      ({
        promotions: params.includes("ONGOING") ? items : [],
        isLoading: false,
        error: null,
      }) as never
  );
};

describe("EventBox", () => {
  it("photographyTypes가 없는 리스트 항목도 크래시 없이 렌더한다", () => {
    // 리스트 응답에 photographyTypes/startedAt이 없는 경우 (실제 리스트 계약)
    mockLists([baseItem]);
    renderWithProviders(<EventBox />);

    expect(screen.getByText("이벤트A")).toBeInTheDocument();
    // 촬영 종류 행은 데이터가 없으면 렌더되지 않는다.
    expect(screen.queryByText("스냅")).not.toBeInTheDocument();
  });

  it("photographyTypes가 있으면 촬영 종류를 렌더한다", () => {
    mockLists([{ ...baseItem, photographyTypes: ["SNAP", "PROFILE"] }]);
    renderWithProviders(<EventBox />);

    expect(screen.getByText("이벤트A")).toBeInTheDocument();
    // 콤마와 같은 노드에 있을 수 있어 유연 매칭
    expect(screen.getByText(/스냅/)).toBeInTheDocument();
    expect(screen.getByText(/프로필/)).toBeInTheDocument();
  });

  it("이벤트가 없으면 항목을 렌더하지 않는다", () => {
    mockLists([]);
    renderWithProviders(<EventBox />);
    expect(screen.queryByText("이벤트A")).not.toBeInTheDocument();
  });
});
