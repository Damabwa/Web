import { GET } from "../utils/axios";

interface RegionGroup {
  category: string;
  regions: string[];
}

interface RegionCluster {
  category: string;
  clusters: string[];
}

// 지역 데이터는 사실상 정적이므로 모듈 레벨에서 1회만 받아 캐시한다.
// (지역 선택 바/프로필 편집 진입마다 재호출되던 중복 요청 제거)
// 프로미스를 캐시해 동시 호출도 1회 요청으로 합치고, 실패 시 캐시를 비워 재시도를 허용한다.
let regionListCache: Promise<{ regionGroups: RegionGroup[] }> | null = null;
let regionClusterCache: Promise<{ regionClusters: RegionCluster[] }> | null =
  null;

export const getRegionList = () => {
  if (!regionListCache) {
    regionListCache = GET<{ regionGroups: RegionGroup[] }>(
      `/regions/groups`,
      true
    ).catch((e) => {
      regionListCache = null;
      throw e;
    });
  }
  return regionListCache;
};

export const getRegionCluster = () => {
  if (!regionClusterCache) {
    regionClusterCache = GET<{ regionClusters: RegionCluster[] }>(
      `/region-clusters`,
      true
    ).catch((e) => {
      regionClusterCache = null;
      throw e;
    });
  }
  return regionClusterCache;
};
