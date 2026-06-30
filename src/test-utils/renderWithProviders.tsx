import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot, MutableSnapshot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProviderOptions extends Omit<RenderOptions, "wrapper"> {
  /** MemoryRouter 초기 히스토리 스택 */
  initialEntries?: string[];
  /** MemoryRouter 초기 인덱스 */
  initialIndex?: number;
  /** RecoilRoot 초기 상태 주입 (예: 로그인/권한 상태 설정) */
  initializeState?: (snapshot: MutableSnapshot) => void;
}

/**
 * 앱과 동일한 전역 컨텍스트(RecoilRoot + Router)로 감싸 컴포넌트를 렌더한다.
 * 실제 앱은 BrowserRouter를 쓰지만, 테스트에서는 히스토리를 제어할 수 있는
 * MemoryRouter를 사용한다.
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    initialEntries = ["/"],
    initialIndex,
    initializeState,
    ...options
  }: ProviderOptions = {}
) {
  // 테스트마다 새 QueryClient로 캐시 격리. 재시도는 꺼 실패 테스트가 빠르게 끝나도록.
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot initializeState={initializeState}>
        <MemoryRouter
          initialEntries={initialEntries}
          initialIndex={initialIndex}
        >
          {children}
        </MemoryRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

// 테스트에서 renderWithProviders 한 곳만 import하면 되도록 RTL을 재export한다.
export * from "@testing-library/react";
