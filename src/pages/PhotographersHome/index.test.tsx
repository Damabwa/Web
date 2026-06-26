import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import PhotographersHome from ".";
import { usePhotographerList } from "../../hooks/usePhotographerList";

jest.mock("../../hooks/usePhotographerList", () => ({
  usePhotographerList: jest.fn(),
}));
jest.mock("../../components/FilterBar", () => ({
  __esModule: true,
  default: () => <div data-testid="filterbar" />,
}));
jest.mock("../../components/PhotographerBox", () => ({
  __esModule: true,
  default: ({ data }: { data: { name?: string } }) => (
    <div data-testid="photographer">{data.name}</div>
  ),
}));

const mockUseList = usePhotographerList as jest.MockedFunction<
  typeof usePhotographerList
>;

const setPhotographers = (photographers: unknown[]) =>
  mockUseList.mockReturnValue({
    photographers,
    isLoading: false,
    error: null,
  } as never);

function LocationProbe() {
  return <div data-testid="path">{useLocation().pathname}</div>;
}

describe("PhotographersHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setPhotographers([]);
  });

  it("작가가 없으면 빈 상태 안내를 보여준다", () => {
    setPhotographers([]);
    renderWithProviders(<PhotographersHome />);
    expect(
      screen.getByText("앗! 조건에 맞는 작가님이 없어요.")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("photographer")).not.toBeInTheDocument();
  });

  it("작가가 있으면 목록을 렌더한다", () => {
    setPhotographers([
      { id: 1, name: "작가A" },
      { id: 2, name: "작가B" },
      { id: 3, name: "작가C" },
    ]);
    renderWithProviders(<PhotographersHome />);
    expect(screen.getAllByTestId("photographer")).toHaveLength(3);
    expect(screen.getByText("작가A")).toBeInTheDocument();
  });

  it("검색 버튼 클릭 시 검색 페이지로 이동한다", async () => {
    renderWithProviders(
      <>
        <PhotographersHome />
        <LocationProbe />
      </>,
      { initialEntries: ["/photographers"] }
    );
    await userEvent.click(screen.getByAltText("검색"));
    expect(screen.getByTestId("path")).toHaveTextContent("/search");
  });
});
