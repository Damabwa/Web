import { GET, PUT, POST, DELETE } from "../utils/axios";

export const upLoadFile = async (body: any) => await POST(`/files`, body, true);
