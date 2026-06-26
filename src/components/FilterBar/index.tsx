import { useCallback, useEffect, useState } from "react";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";
import FilterType from "./FilterType";
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

  const getDefaultFilters = useCallback(
    () =>
      isEvent
        ? {
            progressStatus: "ALL",
            sortType: "LATEST",
          }
        : {
            sortType: "LATEST",
          },
    [isEvent],
  );

  const [filters, setFilters] = useState<any>(getDefaultFilters());

  const [selectedLocs, setSelectedLocs] = useState<string[]>([]);

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prevFilters: any) => ({ ...prevFilters, [key]: value }));
  }, []);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]: any) => {
      if (!value || value === "ALL" || value.length === 0)
        newSearchParams.delete(key);
      else newSearchParams.set(key, value);
    });

    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const handleSetFree = useCallback(
    () => handleFilterChange("type", "FREE"),
    [handleFilterChange],
  );
  const handleSetDiscount = useCallback(
    () => handleFilterChange("type", "DISCOUNT"),
    [handleFilterChange],
  );
  const handleClearType = useCallback(
    () => handleFilterChange("type", ""),
    [handleFilterChange],
  );

  const handleResetFilter = useCallback(() => {
    setIsModifiedOrder(false);
    setIsModifiedState(false);
    setIsModifiedRegion(false);
    setIsModifiedTypes(false);
    setFilters(getDefaultFilters());
  }, [getDefaultFilters]);

  const handleFilter = useCallback((type: string) => {
    setShowSelectBar(true);
    setClickedFilter(type);
  }, []);

  const handleCloseSelectBar = useCallback(() => setShowSelectBar(false), []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 min-w-full h-[3.75rem] p-3 text-sm font-medium whitespace-nowrap overflow-x-scroll">
        <button
          className="flex items-center justify-center mr-1 outline-none min-w-9 h-9 bg-gray100 rounded-3xl"
          onClick={handleResetFilter}
        >
          <img className="p-[0.37rem]" src={icn_reset} alt="필터 초기화" />
        </button>
        {isEvent && (
          <div className="flex gap-2">
            <BtnOnOff
              isOn={filters.type === "FREE"}
              setOn={handleSetFree}
              setOff={handleClearType}
              title="무료"
            />
            <BtnOnOff
              isOn={filters.type === "DISCOUNT"}
              setOn={handleSetDiscount}
              setOff={handleClearType}
              title="할인"
            />
            <img src={icn_line} alt="" />
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
        <div className="fixed bottom-0 z-40 flex items-end h-dvh w-full max-w-[430px]">
          <div
            className="absolute top-0 w-full h-dvh bg-black bg-opacity-40"
            onClick={handleCloseSelectBar}
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
