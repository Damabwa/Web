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

const makeFile = (size: number, name = "photo.png") => {
  const file = new File(["data"], name, { type: "image/png" });
  Object.defineProperty(file, "size", { value: size });
  return file;
};

// upLoadFile에 전달된 FormData의 files 필드(파일명)를 꺼내 검증에 사용.
// FormData.get이 반환하는 객체 동일성은 환경마다 다를 수 있어 name으로 비교한다.
const uploadedFileName = () =>
  ((mockUpload.mock.calls[0][0] as FormData).get("files") as File).name;

describe("onImageHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpload.mockResolvedValue({ files: [uploaded] });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("1MB 미만 파일은 압축 없이 바로 업로드한다", async () => {
    const file = makeFile(0.5 * MB);
    const result = await onImageHandler(file, "PROFILE");

    expect(mockCompression).not.toHaveBeenCalled();
    expect(mockUpload).toHaveBeenCalledTimes(1);
    const formData = mockUpload.mock.calls[0][0] as FormData;
    expect(formData).toBeInstanceOf(FormData);
    expect(formData.get("fileType")).toBe("PROFILE");
    expect(uploadedFileName()).toBe("photo.png");
    expect(result).toEqual(uploaded);
  });

  it("정확히 1MB(경계값) 파일은 압축 경로를 탄다", async () => {
    const file = makeFile(1 * MB);
    const compressed = makeFile(0.5 * MB, "compressed.png");
    mockCompression.mockResolvedValue(compressed);

    await onImageHandler(file, "SNAP");

    expect(mockCompression).toHaveBeenCalledTimes(1);
    expect(uploadedFileName()).toBe("compressed.png");
  });

  it("1MB 초과 파일은 압축 후 압축본을 업로드한다", async () => {
    const file = makeFile(2 * MB);
    const compressed = makeFile(0.5 * MB, "compressed.png");
    mockCompression.mockResolvedValue(compressed);

    const result = await onImageHandler(file, "SNAP");

    expect(mockCompression).toHaveBeenCalledWith(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(uploadedFileName()).toBe("compressed.png");
    expect(result).toEqual(uploaded);
  });

  it("압축 실패 시 원본 파일로 업로드를 시도한다", async () => {
    const file = makeFile(4 * MB);
    mockCompression.mockRejectedValue(new Error("compress fail"));
    jest.spyOn(console, "error").mockImplementation(() => {});

    const result = await onImageHandler(file, "SNAP");

    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(uploadedFileName()).toBe("photo.png");
    expect(result).toEqual(uploaded);
  });

  it("업로드 실패 시 null을 반환한다", async () => {
    const file = makeFile(0.5 * MB);
    mockUpload.mockRejectedValue(new Error("upload fail"));
    jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await onImageHandler(file, "PROFILE");

    expect(result).toBeNull();
  });
});
