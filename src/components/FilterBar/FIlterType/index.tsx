import { useState } from "react";
import icn_check from "../../../assets/svgs/icn_filterCheck.svg";
import icn_reset from "../../../assets/svgs/icn_reset.svg";
import Types from "../Types";
import RegionCluster from "../RegionCluster";

const orderBtns = [
  { id: "LATEST", full: "최신순" },
  { id: "POPULAR", full: "인기순" },
];
const stateBtns = [
  { id: "ALL", full: "전체" },
  { id: "UPCOMING", full: "예정된 이벤트" },
  { id: "ONGOING", full: "진행 중인 이벤트" },
  { id: "ENDED", full: "마감된 이벤트" },
];

interface Props {
  filters: any;
  title: string;
  isModifiedOrder: boolean;
  isModifiedState: boolean;
  setIsModifiedOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedState: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedRegion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedTypes: React.Dispatch<React.SetStateAction<boolean>>;
  handleFilterChange: (arg1: string, arg2: any) => void;
  setShowSelectBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterType({
  filters,
  title,
  isModifiedOrder,
  isModifiedState,
  setIsModifiedOrder,
  setIsModifiedRegion,
  setIsModifiedTypes,
  setIsModifiedState,
  setShowSelectBar,
  handleFilterChange,
}: Props) {
  const [selectedLocs, setSelectedLocs] = useState<string[]>(
    filters.regions || []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    filters.photographerType || []
  );

  const handleChildClick = (item: string) => {
    if (title === "정렬") {
      handleFilterChange("sortType", item);
      setIsModifiedOrder(true);
    } else if (title === "진행 상태") {
      handleFilterChange("progressStatus", item);
      setIsModifiedState(true);
    }
    setShowSelectBar(false);
  };

  const getChild = () => {
    if (title === "정렬") return orderBtns;
    else return stateBtns;
  };

  const handleResetBtn = () => {
    if (title === "지역") setSelectedLocs([]);
    else if (title === "촬영 종류") setSelectedTypes([]);
  };

  const handleSave = () => {
    if (title === "지역") {
      handleFilterChange("regions", selectedLocs);
      setIsModifiedRegion(selectedLocs.length > 0);
    } else if (title === "촬영 종류") {
      handleFilterChange("photographerType", selectedTypes);
      setIsModifiedTypes(selectedTypes.length > 0);
    }
    setShowSelectBar(false);
  };

  return (
    <div className={`flex flex-col bg-white px-4 pt-3 pb-8 rounded-t-3xl`}>
      <div className="p-[0.62rem] font-semibold text-center border-b border-gray100">
        {title}
      </div>
      {(title === "정렬" || title === "진행 상태") &&
        getChild().map((item) => (
          <div
            key={item.id}
            onClick={() => handleChildClick(item.id)}
            className="flex justify-between w-full py-4 font-medium cursor-pointer"
          >
            <span>{item.full}</span>
            {((item.id === filters.sortType && isModifiedOrder) ||
              (item.id === filters.progressStatus && isModifiedState)) && (
              <img className="px-2" alt="✓" src={icn_check} />
            )}
          </div>
        ))}
      {title === "지역" && (
        <RegionCluster
          locs={selectedLocs}
          setLocs={setSelectedLocs}
          maxNum={10000}
        />
      )}
      {title === "촬영 종류" && (
        <Types types={selectedTypes} setTypes={setSelectedTypes} />
      )}
      {(title === "지역" || title === "촬영 종류") && (
        <div className="flex gap-2 pt-4 text-sm">
          <button
            className="flex items-center justify-center h-12 gap-1 px-6 bg-lightgray rounded-xl"
            onClick={() => handleResetBtn()}
          >
            <img src={icn_reset} />
            재설정
          </button>
          <button
            className="flex-1 h-12 text-center text-white rounded-xl bg-violet300"
            onClick={() => handleSave()}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}
