// Daum 우편번호 스크립트를 필요한 시점에 1회만 지연 로드한다.
// (index.html head 동기 로드로 모든 페이지 첫 렌더를 차단하던 문제 해결)
const POSTCODE_SRC =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

let loadingPromise: Promise<void> | null = null;

export function loadDaumPostcode(): Promise<void> {
  // 이미 로드돼 있으면 즉시 resolve
  if (window.daum?.Postcode) return Promise.resolve();
  // 로드 진행 중이면 같은 Promise 재사용(중복 주입 방지)
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = POSTCODE_SRC;
    script.async = true;
    script.onload = () => {
      // 로드는 됐으나 전역이 설정되지 않은 드문 경우도 실패로 처리
      if (window.daum?.Postcode) resolve();
      else {
        loadingPromise = null;
        script.remove();
        reject(new Error("Daum 우편번호 전역 객체 미설정"));
      }
    };
    script.onerror = () => {
      // 실패 시 다음 시도에서 재로드할 수 있도록 캐시 해제 + 죽은 노드 제거
      loadingPromise = null;
      script.remove();
      reject(new Error("Daum 우편번호 스크립트 로드 실패"));
    };
    document.head.appendChild(script);
  });

  return loadingPromise;
}
