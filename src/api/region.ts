import { GET } from "../utils/axios";

interface RegionGroup {
  category: string;
  regions: string[];
}

interface RegionCluster {
  category: string;
  clusters: string[];
}

export const getRegionList = async () =>
  await GET<{ regionGroups: RegionGroup[] }>(`/regions/groups`, true);

export const getRegionCluster = async () =>
  await GET<{ regionClusters: RegionCluster[] }>(`/region-clusters`, true);
