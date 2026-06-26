import { isMobileDevice } from "./device";

/**
 * isMobileDevice는 다음 중 하나라도 참이면 true를 반환한다.
 *  1) window.matchMedia("(max-width: 768px)").matches
 *  2) navigator.userAgent가 모바일 패턴과 일치
 *
 * jsdom은 matchMedia를 구현하지 않으므로 직접 모킹한다.
 */
describe("isMobileDevice", () => {
  const originalMatchMedia = window.matchMedia;
  const originalUA = window.navigator.userAgent;

  const setMatchMedia = (matches: boolean) => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  };

  const setUserAgent = (ua: string) => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: ua,
      configurable: true,
    });
  };

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    Object.defineProperty(window.navigator, "userAgent", {
      value: originalUA,
      configurable: true,
    });
  });

  it("미디어 쿼리가 매칭되면 userAgent와 무관하게 true를 반환한다", () => {
    setMatchMedia(true);
    setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    expect(isMobileDevice()).toBe(true);
  });

  it("미디어 쿼리는 미매칭이어도 모바일 userAgent이면 true를 반환한다", () => {
    setMatchMedia(false);
    setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)");
    expect(isMobileDevice()).toBe(true);
  });

  it("미디어 쿼리 미매칭 + 데스크탑 userAgent이면 false를 반환한다", () => {
    setMatchMedia(false);
    setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    expect(isMobileDevice()).toBe(false);
  });

  it("Android userAgent도 모바일로 판별한다", () => {
    setMatchMedia(false);
    setUserAgent("Mozilla/5.0 (Linux; Android 14)");
    expect(isMobileDevice()).toBe(true);
  });
});
