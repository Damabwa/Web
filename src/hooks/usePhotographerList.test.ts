import { renderHook, waitFor } from "@testing-library/react";
import { usePhotographerList } from "./usePhotographerList";
import { getPhotographerList } from "../api/photographer";

// api 레이어를 모킹한다 (실제 axios/네트워크 차단).
jest.mock("../api/photographer", () => ({
  getPhotographerList: jest.fn(),
}));

const mockGetList = getPhotographerList as jest.MockedFunction<
  typeof getPhotographerList
>;

const makeResponse = (items: unknown[]) =>
  ({ items, totalCount: items.length, page: 1, pageSize: 10 } as never);

describe("usePhotographerList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("성공 시 목록을 채우고 로딩을 종료한다", async () => {
    mockGetList.mockResolvedValue(makeResponse([{ id: 1 }]));

    const { result } = renderHook(() => usePhotographerList("sort=LATEST"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.photographers).toEqual([{ id: 1 }]);
    expect(result.current.error).toBeNull();
  });

  it("실패 시 에러 메시지를 설정한다", async () => {
    mockGetList.mockRejectedValue(new Error("서버 오류"));

    const { result } = renderHook(() => usePhotographerList("sort=LATEST"));

    await waitFor(() => expect(result.current.error).toBe("서버 오류"));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.photographers).toEqual([]);
  });

  it("에러에 message가 없으면 기본 메시지를 사용한다", async () => {
    mockGetList.mockRejectedValue({});

    const { result } = renderHook(() => usePhotographerList("sort=LATEST"));

    await waitFor(() =>
      expect(result.current.error).toBe("데이터를 불러오는 데 실패했습니다.")
    );
  });

  it("enabled=false이면 API를 호출하지 않는다", () => {
    renderHook(() => usePhotographerList("sort=LATEST", false));
    expect(mockGetList).not.toHaveBeenCalled();
  });
});
