import { POST } from "../utils/axios";

export const upLoadFile = async (body: any) => await POST(`/files`, body, true);
