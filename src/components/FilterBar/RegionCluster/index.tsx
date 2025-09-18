import { useEffect, useState } from "react";
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

  const getRegionFunc = async () => {
    try {
      const res = await getRegionCluster();
      setLocList(res.regionClusters);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRegionFunc();
  }, []);

  useEffect(() => {
    if (locList.length > 0)
      setClusters([locList[0].category, ...locList[0].clusters]);
  }, [locList]);

  const handleAddRegion = (category: string, item: string) => {
    const fullname =
      category == item ? `${category} 전체` : `${category} ${item}`;
    if (locs.includes(fullname)) setLocs(locs.filter((l) => l !== fullname));
    else {
      if (locs.length >= maxNum) return;
      else if (category == item) setLocs([...locs, `${category} 전체`]);
      else setLocs([...locs, fullname]);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      {locList.length > 0 && (
        <div className="grid grid-cols-5 mb-2 gap-y-1 gap-x-2">
          {locList.map((item: any, index) => (
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
        {clusters.map((item: any, index) => (
          <button
            className={`py-[0.6rem] px-4 whitespace-nowrap rounded-lg border outline-none ${locs.includes(item) ? "text-violet400 border-violet400 bg-[#EAE0F6]" : " border-white bg-white"}`}
            key={index}
            onClick={() => handleAddRegion(clusters[0], item)}
          >
            {index > 0 ? item : `${item} 전체`}
          </button>
        ))}
      </div>
      {locs.length !== 0 && (
        <div className="flex gap-2 bg-[#E8EBEF] p-4 rounded-xl text-xs overflow-x-scroll">
          {locs.map((item: any, index) => (
            <div
              className="flex items-center py-1 pl-2 border rounded-lg outline-none min-w-fit whitespace-nowrap text-violet400 border-violet400 bg-[#EAE0F6]"
              key={index}
            >
              {item}
              <img
                className="cursor-pointer"
                src={icn_close}
                onClick={() => setLocs(locs.filter((l) => l !== item))}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
