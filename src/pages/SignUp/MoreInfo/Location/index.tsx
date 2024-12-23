import { useEffect, useState } from "react";
import axios from "axios";
import icn_close from "../../../../assets/svgs/icn_closeRegion.svg";

interface Props {
  locs: string[];
  setLocs: React.Dispatch<React.SetStateAction<string[]>>;
}

interface Loc {
  category: string;
  regions: string[];
}

export default function Location({ locs, setLocs }: Props) {
  const [locList, setLocList] = useState<Loc[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://api-dev.damaba.me/api/v1/regions/groups")
      .then((res: any) => {
        setLocList(
          res.data.regionGroups.map((item: any) => ({
            ...item,
            regions: item.regions.map(
              (region: string) => `${item.category} ${region.trim()}`
            ),
          }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (locList.length > 0) setRegions(locList[0].regions);
  }, [locList]);

  const handleAddRegion = (item: string) => {
    if (locs.length >= 5) return;
    if (!locs.includes(item)) setLocs([...locs, item]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium ">
        <span className="text-red">*</span>
        <span>활동 지역</span>
        <span className="pl-1 text-xs text-textgray">
          (최대 5개까지 선택 가능해요)
        </span>
      </div>
      {locList.length > 0 && (
        <div className="grid grid-cols-5 mb-2">
          {locList.map((item: any, index) => (
            <button
              className={`py-2 mx-1 text-sm font-semibold border rounded-3xl ${selectedIndex === index ? "border-black" : "border-white"}`}
              key={item.category}
              onClick={() => {
                setSelectedIndex(index);
                setRegions(item.regions);
              }}
            >
              {item.category}
            </button>
          ))}
        </div>
      )}
      {regions.length > 0 && (
        <div className="grid gap-4 grid-cols-4 bg-[#E8EBEF] p-4 rounded-xl text-sm">
          {regions.map((item: any, index) => (
            <button
              className={`py-[0.6rem] rounded-lg border outline-none ${locs.includes(item) ? "text-violet400 border-violet400 bg-[#EAE0F6]" : " border-white bg-white"}`}
              key={index}
              onClick={() => handleAddRegion(item)}
            >
              {item.split(" ")[1]}
            </button>
          ))}
        </div>
      )}
      {locs.length !== 0 && (
        <div className="flex flex-wrap gap-2 bg-[#E8EBEF] p-4 rounded-xl text-xs ">
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
