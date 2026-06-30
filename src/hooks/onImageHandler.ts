import imageCompression from "browser-image-compression";
import { upLoadFile } from "../api/file";

export const onImageHandler = async (file: File, fileType: string) => {
  const options = {
    maxSizeMB: 1,
    // 긴 변(최대 폭/높이)을 제한해 고해상도 사진의 변환·업로드·표시 속도를 개선.
    // (제한 없으면 원본 해상도 유지로 압축이 매우 느림)
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const uploadFile = async (file: File | Blob) => {
    const formData = new FormData();
    formData.append("fileType", fileType);
    formData.append("files", file);
    try {
      const res = await upLoadFile(formData);
      return res.files[0];
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  const compressFile = async (file: File): Promise<File | null> => {
    try {
      const res = await imageCompression(file, options);
      return res;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  let image = null;

  // 1MB 이상이면 압축·리사이즈. 기존 3MB 임계값은 1~2.9MB 고해상도 사진을
  // 원본 그대로 업로드시켜 목록/상세 표시 대역폭·디코딩을 낭비했다.
  if (file.size >= 1 * 1024 * 1024) {
    const compressedFile = await compressFile(file);
    image = await uploadFile(compressedFile ?? file);
  } else image = await uploadFile(file);

  return image;
};
