export const isMobileDevice = (): boolean =>
  window.matchMedia("(max-width: 768px)").matches ||
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
