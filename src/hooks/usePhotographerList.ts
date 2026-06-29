import { useEffect, useState } from "react";
import { getPhotographerList } from "../api/photographer";
import { PhotographerListItem } from "../types/photographer";

export function usePhotographerList(params: string, enabled = true) {
  const [photographers, setPhotographers] = useState<PhotographerListItem[]>([]);
  // enabled면 마운트 즉시 fetch하므로 초기부터 로딩 상태(첫 프레임 빈상태 깜빡임 방지)
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    getPhotographerList(new URLSearchParams(params))
      .then((res) => {
        if (!cancelled) setPhotographers(res.items);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "데이터를 불러오는 데 실패했습니다.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params, enabled]);

  return { photographers, isLoading, error };
}
