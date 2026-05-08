/**
 * 이벤트 마감일까지 남은 일수 텍스트를 반환합니다.
 * @param endedAt - ISO 날짜 문자열 (ex. "2025-12-31")
 * @param startedAt - ISO 날짜 문자열 (선택). 제공 시 진행 전 이벤트 감지
 */
export function getDDayText(endedAt: string, startedAt?: string): string {
  // KST 기준 오늘 날짜 (YYYY-MM-DD)를 구하기 위해 Asia/Seoul 타임존 사용
  const todayKST = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  // 마감일은 KST 당일 자정(00:00)으로 파싱하여 날짜 단위 비교
  const target = new Date(`${endedAt}T00:00:00+09:00`);

  const diffDays = Math.ceil(
    (target.getTime() - todayKST.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "마감된 이벤트";
  if (diffDays === 0) return "오늘 마감되는 이벤트";
  if (startedAt) {
    const start = new Date(`${startedAt}T00:00:00+09:00`);
    if (start.getTime() > todayKST.getTime()) return "진행 전";
  }
  return `이벤트 마감까지 D-${diffDays}`;
}
