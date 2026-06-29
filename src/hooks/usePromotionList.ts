import { useEffect, useState } from "react";
import { getPromotionList } from "../api/promotion";
import { PromotionListItem } from "../types/promotion";

export function usePromotionList(params: string, enabled = true) {
  const [promotions, setPromotions] = useState<PromotionListItem[]>([]);
  // enabled면 마운트 즉시 fetch하므로 초기부터 로딩 상태(첫 프레임 빈상태 깜빡임 방지)
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    getPromotionList(new URLSearchParams(params))
      .then((res) => {
        if (!cancelled) setPromotions(res.items);
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

  return { promotions, isLoading, error };
}
