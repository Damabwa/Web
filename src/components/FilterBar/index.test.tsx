import { fireEvent } from "@testing-library/react";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import FilterBar from ".";

// 바텀시트(FilterType)는 본 테스트 범위 밖이라 가볍게 모킹하되,
// "현재 정렬값을 그대로 다시 선택"하는 경로(dedup 검증용)만 노출한다.
jest.mock("./FilterType", () => (props: any) => (
  <button
    type="button"
    onClick={() => props.handleFilterChange("sortType", props.filters.sortType)}
  >
    정렬-재선택
  </button>
));

describe("FilterBar - 히스토리/재조회 제어", () => {
  it("URL에 이미 적용된 필터가 있으면 마운트 시 덮어쓰지 않는다(필터 유지)", () => {
    const setSearchParams = jest.fn();
    renderWithProviders(
      <FilterBar isEvent={true} setSearchParams={setSearchParams} />,
      { initialEntries: ["/event?sortType=POPULAR"] }
    );

    // 디폴트로 덮어쓰는 호출이 없어야 한다(POPULAR가 살아있어야 함)
    expect(setSearchParams).not.toHaveBeenCalled();
  });

  it("필터 변경은 replace로 호출하면서 변경값을 URL에 반영한다", () => {
    const setSearchParams = jest.fn();
    renderWithProviders(
      <FilterBar isEvent={true} setSearchParams={setSearchParams} />,
      { initialEntries: ["/event?sortType=LATEST"] }
    );
    setSearchParams.mockClear();

    fireEvent.click(screen.getByText("무료")); // type=FREE 추가

    expect(setSearchParams).toHaveBeenCalledTimes(1);
    const [params, options] = setSearchParams.mock.calls[0];
    expect(options).toEqual({ replace: true });
    expect((params as URLSearchParams).get("type")).toBe("FREE");
    expect((params as URLSearchParams).get("sortType")).toBe("LATEST");
  });

  it("결과값이 바뀌지 않는 조작(같은 정렬 재선택)은 재조회를 트리거하지 않는다", () => {
    const setSearchParams = jest.fn();
    renderWithProviders(
      <FilterBar isEvent={true} setSearchParams={setSearchParams} />,
      { initialEntries: ["/event?sortType=LATEST"] }
    );
    // 정렬 칩(현재값 "최신순"=LATEST)을 눌러 바텀시트(모킹된 FilterType)를 연다
    fireEvent.click(screen.getByText("최신순"));
    setSearchParams.mockClear();

    // 현재 정렬(LATEST)을 그대로 다시 선택 → filters 객체는 새로 생기지만 쿼리는 동일
    fireEvent.click(screen.getByText("정렬-재선택"));
    fireEvent.click(screen.getByText("정렬-재선택"));

    // 동일 쿼리이므로 단 한 번도 setSearchParams가 호출되면 안 된다
    expect(setSearchParams).not.toHaveBeenCalled();
  });

  it("배열 필터(촬영 종류)가 URL에 있어도 마운트 시 동일하게 재직렬화돼 덮어쓰지 않는다", () => {
    const setSearchParams = jest.fn();
    renderWithProviders(
      <FilterBar isEvent={true} setSearchParams={setSearchParams} />,
      { initialEntries: ["/event?sortType=LATEST&photographyTypes=SNAP,WEDDING"] }
    );

    // 콤마 배열을 split→배열 복원 후 effect가 같은 쿼리로 재직렬화 → dedup으로 스킵
    expect(setSearchParams).not.toHaveBeenCalled();
  });
});
