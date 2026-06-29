import { fireEvent } from "@testing-library/react";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import FilterBar from ".";

// 자식 바텀시트(FilterType)는 본 테스트 범위 밖이라 가볍게 모킹한다.
jest.mock("./FilterType", () => () => null);

describe("FilterBar - 히스토리 누적 방지(replace)", () => {
  it("마운트 시 URL 동기화는 replace로 호출돼 히스토리를 쌓지 않는다", () => {
    const setSearchParams = jest.fn();
    renderWithProviders(
      <FilterBar isEvent={true} setSearchParams={setSearchParams} />
    );

    expect(setSearchParams).toHaveBeenCalled();
    // 모든 호출이 두 번째 인자로 { replace: true }를 동반해야 한다
    setSearchParams.mock.calls.forEach((call) => {
      expect(call[1]).toEqual({ replace: true });
    });
  });

  it("필터 변경 시에도 replace로 호출하면서 변경값을 URL에 반영한다", () => {
    const setSearchParams = jest.fn();
    renderWithProviders(
      <FilterBar isEvent={true} setSearchParams={setSearchParams} />
    );

    setSearchParams.mockClear();
    // '무료' 토글은 FilterBar 내부 버튼이라 바텀시트 없이 직접 변경 가능
    fireEvent.click(screen.getByText("무료"));

    expect(setSearchParams).toHaveBeenCalledTimes(1);
    const [params, options] = setSearchParams.mock.calls[0];
    expect(options).toEqual({ replace: true });
    expect((params as URLSearchParams).get("type")).toBe("FREE");
  });
});
