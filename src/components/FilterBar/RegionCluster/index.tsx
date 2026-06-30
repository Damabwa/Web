import { useEffect, useMemo, useState } from "react";
import { getRegionCluster } from "../../../api/region";
import icn_close from "../../../assets/svgs/icn_closeRegion.svg";

interface Props {
  locs: string[];
  setLocs: React.Dispatch<React.SetStateAction<string[]>>;
  maxNum: number;
}

interface Loc {
  category: string;
  clusters: string[];
}

export default function RegionCluster({ locs, setLocs, maxNum }: Props) {
  const [locList, setLocList] = useState<Loc[]>([]);
  const [clusters, setClusters] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // locs는 "category 전체"/"category name" 형태의 풀네임 문자열 배열. O(1) 선택 조회용 Set.
  const selectedSet = useMemo(() => new Set(locs), [locs]);

  const fetchRegion = async () => {
    try {
      const res = await getRegionCluster();
      setLocList(res.regionClusters);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRegion();
  }, []);

  useEffect(() => {
    if (locList.length > 0)
      setClusters([locList[0].category, ...locList[0].clusters]);
  }, [locList]);

  const handleAddRegion = (category: string, item: string) => {
    const fullname =
      category === item ? `${category} 전체` : `${category} ${item}`;
    if (locs.includes(fullname)) setLocs(locs.filter((l) => l !== fullname));
    else {
      if (locs.length >= maxNum) return;
      else if (category === item) setLocs([...locs, `${category} 전체`]);
      else setLocs([...locs, fullname]);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      {locList.length > 0 && (
        <div className="grid grid-cols-5 mb-2 gap-y-1 gap-x-2">
          {locList.map((item, index) => (
            <button
              className={`py-[0.44rem] text-sm font-medium border rounded-3xl whitespace-nowrap ${selectedIndex === index ? "border-black" : "border-white"}`}
              key={item.category}
              onClick={() => {
                setSelectedIndex(index);
                setClusters([`${item.category}`, ...item.clusters]);
              }}
            >
              {item.category}
            </button>
          ))}
        </div>
      )}
      <div className="bg-[#E8EBEF] p-4 rounded-xl text-sm font-medium flex flex-wrap gap-2">
        {clusters.map((item, index) => {
          // 저장 포맷과 동일한 풀네임으로 선택 여부를 판정한다.
          // (기존엔 bare item으로 includes 검사해 칩이 선택 표시되지 않던 버그)
          const fullname =
            item === clusters[0]
              ? `${clusters[0]} 전체`
              : `${clusters[0]} ${item}`;
          return (
            <button
              className={`py-[0.6rem] px-4 whitespace-nowrap rounded-lg border outline-none ${selectedSet.has(fullname) ? "text-violet400 border-violet400 bg-[#EAE0F6]" : " border-white bg-white"}`}
              key={fullname}
              onClick={() => handleAddRegion(clusters[0], item)}
            >
              {index > 0 ? item : `${item} 전체`}
            </button>
          );
        })}
      </div>
      {locs.length !== 0 && (
        <div className="flex gap-2 bg-[#E8EBEF] p-4 rounded-xl text-xs overflow-x-scroll">
          {locs.map((item) => (
            <div
              className="flex items-center py-1 pl-2 border rounded-lg outline-none min-w-fit whitespace-nowrap text-violet400 border-violet400 bg-[#EAE0F6]"
              key={item}
            >
              {item}
              <img
                className="cursor-pointer"
                src={icn_close}
                alt="삭제"
                onClick={() => setLocs(locs.filter((l) => l !== item))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
