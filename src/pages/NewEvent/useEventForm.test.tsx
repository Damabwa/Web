import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEventForm } from "./useEventForm";

// axios(ESM) 로드를 피하기 위해 api 모듈 모킹
jest.mock("../../api/user", () => ({
  getUserInfo: jest.fn().mockResolvedValue({ nickname: "tester" }),
}));
jest.mock("../../api/promotion", () => ({
  createPromotion: jest.fn(),
  updatePromotion: jest.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <MemoryRouter>{children}</MemoryRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const setup = () => renderHook(() => useEventForm(), { wrapper });

describe("useEventForm onChangeDate (TA-250)", () => {
  it("시작일 선택 시 startedAt을 설정하고 종료일은 초기화한다", () => {
    const { result } = setup();
    act(() =>
      result.current.formHandlers.onChangeDate("START", dayjs("2025-12-01"))
    );
    expect(result.current.formData.startedAt).toBe("2025-12-01");
    expect(result.current.formData.endedAt).toBe("");
  });

  it("종료일 선택 시 endedAt을 설정한다", () => {
    const { result } = setup();
    act(() =>
      result.current.formHandlers.onChangeDate("START", dayjs("2025-12-01"))
    );
    act(() =>
      result.current.formHandlers.onChangeDate("END", dayjs("2025-12-10"))
    );
    expect(result.current.formData.endedAt).toBe("2025-12-10");
  });

  it("시작일을 비우면 startedAt/endedAt이 모두 초기화된다(이전 값 잔존 방지)", () => {
    const { result } = setup();
    act(() =>
      result.current.formHandlers.onChangeDate("START", dayjs("2025-12-01"))
    );
    act(() =>
      result.current.formHandlers.onChangeDate("END", dayjs("2025-12-10"))
    );
    act(() => result.current.formHandlers.onChangeDate("START", null));
    expect(result.current.formData.startedAt).toBe("");
    expect(result.current.formData.endedAt).toBe("");
  });

  it("종료일을 비우면 endedAt이 초기화된다", () => {
    const { result } = setup();
    act(() =>
      result.current.formHandlers.onChangeDate("START", dayjs("2025-12-01"))
    );
    act(() =>
      result.current.formHandlers.onChangeDate("END", dayjs("2025-12-10"))
    );
    act(() => result.current.formHandlers.onChangeDate("END", null));
    expect(result.current.formData.endedAt).toBe("");
  });
});

describe("useEventForm 생성 후 캐시 무효화 (TA-278)", () => {
  it("이벤트 생성 성공 시 promotions 쿼리를 무효화한다", async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const spy = jest.spyOn(client, "invalidateQueries");
    const w = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>
        <RecoilRoot>
          <MemoryRouter>{children}</MemoryRouter>
        </RecoilRoot>
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useEventForm(), { wrapper: w });
    await act(async () => {
      await result.current.formHandlers.onClickSubmit();
    });

    expect(spy).toHaveBeenCalledWith({ queryKey: ["promotions"] });
  });
});
