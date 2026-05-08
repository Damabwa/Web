import { useEffect, useState } from "react";
import { getPhotographerList } from "../api/photographer";
import { PhotographerListItem } from "../types/photographer";

export function usePhotographerList(params: string, enabled = true) {
  const [photographers, setPhotographers] = useState<PhotographerListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    setIsLoading(true);
    getPhotographerList(params)
      .then((res) => {
        if (!cancelled) setPhotographers(res.items);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params, enabled]);

  return { photographers, isLoading };
}
