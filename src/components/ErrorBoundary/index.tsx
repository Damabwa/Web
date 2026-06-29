import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * 렌더/청크 로드 중 에러를 잡아 흰 화면 대신 폴백 UI를 보여준다.
 * (코드 스플리팅 도입 시 청크 fetch 실패 — 예: 배포 직후 구 청크 404 — 대비)
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-dvh-safe gap-4 px-6 text-center">
          <p className="text-sm text-black02">
            페이지를 불러오지 못했어요.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2 text-sm font-semibold text-white transition-transform rounded-xl bg-violet400 active:scale-95"
          >
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
