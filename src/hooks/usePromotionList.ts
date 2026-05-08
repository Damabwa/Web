import { useEffect, useState } from "react";
import { getPromotionList } from "../api/promotion";
import { PromotionListItem } from "../types/promotion";

export function usePromotionList(params: string, enabled = true) {
  const [promotions, setPromotions] = useState<PromotionListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsLoading(true);
    getPromotionList(params)
      .then((res) => {
        if (!cancelled) setPromotions(res.items);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params, enabled]);

  return { promotions, isLoading };
}
