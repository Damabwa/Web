import { useQuery } from "@tanstack/react-query";
import { getPhotographerList } from "../api/photographer";
import { PhotographerListItem } from "../types/photographer";

export function usePhotographerList(
  params: string,
  enabled = true
): {
  photographers: PhotographerListItem[];
  isLoading: boolean;
  error: string | null;
} {
  const query = useQuery({
    queryKey: ["photographers", params],
    queryFn: () =>
      getPhotographerList(new URLSearchParams(params)).then((res) => res.items),
    enabled,
  });

  return {
    photographers: query.data ?? [],
    isLoading: query.isLoading,
    error: query.isError
      ? ((query.error as { message?: string })?.message ||
        "데이터를 불러오는 데 실패했습니다.")
      : null,
  };
}
