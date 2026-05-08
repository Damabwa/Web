/**
 * 이벤트 마감일까지 남은 일수 텍스트를 반환합니다.
 * @param endedAt - ISO 날짜 문자열 (ex. "2025-12-31")
 * @param startedAt - ISO 날짜 문자열 (선택). 제공 시 진행 전 이벤트 감지
 */
export function getDDayText(endedAt: string, startedAt?: string): string {
  // Intl.DateTimeFormat으로 KST 기준 오늘 날짜 문자열(YYYY-MM-DD)을 구함
  // toLocaleString 파싱은 Safari에서 불안정하므로 사용하지 않음
  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
  }).format(new Date());
  const [ty, tm, td] = todayStr.split("-").map(Number);
  const todayKST = new Date(ty, tm - 1, td);

  const [ey, em, ed] = endedAt.split("-").map(Number);
  const target = new Date(ey, em - 1, ed);

  const diffDays = Math.ceil(
    (target.getTime() - todayKST.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "마감된 이벤트";
  if (diffDays === 0) return "오늘 마감되는 이벤트";
  if (startedAt) {
    const [sy, sm, sd] = startedAt.split("-").map(Number);
    const start = new Date(sy, sm - 1, sd);
    if (start.getTime() > todayKST.getTime()) return "진행 전";
  }
  return `이벤트 마감까지 D-${diffDays}`;
}
