export {};

// 모듈 내부 상태(loadingPromise)를 테스트마다 초기화하기 위해 isolateModules로 새로 로드한다.
const freshLoader = (): (() => Promise<void>) => {
  let fn!: () => Promise<void>;
  jest.isolateModules(() => {
    fn = require("./loadDaumPostcode").loadDaumPostcode;
  });
  return fn;
};

describe("loadDaumPostcode", () => {
  afterEach(() => {
    delete (window as any).daum;
    jest.restoreAllMocks();
  });

  it("이미 로드돼 있으면 스크립트를 주입하지 않고 즉시 resolve한다", async () => {
    (window as any).daum = { Postcode: function () {} };
    const createSpy = jest.spyOn(document, "createElement");

    await expect(freshLoader()()).resolves.toBeUndefined();
    expect(createSpy).not.toHaveBeenCalledWith("script");
  });

  it("스크립트 onload 후 전역이 설정돼 있으면 resolve한다", async () => {
    const script: any = { remove: jest.fn() };
    jest.spyOn(document, "createElement").mockReturnValue(script);
    jest.spyOn(document.head, "appendChild").mockImplementation((el: any) => {
      (window as any).daum = { Postcode: function () {} };
      el.onload();
      return el;
    });

    await expect(freshLoader()()).resolves.toBeUndefined();
    expect(script.src).toContain("postcode.v2.js");
  });

  it("onload됐지만 전역이 없으면 reject하고 노드를 정리한다", async () => {
    const script: any = { remove: jest.fn() };
    jest.spyOn(document, "createElement").mockReturnValue(script);
    jest.spyOn(document.head, "appendChild").mockImplementation((el: any) => {
      el.onload(); // window.daum 미설정 상태
      return el;
    });

    await expect(freshLoader()()).rejects.toThrow();
    expect(script.remove).toHaveBeenCalled();
  });

  it("로드 실패 시 reject하고, 캐시를 해제해 다음 호출에서 재주입한다", async () => {
    let injected = 0;
    jest.spyOn(document, "createElement").mockReturnValue({ remove: () => {} } as any);
    jest.spyOn(document.head, "appendChild").mockImplementation((el: any) => {
      injected += 1;
      // 실제 브라우저처럼 onerror는 appendChild 반환 이후 비동기로 발화
      Promise.resolve().then(() => el.onerror());
      return el;
    });

    const load = freshLoader();
    await expect(load()).rejects.toThrow();
    await expect(load()).rejects.toThrow();
    expect(injected).toBe(2); // 실패 후 캐시 해제로 두 번째도 새로 주입
  });

  it("로드 진행 중 동시 호출은 같은 Promise를 공유해 한 번만 주입한다", async () => {
    let injected = 0;
    let captured: any;
    jest.spyOn(document, "createElement").mockReturnValue({ remove: () => {} } as any);
    jest.spyOn(document.head, "appendChild").mockImplementation((el: any) => {
      injected += 1;
      captured = el;
      return el;
    });

    const load = freshLoader();
    const p1 = load();
    const p2 = load();
    (window as any).daum = { Postcode: function () {} };
    captured.onload();
    await Promise.all([p1, p2]);
    expect(injected).toBe(1);
  });
});
