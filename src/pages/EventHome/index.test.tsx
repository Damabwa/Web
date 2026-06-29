import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import EventHome from ".";
import { usePromotionList } from "../../hooks/usePromotionList";
import { userState } from "../../atom/atom";

// 훅과 무거운 자식 컴포넌트는 모킹해 페이지 로직에 집중한다.
jest.mock("../../hooks/usePromotionList", () => ({
  usePromotionList: jest.fn(),
}));
jest.mock("../../components/FilterBar", () => ({
  __esModule: true,
  default: () => <div data-testid="filterbar" />,
}));
jest.mock("../../components/PromotionBox", () => ({
  __esModule: true,
  default: ({ data }: { data: { title: string } }) => (
    <div data-testid="promotion">{data.title}</div>
  ),
}));

const mockUsePromotionList = usePromotionList as jest.MockedFunction<
  typeof usePromotionList
>;

const setPromotions = (promotions: unknown[]) =>
  mockUsePromotionList.mockReturnValue({
    promotions,
    isLoading: false,
    error: null,
  } as never);

const setLoading = () =>
  mockUsePromotionList.mockReturnValue({
    promotions: [],
    isLoading: true,
    error: null,
  } as never);

function LocationProbe() {
  return <div data-testid="path">{useLocation().pathname}</div>;
}

describe("EventHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setPromotions([]);
  });

  it("로딩 중에는 스켈레톤을 보여주고 '결과 없음'을 표시하지 않는다", () => {
    setLoading();
    renderWithProviders(<EventHome />);
    expect(
      screen.getByLabelText("이벤트 목록 불러오는 중")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("앗! 조건에 맞는 이벤트가 없어요.")
    ).not.toBeInTheDocument();
  });

  it("프로모션이 없으면 빈 상태 안내를 보여준다", () => {
    setPromotions([]);
    renderWithProviders(<EventHome />);
    expect(
      screen.getByText("앗! 조건에 맞는 이벤트가 없어요.")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("promotion")).not.toBeInTheDocument();
  });

  it("프로모션이 있으면 목록을 렌더한다", () => {
    setPromotions([
      { id: 1, title: "이벤트A" },
      { id: 2, title: "이벤트B" },
    ]);
    renderWithProviders(<EventHome />);
    expect(screen.getAllByTestId("promotion")).toHaveLength(2);
    expect(screen.getByText("이벤트A")).toBeInTheDocument();
    expect(
      screen.queryByText("앗! 조건에 맞는 이벤트가 없어요.")
    ).not.toBeInTheDocument();
  });

  it("작가(PHOTOGRAPHER) 권한이면 '이벤트 게시' 버튼을 보여준다", () => {
    renderWithProviders(<EventHome />, {
      initializeState: ({ set }) =>
        set(userState, { id: 1, roles: ["PHOTOGRAPHER"] }),
    });
    expect(
      screen.getByRole("button", { name: /이벤트 게시/ })
    ).toBeInTheDocument();
  });

  it("관리자(ADMIN) 권한이면 '이벤트 게시' 버튼을 보여준다", () => {
    renderWithProviders(<EventHome />, {
      initializeState: ({ set }) => set(userState, { id: 1, roles: ["ADMIN"] }),
    });
    expect(
      screen.getByRole("button", { name: /이벤트 게시/ })
    ).toBeInTheDocument();
  });

  it("일반 사용자(권한 없음)는 '이벤트 게시' 버튼이 없다", () => {
    renderWithProviders(<EventHome />, {
      initializeState: ({ set }) => set(userState, { id: 1, roles: [] }),
    });
    expect(
      screen.queryByRole("button", { name: /이벤트 게시/ })
    ).not.toBeInTheDocument();
  });

  it("뒤로가기 클릭 시 홈으로 이동한다", async () => {
    renderWithProviders(
      <>
        <EventHome />
        <LocationProbe />
      </>,
      { initialEntries: ["/event"] }
    );
    await userEvent.click(screen.getByAltText("<"));
    expect(screen.getByTestId("path")).toHaveTextContent("/");
  });
});
