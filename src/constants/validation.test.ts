import { VALIDATION, PAGE_SIZE } from "./validation";

describe("VALIDATION.NICKNAME_USER", () => {
  const { REGEX, MIN, MAX } = VALIDATION.NICKNAME_USER;

  it("한글/영문/숫자 조합은 허용한다", () => {
    expect(REGEX.test("홍길동")).toBe(true);
    expect(REGEX.test("user123")).toBe(true);
    expect(REGEX.test("길동2")).toBe(true);
  });

  it("공백/특수문자/빈 문자열은 허용하지 않는다", () => {
    expect(REGEX.test("홍길 동")).toBe(false);
    expect(REGEX.test("user!")).toBe(false);
    expect(REGEX.test("")).toBe(false);
  });

  it("길이 경계값을 정의한다", () => {
    expect(MIN).toBe(2);
    expect(MAX).toBe(7);
  });
});

describe("VALIDATION.NICKNAME_PHOTOGRAPHER", () => {
  const { REGEX, MIN, MAX } = VALIDATION.NICKNAME_PHOTOGRAPHER;

  it("작가 닉네임은 공백을 허용한다", () => {
    expect(REGEX.test("스냅 작가")).toBe(true);
    expect(REGEX.test("photo studio")).toBe(true);
  });

  it("특수문자는 허용하지 않는다", () => {
    expect(REGEX.test("studio@")).toBe(false);
  });

  it("길이 경계값을 정의한다", () => {
    expect(MIN).toBe(2);
    expect(MAX).toBe(18);
  });
});

describe("VALIDATION.INSTAGRAM_ID", () => {
  // REGEX는 '허용되지 않는 문자'를 전역 매칭한다. 매칭이 없으면(null) 유효한 ID.
  const { REGEX } = VALIDATION.INSTAGRAM_ID;

  const hasInvalidChar = (id: string): boolean => {
    REGEX.lastIndex = 0; // 전역(g) 정규식의 상태 초기화
    return REGEX.test(id);
  };

  it("소문자/숫자/점/밑줄로만 이루어진 ID는 유효하다", () => {
    expect(hasInvalidChar("damabwa_01")).toBe(false);
    expect(hasInvalidChar("a.b.c")).toBe(false);
  });

  it("대문자/공백/기타 특수문자는 유효하지 않다", () => {
    expect(hasInvalidChar("Damabwa")).toBe(true);
    expect(hasInvalidChar("id with space")).toBe(true);
    expect(hasInvalidChar("id!")).toBe(true);
  });
});

describe("VALIDATION 길이 상수", () => {
  it("이벤트 제목/내용/이미지 제한을 정의한다", () => {
    expect(VALIDATION.EVENT_TITLE).toEqual({ MIN: 3, MAX: 30 });
    expect(VALIDATION.EVENT_CONTENT.MAX).toBe(500);
    expect(VALIDATION.EVENT_IMAGES.MAX).toBe(10);
  });
});

describe("PAGE_SIZE", () => {
  it("이벤트 페이지 크기를 정의한다", () => {
    expect(PAGE_SIZE.EVENT).toBe(5);
  });
});
