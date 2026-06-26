import { getRegionList, getRegionCluster } from "./region";
import { GET } from "../utils/axios";

// 팩토리 모킹: 실제 axios(ESM) 로드를 피한다 (CRA jest는 node_modules 미변환).
jest.mock("../utils/axios", () => ({
  GET: jest.fn(),
}));

const mockGET = GET as jest.MockedFunction<typeof GET>;

describe("region API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGET.mockResolvedValue({} as never);
  });

  it("getRegionList는 인증 GET으로 지역 그룹을 조회한다", async () => {
    await getRegionList();
    expect(mockGET).toHaveBeenCalledWith("/regions/groups", true);
  });

  it("getRegionCluster는 인증 GET으로 지역 클러스터를 조회한다", async () => {
    await getRegionCluster();
    expect(mockGET).toHaveBeenCalledWith("/region-clusters", true);
  });
});
