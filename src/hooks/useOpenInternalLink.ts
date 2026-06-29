import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { isMobileDevice } from "../utils/device";

/**
 * 앱 내부 경로를 여는 공통 헬퍼.
 * - 모바일(터치) 기기: 같은 탭 navigate → 뒤로가기 가능
 * - 데스크탑: 새 탭(window.open)
 *
 * 카드 클릭 등 내부 상세 페이지 이동에 사용한다.
 */
export function useOpenInternalLink() {
  const navigate = useNavigate();

  return useCallback(
    (path: string) => {
      if (isMobileDevice()) navigate(path);
      else window.open(path);
    },
    [navigate]
  );
}
