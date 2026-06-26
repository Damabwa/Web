import { renderHook, waitFor } from "@testing-library/react";
import { usePromotionList } from "./usePromotionList";
import { getPromotionList } from "../api/promotion";

jest.mock("../api/promotion", () => ({
  getPromotionList: jest.fn(),
}));

const mockGetList = getPromotionList as jest.MockedFunction<
  typeof getPromotionList
>;

const makeResponse = (items: unknown[]) =>
  ({ items, totalCount: items.length, page: 1, pageSize: 10 } as never);

describe("usePromotionList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("성공 시 목록을 채우고 로딩을 종료한다", async () => {
    mockGetList.mockResolvedValue(makeResponse([{ id: 10 }]));

    const { result } = renderHook(() => usePromotionList("status=ONGOING"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toEqual([{ id: 10 }]);
    expect(result.current.error).toBeNull();
  });

  it("실패 시 에러 메시지를 설정한다", async () => {
    mockGetList.mockRejectedValue(new Error("불러오기 실패"));

    const { result } = renderHook(() => usePromotionList("status=ONGOING"));

    await waitFor(() => expect(result.current.error).toBe("불러오기 실패"));
    expect(result.current.promotions).toEqual([]);
  });

  it("enabled=false이면 API를 호출하지 않는다", () => {
    renderHook(() => usePromotionList("status=ONGOING", false));
    expect(mockGetList).not.toHaveBeenCalled();
  });
});
