import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

interface ProviderOptions extends Omit<RenderOptions, "wrapper"> {
  /** MemoryRouter 초기 히스토리 스택 */
  initialEntries?: string[];
  /** MemoryRouter 초기 인덱스 */
  initialIndex?: number;
}

/**
 * 앱과 동일한 전역 컨텍스트(RecoilRoot + Router)로 감싸 컴포넌트를 렌더한다.
 * 실제 앱은 BrowserRouter를 쓰지만, 테스트에서는 히스토리를 제어할 수 있는
 * MemoryRouter를 사용한다.
 */
export function renderWithProviders(
  ui: ReactElement,
  { initialEntries = ["/"], initialIndex, ...options }: ProviderOptions = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <RecoilRoot>
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        {children}
      </MemoryRouter>
    </RecoilRoot>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

// 테스트에서 renderWithProviders 한 곳만 import하면 되도록 RTL을 재export한다.
export * from "@testing-library/react";
