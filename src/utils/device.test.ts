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

  // 쿼리별로 matches를 다르게 반환(예: max-width는 false, pointer:coarse는 true)
  const setMatchMediaByQuery = (matchesFor: (query: string) => boolean) => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: matchesFor(query),
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

  it("포인터가 coarse(터치)면 너비/UA가 데스크탑이어도 모바일로 판별한다", () => {
    // 예: iPad 데스크탑 모드 (넓은 뷰포트 + Macintosh UA + 터치)
    setMatchMediaByQuery((query) => query.includes("coarse"));
    setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    expect(isMobileDevice()).toBe(true);
  });

  it("좁은 화면도 아니고 터치도 아니고 데스크탑 UA이면 false를 반환한다", () => {
    setMatchMediaByQuery(() => false);
    setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)");
    expect(isMobileDevice()).toBe(false);
  });
});
