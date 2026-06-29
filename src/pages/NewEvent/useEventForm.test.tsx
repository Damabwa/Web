import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { MemoryRouter } from "react-router-dom";
import dayjs from "dayjs";
import { useEventForm } from "./useEventForm";

// axios(ESM) 로드를 피하기 위해 api 모듈 모킹
jest.mock("../../api/user", () => ({ getUserInfo: jest.fn() }));
jest.mock("../../api/promotion", () => ({
  createPromotion: jest.fn(),
  updatePromotion: jest.fn(),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <MemoryRouter>{children}</MemoryRouter>
  </RecoilRoot>
);

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
