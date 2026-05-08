import imageCompression from "browser-image-compression";
import { upLoadFile } from "../api/file";

export const onImageHandler = async (file: File, fileType: string) => {
  const options = {
    maxSizeMB: 3,
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

  if (file.size >= 3 * 1024 * 1024) {
    const compressedFile = await compressFile(file);
    image = await uploadFile(compressedFile ?? file);
  } else image = await uploadFile(file);

  return image;
};
