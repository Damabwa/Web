import { useQuery } from "@tanstack/react-query";
import { getPromotionList } from "../api/promotion";
import { PromotionListItem } from "../types/promotion";

export function usePromotionList(
  params: string,
  enabled = true
): { promotions: PromotionListItem[]; isLoading: boolean; error: string | null } {
  const query = useQuery({
    queryKey: ["promotions", params],
    queryFn: () =>
      getPromotionList(new URLSearchParams(params)).then((res) => res.items),
    enabled,
  });

  return {
    promotions: query.data ?? [],
    isLoading: query.isLoading,
    error: query.isError
      ? ((query.error as { message?: string })?.message ||
        "데이터를 불러오는 데 실패했습니다.")
      : null,
  };
}
