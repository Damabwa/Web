import { useState } from "react";
import icn_check from "../../../assets/svgs/icn_filterCheck.svg";
import icn_reset from "../../../assets/svgs/icn_reset.svg";
import Types from "../Types";
import RegionCluster from "../RegionCluster";

const orderBtns = [
  { id: "latest", name: "최신순", full: "최신순" },
  { id: "popularity", name: "인기순", full: "인기순" },
];
const stateBtns = [
  { id: "all", name: "전체", full: "전체" },
  { id: "scheduled", name: "예정", full: "예정된 이벤트" },
  { id: "ongoing", name: "진행중", full: "진행 중인 이벤트" },
  { id: "end", name: "마감", full: "마감된 이벤트" },
];

interface Props {
  title: string;
  order: string;
  state: string;
  locs: string[];
  types: string[];
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setLocs: React.Dispatch<React.SetStateAction<string[]>>;
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setShowSelectBar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterType({
  title,
  order,
  setOrder,
  setIsModifiedOrder,
  state,
  setState,
  setIsModifiedState,
  locs,
  setLocs,
  types,
  setTypes,
  setShowSelectBar,
}: Props) {
  const [selectedLocs, setSelectedLocs] = useState<string[]>(locs);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(types);

  const handleChildClick = (item: string) => {
    if (title === "정렬") {
      setOrder(item);
      setIsModifiedOrder(true);
      setShowSelectBar(false);
    } else if (title === "진행 상태") {
      setState(item);
      setIsModifiedState(true);
      setShowSelectBar(false);
    }
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
    if (title === "지역") setLocs(selectedLocs);
    else if (title === "촬영 종류") setTypes(selectedTypes);
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
            onClick={() => handleChildClick(item.name)}
            className="flex justify-between w-full py-4 font-medium cursor-pointer"
          >
            <span>{item.full}</span>
            {(item.name === order || item.name === state) && (
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
