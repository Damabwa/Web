import imageCompression from "browser-image-compression";
import { upLoadFile } from "../api/file";

export const onImageHandler = async (file: File, fileType: string) => {
  const options = {
    maxSizeMB: 3,
    useWebWorker: true,
  };

  const uploadFileFunc = async (file: any) => {
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

  const compressFile = async (file: any) => {
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
    if (compressedFile) image = await uploadFileFunc(compressedFile);
  } else image = await uploadFileFunc(file);

  return image;
};
