// jest-dom은 DOM 노드용 커스텀 매처(toBeInTheDocument 등)를 추가합니다.
// CRA(react-scripts)는 src/setupTests 파일을 각 테스트 실행 전에 자동 로드합니다.
// 참고: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// recoil-persist 등으로 인해 localStorage가 테스트 간 공유되면 순서 의존성이
// 생긴다. 매 테스트 후 초기화해 상태 누수를 구조적으로 차단한다.
afterEach(() => {
  localStorage.clear();
});
