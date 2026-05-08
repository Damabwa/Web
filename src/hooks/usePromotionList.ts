import { useEffect, useState } from "react";
import { getPromotionList } from "../api/promotion";
import { PromotionListItem } from "../types/promotion";

export function usePromotionList(params: string, enabled = true) {
  const [promotions, setPromotions] = useState<PromotionListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    getPromotionList(params)
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
