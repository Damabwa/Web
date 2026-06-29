import {
  getPromotionList,
  getSavedPromotionList,
  getPromotionDetail,
  getPromotion,
  createPromotion,
  createSavedPromotion,
  updatePromotion,
  deleteSavedPromotion,
  deletePromotion,
} from "./promotion";
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

describe("promotion API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    mockGET.mockResolvedValue({} as never);
    mockPOST.mockResolvedValue({} as never);
    mockPUT.mockResolvedValue({} as never);
    mockDELETE.mockResolvedValue({} as never);
  });

  it("getPromotionList는 토큰 유무에 따라 auth 플래그를 결정한다", async () => {
    const params = new URLSearchParams({ status: "ONGOING" });

    await getPromotionList(params);
    expect(mockGET).toHaveBeenLastCalledWith(
      `/promotions/list?${params.toString()}`,
      false
    );

    localStorage.setItem("accessToken", "t");
    await getPromotionList(params);
    expect(mockGET).toHaveBeenLastCalledWith(
      `/promotions/list?${params.toString()}`,
      true
    );
  });

  it("getSavedPromotionList는 인증 GET을 호출한다", async () => {
    await getSavedPromotionList();
    expect(mockGET).toHaveBeenCalledWith("/promotions/saved", true);
  });

  it("getPromotionDetail은 토큰이 있으면 auth=true로 호출한다", async () => {
    localStorage.setItem("accessToken", "t");
    await getPromotionDetail(5);
    expect(mockGET).toHaveBeenCalledWith("/promotions/5/details", true);
  });

  it("getPromotionDetail은 토큰이 없으면 auth=false로 호출한다", async () => {
    await getPromotionDetail(5);
    expect(mockGET).toHaveBeenCalledWith("/promotions/5/details", false);
  });

  it("getPromotion은 인증 없이 GET을 호출한다", async () => {
    await getPromotion(8);
    expect(mockGET).toHaveBeenCalledWith("/promotions/8");
  });

  it("createPromotion은 본문과 함께 인증 POST를 호출한다", async () => {
    const body = { title: "프로모션" } as never;
    await createPromotion(body);
    expect(mockPOST).toHaveBeenCalledWith("/promotions", body, true);
  });

  it("createSavedPromotion은 빈 본문으로 인증 POST를 호출한다", async () => {
    await createSavedPromotion(2);
    expect(mockPOST).toHaveBeenCalledWith("/promotions/2/save", {}, true);
  });

  it("updatePromotion은 id 경로와 본문으로 인증 PUT을 호출한다", async () => {
    const body = { title: "수정" } as never;
    await updatePromotion(4, body);
    expect(mockPUT).toHaveBeenCalledWith("/promotions/4", body, true);
  });

  it("deleteSavedPromotion은 인증 DELETE를 호출한다", async () => {
    await deleteSavedPromotion(6);
    expect(mockDELETE).toHaveBeenCalledWith("/promotions/6/unsave", true);
  });

  it("deletePromotion은 인증 DELETE를 호출한다", async () => {
    await deletePromotion(6);
    expect(mockDELETE).toHaveBeenCalledWith("/promotions/6", true);
  });
});
