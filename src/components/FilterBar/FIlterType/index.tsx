import { useState } from "react";
import icn_check from "../../../assets/svgs/icn_filterCheck.svg";
import icn_reset from "../../../assets/svgs/icn_reset.svg";

interface Props {
  title: string;
  child: any[];
  order: string;
  state: string;
  locations: string[];
  types: string[];
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setLocations: React.Dispatch<React.SetStateAction<string[]>>;
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setShowSelectBar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifiedState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterType({
  title,
  child,
  order,
  setOrder,
  setIsModifiedOrder,
  state,
  setState,
  setIsModifiedState,
  locations,
  setLocations,
  types,
  setTypes,
  setShowSelectBar,
}: Props) {
  const [selectedLocs, setSelectedLocs] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleChildClick = (item: string) => {
    if (title === "정렬") {
      setOrder(item);
      setIsModifiedOrder(true);
      setShowSelectBar(false);
    } else if (title === "진행 상태") {
      setState(item);
      setIsModifiedState(true);
      setShowSelectBar(false);
    } else if (title === "지역")
      if (selectedLocs.includes(item))
        setSelectedLocs(selectedLocs.filter((l) => l !== item));
      else setSelectedLocs([...selectedLocs, item]);
    else if (title === "촬영 종류")
      if (selectedTypes.includes(item))
        setTypes(selectedTypes.filter((l) => l !== item));
      else setSelectedTypes([...selectedTypes, item]);
  };

  const handleResetBtn = () => {
    if (title === "지역") setSelectedLocs([]);
    else if (title === "촬영 종류") setSelectedTypes([]);
  };

  const handleSave = () => {
    if (title === "지역") setLocations(selectedLocs);
    else if (title === "촬영 종류") setTypes(selectedTypes);
    setShowSelectBar(false);
  };

  return (
    <div className={`flex flex-col bg-white px-4 pt-3 pb-10 rounded-t-3xl`}>
      <div className="p-[0.62rem] font-semibold text-center">{title}</div>
      {(title === "정렬" || title === "진행 상태") &&
        child.map((item) => (
          <div
            key={item.id}
            onClick={() => handleChildClick(item.name)}
            className="cursor-pointer flex justify-between w-full border-t border-gray100 py-4 font-medium"
          >
            <span>{item.name}</span>
            {(item.name === order || item.name === state) && (
              <img className="px-2" alt="✓" src={icn_check} />
            )}
          </div>
        ))}
      {(title === "지역" || title === "촬영 종류") && (
        <div>
          <div
            className={`grid grid-cols-5 w-full border-t border-gray100 pb-4 ${title === "촬영 종류" ? "pt-4" : "pt-2"}`}
          >
            {child.map((item) => (
              <div
                key={item}
                className="flex justify-center"
                onClick={() => handleChildClick(item)}
              >
                <div
                  className={`flex items-center justify-center cursor-pointer w-16 h-9 rounded-3xl border text-sm font-medium ${selectedLocs.includes(item) || selectedTypes.includes(item) ? "" : "border-white"}`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 text-sm">
            <button
              className="flex items-center justify-center gap-1 bg-lightgray px-6 h-12 rounded-xl"
              onClick={() => handleResetBtn()}
            >
              <img src={icn_reset} />
              재설정
            </button>
            <button
              className="h-12 rounded-xl bg-violet300 text-white text-center flex-1"
              onClick={() => handleSave()}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
