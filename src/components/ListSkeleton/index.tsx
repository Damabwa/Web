interface Props {
  variant: "event" | "photographer";
  count?: number;
}

/**
 * 리스트 로딩 중 표시하는 스켈레톤(자리표시자).
 * 데이터 도착 전 "결과 없음"이 깜빡이는 것을 막고 레이아웃 시프트를 줄인다.
 */
export default function ListSkeleton({ variant, count = 4 }: Props) {
  if (variant === "photographer") {
    return (
      <div
        className="relative grid grid-cols-2 gap-5 m-4"
        aria-busy="true"
        aria-label="작가 목록 불러오는 중"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-44 rounded-xl bg-gray100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-1 bg-gray50"
      aria-busy="true"
      aria-label="이벤트 목록 불러오는 중"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-3 p-4 bg-white">
          <div className="w-24 h-24 rounded-lg bg-gray100 animate-pulse shrink-0" />
          <div className="flex flex-col flex-1 gap-2 py-1">
            <div className="w-3/4 h-4 rounded bg-gray100 animate-pulse" />
            <div className="w-1/2 h-3 rounded bg-gray100 animate-pulse" />
            <div className="w-1/3 h-3 rounded bg-gray100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
