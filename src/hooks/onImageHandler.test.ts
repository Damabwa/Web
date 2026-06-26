import { onImageHandler } from "./onImageHandler";
import imageCompression from "browser-image-compression";
import { upLoadFile } from "../api/file";

jest.mock("browser-image-compression", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../api/file", () => ({ upLoadFile: jest.fn() }));

const mockCompression = imageCompression as jest.MockedFunction<
  typeof imageCompression
>;
const mockUpload = upLoadFile as jest.MockedFunction<typeof upLoadFile>;

const MB = 1024 * 1024;
const uploaded = { name: "photo.png", url: "https://cdn/photo.png" };

const makeFile = (size: number) => {
  const file = new File(["data"], "photo.png", { type: "image/png" });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

describe("onImageHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpload.mockResolvedValue({ files: [uploaded] });
  });

  it("3MB 미만 파일은 압축 없이 바로 업로드한다", async () => {
    const file = makeFile(1 * MB);
    const result = await onImageHandler(file, "PROFILE");

    expect(mockCompression).not.toHaveBeenCalled();
    expect(mockUpload).toHaveBeenCalledTimes(1);
    const formData = mockUpload.mock.calls[0][0];
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get("fileType")).toBe("PROFILE");
    expect(result).toEqual(uploaded);
  });

  it("3MB 이상 파일은 압축 후 업로드한다", async () => {
    const file = makeFile(4 * MB);
    const compressed = makeFile(2 * MB);
    mockCompression.mockResolvedValue(compressed);

    const result = await onImageHandler(file, "SNAP");

    expect(mockCompression).toHaveBeenCalledWith(file, {
      maxSizeMB: 3,
      useWebWorker: true,
    });
    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(result).toEqual(uploaded);
  });

  it("압축 실패 시 원본 파일로 업로드를 시도한다", async () => {
    const file = makeFile(4 * MB);
    mockCompression.mockRejectedValue(new Error("compress fail"));
    const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = await onImageHandler(file, "SNAP");

    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(result).toEqual(uploaded);
    errSpy.mockRestore();
  });

  it("업로드 실패 시 null을 반환한다", async () => {
    const file = makeFile(1 * MB);
    mockUpload.mockRejectedValue(new Error("upload fail"));
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await onImageHandler(file, "PROFILE");

    expect(result).toBeNull();
    logSpy.mockRestore();
  });
});
