import { useEffect, useState } from "react";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";
import FilterType from "./FIlterType";
import BtnOnOff from "./BtnOnOff";
import BtnChip from "./BtnChip";

interface Props {
  isEvent: boolean;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}

export default function FilterBar({ isEvent, setSearchParams }: Props) {
  const [isModifiedOrder, setIsModifiedOrder] = useState(false);
  const [isModifiedState, setIsModifiedState] = useState(false);
  const [isModifiedRegion, setIsModifiedRegion] = useState(false);
  const [isModifiedTypes, setIsModifiedTypes] = useState(false);

  const [showSelectBar, setShowSelectBar] = useState(false);
  const [clickedFilter, setClickedFilter] = useState("");

  const [filters, setFilters] = useState<any>(
    isEvent
      ? {
          progressStatus: "ONGOING",
          sortType: "LATEST",
        }
      : {
          sortType: "LATEST",
        }
  );

  const [selectedLocs, setSelectedLocs] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prevFilters: any) => ({ ...prevFilters, [key]: value }));
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]: any) => {
      if (!value || value == "ALL" || value.length == 0)
        newSearchParams.delete(key);
      else newSearchParams.set(key, value);
    });

    window.history.pushState({}, "", "/");
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const handleResetFIlter = () => {
    setIsModifiedOrder(false);
    setIsModifiedState(false);
    setIsModifiedRegion(false);
    setIsModifiedTypes(false);
    setFilters({
      progressStatus: "ONGOING",
      sortType: "LATEST",
    });
  };

  const handleFilter = (type: string) => {
    setShowSelectBar(true);
    setClickedFilter(type);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 min-w-full h-[3.75rem] p-3 text-sm font-medium whitespace-nowrap overflow-x-scroll">
        <button
          className="flex items-center justify-center mr-1 outline-none min-w-9 h-9 bg-gray100 rounded-3xl"
          onClick={() => handleResetFIlter()}
        >
          <img className="p-[0.37rem]" src={icn_reset} />
        </button>
        {isEvent && (
          <div className="flex gap-2">
            <BtnOnOff
              isOn={filters.type === "FREE"}
              setOn={() => handleFilterChange("type", "FREE")}
              setOff={() => handleFilterChange("type", "")}
              title="무료"
            />
            <BtnOnOff
              isOn={filters.type === "DISCOUNT"}
              setOn={() => handleFilterChange("type", "DISCOUNT")}
              setOff={() => handleFilterChange("type", "")}
              title="할인"
            />
            <img src={icn_line} />
          </div>
        )}
        <BtnChip
          activation={isModifiedOrder}
          onClick={handleFilter}
          setFilterName="정렬"
          title={filters.sortType}
        />
        {isEvent && (
          <BtnChip
            activation={isModifiedState}
            onClick={handleFilter}
            setFilterName="진행 상태"
            title={filters.progressStatus}
          />
        )}
        <BtnChip
          activation={isModifiedRegion}
          onClick={handleFilter}
          setFilterName="지역"
          title="지역"
        />
        <BtnChip
          activation={isModifiedTypes}
          onClick={handleFilter}
          setFilterName="촬영 종류"
          title="촬영 종류"
        />
      </div>
      {showSelectBar && (
        <div className="fixed bottom-0 z-40 flex items-end h-screen w-full max-w-[430px]">
          <div
            className="absolute top-0 w-full h-screen bg-black bg-opacity-40"
            onClick={() => setShowSelectBar(false)}
          />
          <div
            className={`w-full ${showSelectBar ? "animate-slideUp" : "hidden"}`}
          >
            <FilterType
              filters={filters}
              title={clickedFilter}
              selectedLocs={selectedLocs}
              setSelectedLocs={setSelectedLocs}
              isModifiedOrder={isModifiedOrder}
              isModifiedState={isModifiedState}
              setIsModifiedOrder={setIsModifiedOrder}
              setIsModifiedState={setIsModifiedState}
              setIsModifiedRegion={setIsModifiedRegion}
              setIsModifiedTypes={setIsModifiedTypes}
              handleFilterChange={handleFilterChange}
              setShowSelectBar={setShowSelectBar}
            />
          </div>
        </div>
      )}
    </div>
  );
}
