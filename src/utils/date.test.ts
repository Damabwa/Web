import { getDDayText } from "./date";

/**
 * getDDayText는 `new Date()`(현재 시각)에 의존하므로,
 * 가짜 타이머로 시스템 시간을 고정해 KST 기준 "오늘"을 결정론적으로 만든다.
 *
 * 고정 시각: 2025-06-15T03:00:00Z === KST 2025-06-15 12:00 → KST 오늘 = 2025-06-15
 */
describe("getDDayText", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-06-15T03:00:00Z"));
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("마감일이 오늘보다 과거이면 '마감된 이벤트'를 반환한다", () => {
    expect(getDDayText("2025-06-10")).toBe("마감된 이벤트");
  });

  it("마감일이 오늘이면 '오늘 마감되는 이벤트'를 반환한다", () => {
    expect(getDDayText("2025-06-15")).toBe("오늘 마감되는 이벤트");
  });

  it("마감일이 미래이면 'D-남은일수' 텍스트를 반환한다", () => {
    expect(getDDayText("2025-06-20")).toBe("이벤트 마감까지 D-5");
  });

  it("마감 하루 전이면 D-1을 반환한다", () => {
    expect(getDDayText("2025-06-16")).toBe("이벤트 마감까지 D-1");
  });

  it("시작일이 미래(아직 진행 전)이면 '진행 전'을 반환한다", () => {
    expect(getDDayText("2025-06-20", "2025-06-18")).toBe("진행 전");
  });

  it("시작일이 이미 지났으면 D-Day 텍스트를 반환한다", () => {
    expect(getDDayText("2025-06-20", "2025-06-14")).toBe("이벤트 마감까지 D-5");
  });

  it("마감된 이벤트는 시작일과 무관하게 '마감된 이벤트'를 우선 반환한다", () => {
    expect(getDDayText("2025-06-10", "2025-06-01")).toBe("마감된 이벤트");
  });
});
