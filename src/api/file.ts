import { POST } from "../utils/axios";
import { ImageFile } from "../types/common";

export const upLoadFile = async (body: FormData) =>
  await POST<{ files: ImageFile[] }>(`/files`, body, true);
