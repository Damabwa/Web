import { useEffect, useState } from "react";
import { getPhotographerList } from "../api/photographer";
import { PhotographerListItem } from "../types/photographer";

export function usePhotographerList(params: string, enabled = true) {
  const [photographers, setPhotographers] = useState<PhotographerListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
