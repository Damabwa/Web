import { GET, PUT, POST, DELETE } from "../utils/axios";

export const getRegionList = async () => await GET(`/regions/groups`, true);

export const getRegionCluster = async () => await GET(`/region-clusters`, true);
