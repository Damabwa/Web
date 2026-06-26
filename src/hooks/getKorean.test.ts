import { getOrder, getPhotoType } from "./getKorean";

describe("getOrder", () => {
  it.each([
    ["LATEST", "최신순"],
    ["POPULAR", "인기순"],
    ["ALL", "전체"],
    ["UPCOMING", "예정"],
    ["ONGOING", "진행중"],
    ["ENDED", "마감"],
  ])("'%s'를 '%s'로 변환한다", (input, expected) => {
    expect(getOrder(input)).toBe(expected);
  });

  it("정의되지 않은 값은 입력을 그대로 반환한다", () => {
    expect(getOrder("UNKNOWN")).toBe("UNKNOWN");
    expect(getOrder("")).toBe("");
  });
});

describe("getPhotoType", () => {
  it.each([
    ["SNAP", "스냅"],
    ["PROFILE", "프로필"],
    ["CONCEPT", "컨셉"],
    ["ID_PHOTO", "증명"],
    ["SELF", "셀프"],
  ])("'%s'를 '%s'로 변환한다", (input, expected) => {
    expect(getPhotoType(input)).toBe(expected);
  });

  it("정의되지 않은 값은 입력을 그대로 반환한다", () => {
    expect(getPhotoType("ETC")).toBe("ETC");
    expect(getPhotoType("")).toBe("");
  });
});
