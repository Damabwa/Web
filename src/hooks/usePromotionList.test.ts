import { act, renderHook, waitFor } from "@testing-library/react";
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

  it("에러에 message가 없으면 기본 메시지를 사용한다", async () => {
    mockGetList.mockRejectedValue({});

    const { result } = renderHook(() => usePromotionList("status=ONGOING"));

    await waitFor(() =>
      expect(result.current.error).toBe("데이터를 불러오는 데 실패했습니다.")
    );
  });

  it("enabled=false이면 API를 호출하지 않는다", async () => {
    const { result } = renderHook(() =>
      usePromotionList("status=ONGOING", false)
    );

    await act(async () => {
      await Promise.resolve();
    });
    expect(mockGetList).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it("언마운트 후 늦게 도착한 응답은 상태에 반영하지 않는다", async () => {
    let resolve!: (value: never) => void;
    mockGetList.mockReturnValue(
      new Promise<never>((r) => {
        resolve = r;
      })
    );

    const { result, unmount } = renderHook(() =>
      usePromotionList("status=ONGOING")
    );
    unmount();

    await act(async () => {
      resolve(makeResponse([{ id: 99 }]));
      await Promise.resolve();
    });

    expect(result.current.promotions).toEqual([]);
  });
});
