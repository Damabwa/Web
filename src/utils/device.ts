export const isMobileDevice = (): boolean =>
  window.matchMedia("(max-width: 768px)").matches ||
  // 터치 우선 기기(폰/태블릿, iPad 데스크탑 모드 포함) 감지
  window.matchMedia("(pointer: coarse)").matches ||
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
