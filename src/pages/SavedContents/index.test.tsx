import { Routes, Route } from "react-router-dom";
import {
  renderWithProviders,
  screen,
  waitFor,
} from "../../test-utils/renderWithProviders";
import SavedContents from ".";
import { getSavedPromotionList } from "../../api/promotion";
import { getSavedPhotographerList } from "../../api/photographer";

jest.mock("../../api/promotion", () => ({ getSavedPromotionList: jest.fn() }));
jest.mock("../../api/photographer", () => ({
  getSavedPhotographerList: jest.fn(),
}));
jest.mock("../../components/SubHeader", () => ({
  __esModule: true,
  default: () => <div />,
}));
jest.mock("../../components/PromotionBox", () => ({
  __esModule: true,
  default: ({ data }: { data: { title: string } }) => (
    <div data-testid="promo">{data.title}</div>
  ),
}));
jest.mock("../../components/PhotographerBox", () => ({
  __esModule: true,
  default: ({ data }: { data: { nickname: string } }) => (
    <div data-testid="photog">{data.nickname}</div>
  ),
}));

const mockPromotions = getSavedPromotionList as jest.MockedFunction<
  typeof getSavedPromotionList
>;
const mockPhotographers = getSavedPhotographerList as jest.MockedFunction<
  typeof getSavedPhotographerList
>;

const res = (items: unknown[]) =>
  ({ items, totalCount: items.length, page: 1, pageSize: 10 } as never);

const renderAt = (type: string) =>
  renderWithProviders(
    <Routes>
      <Route path="/my/saved/:type" element={<SavedContents />} />
    </Routes>,
    { initialEntries: [`/my/saved/${type}`] }
  );

describe("SavedContents", () => {
  beforeEach(() => jest.clearAllMocks());

  it("저장한 이벤트를 조회해 목록을 렌더한다", async () => {
    mockPromotions.mockResolvedValue(res([{ id: 1, title: "이벤트A" }]));
    renderAt("promotion");
    expect(await screen.findByText("이벤트A")).toBeInTheDocument();
    expect(mockPhotographers).not.toHaveBeenCalled();
  });

  it("저장한 작가를 조회해 목록을 렌더한다", async () => {
    mockPhotographers.mockResolvedValue(res([{ id: 2, nickname: "작가B" }]));
    renderAt("photographer");
    expect(await screen.findByText("작가B")).toBeInTheDocument();
    expect(mockPromotions).not.toHaveBeenCalled();
  });

  it("저장 목록이 비면 아무것도 표시하지 않는다", async () => {
    mockPromotions.mockResolvedValue(res([]));
    renderAt("promotion");
    await waitFor(() => expect(mockPromotions).toHaveBeenCalled());
    expect(screen.queryByTestId("promo")).not.toBeInTheDocument();
  });
});
