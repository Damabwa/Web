import {
  checkPhotographerExistence,
  getPhotographerList,
  getSavedPhotographerList,
  getPhotographerInfo,
  createPhotographer,
  createSavedPhotographer,
  updatePhotographerPage,
  updatePhotographerProfile,
  deleteSavedPhotographer,
} from "./photographer";
import { GET, POST, PUT, DELETE } from "../utils/axios";

// 얇은 API 래퍼의 핵심 로직(URL 구성, auth 플래그)을 검증하기 위해
// axios HTTP 헬퍼를 모킹한다. 팩토리 모킹을 써서 실제 axios(ESM) 모듈 로드를
// 피한다 — CRA의 jest는 node_modules를 변환하지 않아 axios v1 ESM 파싱에 실패한다.
jest.mock("../utils/axios", () => ({
  GET: jest.fn(),
  POST: jest.fn(),
  PUT: jest.fn(),
  DELETE: jest.fn(),
}));

const mockGET = GET as jest.MockedFunction<typeof GET>;
const mockPOST = POST as jest.MockedFunction<typeof POST>;
const mockPUT = PUT as jest.MockedFunction<typeof PUT>;
const mockDELETE = DELETE as jest.MockedFunction<typeof DELETE>;

describe("photographer API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockGET.mockResolvedValue({} as never);
    mockPOST.mockResolvedValue({} as never);
    mockPUT.mockResolvedValue({} as never);
    mockDELETE.mockResolvedValue({} as never);
  });

  it("checkPhotographerExistence는 닉네임을 URL 인코딩하여 GET을 호출한다", async () => {
    // 작가 닉네임은 공백을 허용하므로 인코딩하지 않으면 쿼리가 깨진다.
    await checkPhotographerExistence("스튜디오 가");
    expect(mockGET).toHaveBeenCalledWith(
      `/photographers/nicknames/existence?nickname=${encodeURIComponent(
        "스튜디오 가"
      )}`
    );
    // 공백이 %20으로 인코딩되어 raw 공백이 남지 않아야 한다.
    expect(mockGET.mock.calls[0][0]).toContain("%20");
    expect(mockGET.mock.calls[0][0]).not.toContain("가 ");
  });

  it("getPhotographerList는 토큰이 없으면 auth=false로 호출한다", async () => {
    const params = new URLSearchParams({ sort: "LATEST", page: "1" });
    await getPhotographerList(params);
    expect(mockGET).toHaveBeenCalledWith(
      `/photographers/list?${params.toString()}`,
      false
    );
  });

  it("getPhotographerList는 토큰이 있으면 auth=true로 호출한다", async () => {
    localStorage.setItem("accessToken", "token-123");
    const params = new URLSearchParams({ sort: "POPULAR" });
    await getPhotographerList(params);
    expect(mockGET).toHaveBeenCalledWith(
      `/photographers/list?${params.toString()}`,
      true
    );
  });

  it("getSavedPhotographerList는 인증 GET을 호출한다", async () => {
    await getSavedPhotographerList();
    expect(mockGET).toHaveBeenCalledWith("/photographers/saved", true);
  });

  it("getPhotographerInfo는 id 경로로 인증 GET을 호출한다", async () => {
    await getPhotographerInfo(7);
    expect(mockGET).toHaveBeenCalledWith("/photographers/7/details", true);
  });

  it("createPhotographer는 본문과 함께 인증 POST를 호출한다", async () => {
    const body = { nickname: "작가" } as never;
    await createPhotographer(body);
    expect(mockPOST).toHaveBeenCalledWith(
      "/photographers/me/registration",
      body,
      true
    );
  });

  it("createSavedPhotographer는 빈 본문으로 인증 POST를 호출한다", async () => {
    await createSavedPhotographer(3);
    expect(mockPOST).toHaveBeenCalledWith("/photographers/3/save", {}, true);
  });

  it("updatePhotographerPage는 인증 PUT을 호출한다", async () => {
    const body = { intro: "소개" } as never;
    await updatePhotographerPage(body);
    expect(mockPUT).toHaveBeenCalledWith("/photographers/me/page", body, true);
  });

  it("updatePhotographerProfile은 인증 PUT을 호출한다", async () => {
    const body = { nickname: "변경" } as never;
    await updatePhotographerProfile(body);
    expect(mockPUT).toHaveBeenCalledWith(
      "/photographers/me/profile",
      body,
      true
    );
  });

  it("deleteSavedPhotographer는 인증 DELETE를 호출한다", async () => {
    await deleteSavedPhotographer(9);
    expect(mockDELETE).toHaveBeenCalledWith("/photographers/9/unsave", true);
  });
});
