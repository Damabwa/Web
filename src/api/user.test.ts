import {
  refresh,
  checkUserExistence,
  getUserInfo,
  deleteUser,
  createUser,
  updateProfile,
} from "./user";
import { GET, POST, PUT, DELETE } from "../utils/axios";

// 팩토리 모킹: 실제 axios(ESM) 로드를 피한다 (CRA jest는 node_modules 미변환).
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

describe("user API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGET.mockResolvedValue({} as never);
    mockPOST.mockResolvedValue({} as never);
    mockPUT.mockResolvedValue({} as never);
    mockDELETE.mockResolvedValue({} as never);
  });

  it("refresh는 인증 GET으로 토큰을 재발급한다", async () => {
    await refresh();
    expect(mockGET).toHaveBeenCalledWith("/refresh-token", true);
  });

  it("checkUserExistence는 닉네임을 URL 인코딩하여 GET을 호출한다(인증 불필요)", async () => {
    await checkUserExistence("홍길동");
    expect(mockGET).toHaveBeenCalledWith(
      `/users/nicknames/existence?nickname=${encodeURIComponent("홍길동")}`
    );
  });

  it("getUserInfo는 인증 GET을 호출한다", async () => {
    await getUserInfo();
    expect(mockGET).toHaveBeenCalledWith("/users/me", true);
  });

  it("deleteUser는 인증 DELETE를 호출한다", async () => {
    await deleteUser();
    expect(mockDELETE).toHaveBeenCalledWith("/users/me", true);
  });

  it("createUser는 본문과 함께 인증 POST를 호출한다", async () => {
    const body = { nickname: "신규" } as never;
    await createUser(body);
    expect(mockPOST).toHaveBeenCalledWith("/users/me/registration", body, true);
  });

  it("updateProfile은 본문과 함께 인증 PUT을 호출한다", async () => {
    const body = { nickname: "수정" } as never;
    await updateProfile(body);
    expect(mockPUT).toHaveBeenCalledWith("/users/me/profile", body, true);
  });
});
