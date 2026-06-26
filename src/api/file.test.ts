import { upLoadFile } from "./file";
import { POST } from "../utils/axios";

// 팩토리 모킹: 실제 axios(ESM) 로드를 피한다 (CRA jest는 node_modules 미변환).
jest.mock("../utils/axios", () => ({
  POST: jest.fn(),
}));

const mockPOST = POST as jest.MockedFunction<typeof POST>;

describe("file API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPOST.mockResolvedValue({ files: [] } as never);
  });

  it("upLoadFile은 FormData를 인증 POST로 /files에 업로드한다", async () => {
    const formData = new FormData();
    formData.append("fileType", "PROFILE");
    await upLoadFile(formData);
    expect(mockPOST).toHaveBeenCalledWith("/files", formData, true);
  });
});
