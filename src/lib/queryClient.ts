import { QueryClient, QueryCache } from "@tanstack/react-query";

// 앱 전역 QueryClient. 기존 수동 패칭과 동작을 맞추기 위해 재시도는 끄고,
// 모바일에서 포커스 복귀 시 불필요한 재조회를 막는다.
// staleTime은 0(기본): 재방문 시 캐시를 즉시 보여줘 스켈레톤 깜빡임을 없애되
// 백그라운드 재검증으로 최신 상태(저장/신규 등)를 항상 반영한다.
export const queryClient = new QueryClient({
  // 쿼리 실패를 한 곳에서 로깅(기존 수동 패칭의 console.error 관찰성 유지/일원화)
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error("Query failed", query.queryKey, error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
