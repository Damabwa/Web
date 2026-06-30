import { act, renderHook, waitFor } from "@testing-library/react";
import { createElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePromotionList } from "./usePromotionList";
import { getPromotionList } from "../api/promotion";

jest.mock("../api/promotion", () => ({
  getPromotionList: jest.fn(),
}));

const mockGetList = getPromotionList as jest.MockedFunction<
  typeof getPromotionList
>;

// react-query 훅 테스트용 래퍼. 테스트마다 새 client로 캐시 격리, 재시도 off.
const createWrapper = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) =>
    createElement(QueryClientProvider, { client }, children);
};

const renderList = (params: string, enabled?: boolean) =>
  renderHook(() => usePromotionList(params, enabled), {
    wrapper: createWrapper(),
  });

const makeResponse = (items: unknown[]) =>
  ({ items, totalCount: items.length, page: 1, pageSize: 10 } as never);

describe("usePromotionList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("성공 시 목록을 채우고 로딩을 종료한다", async () => {
    mockGetList.mockResolvedValue(makeResponse([{ id: 10 }]));

    const { result } = renderList("status=ONGOING");

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.promotions).toEqual([{ id: 10 }]);
    expect(result.current.error).toBeNull();
  });

  it("실패 시 에러 메시지를 설정한다", async () => {
    mockGetList.mockRejectedValue(new Error("불러오기 실패"));

    const { result } = renderList("status=ONGOING");

    await waitFor(() => expect(result.current.error).toBe("불러오기 실패"));
    expect(result.current.promotions).toEqual([]);
  });

  it("에러에 message가 없으면 기본 메시지를 사용한다", async () => {
    mockGetList.mockRejectedValue({});

    const { result } = renderList("status=ONGOING");

    await waitFor(() =>
      expect(result.current.error).toBe("데이터를 불러오는 데 실패했습니다.")
    );
  });

  it("enabled=false이면 API를 호출하지 않는다", async () => {
    const { result } = renderList("status=ONGOING", false);

    await act(async () => {
      await Promise.resolve();
    });
    expect(mockGetList).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  // NOTE: 훅의 cleanup(cancelled) 가드는 React 18 환경에서 단위 테스트로
  // 검증할 신호가 없다. 언마운트 후 setState는 조용히 무시되고 result.current는
  // 마지막 렌더에 고정되므로, 가드 유무와 무관하게 동일한 결과가 나와(거짓 통과)
  // 회귀를 잡지 못한다. 해당 분기는 통합/E2E 레벨에서 다룬다.
});
