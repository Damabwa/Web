import { useEffect, useReducer, useState } from "react";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";
import FilterType from "./FilterType";
import BtnOnOff from "./BtnOnOff";
import BtnChip from "./BtnChip";

interface Props {
  isEvent: boolean;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}

export interface FilterState {
  filters: {
    sortType: string;
    progressStatus?: string;
    regions?: string[];
    photographyTypes?: string[];
    type?: string;
  };
  isModifiedOrder: boolean;
  isModifiedState: boolean;
  isModifiedRegion: boolean;
  isModifiedTypes: boolean;
  selectedLocs: string[];
}

export type FilterAction =
  | { type: "SET_FILTER"; key: keyof FilterState["filters"]; value: string | string[] }
  | { type: "SET_MODIFIED"; key: keyof Pick<FilterState, "isModifiedOrder" | "isModifiedState" | "isModifiedRegion" | "isModifiedTypes">; value: boolean }
  | { type: "SET_SELECTED_LOCS"; value: string[] }
  | { type: "RESET"; isEvent: boolean };

function getDefaultFilters(isEvent: boolean): FilterState["filters"] {
  return isEvent
    ? { progressStatus: "ALL", sortType: "LATEST" }
    : { sortType: "LATEST" };
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      };
    case "SET_MODIFIED":
      return { ...state, [action.key]: action.value };
    case "SET_SELECTED_LOCS":
      return { ...state, selectedLocs: action.value };
    case "RESET":
      return {
        filters: getDefaultFilters(action.isEvent),
        isModifiedOrder: false,
        isModifiedState: false,
        isModifiedRegion: false,
        isModifiedTypes: false,
        selectedLocs: [],
      };
    default:
      return state;
  }
}

export default function FilterBar({ isEvent, setSearchParams }: Props) {
  const [filterState, dispatch] = useReducer(filterReducer, {
    filters: getDefaultFilters(isEvent),
    isModifiedOrder: false,
    isModifiedState: false,
    isModifiedRegion: false,
    isModifiedTypes: false,
    selectedLocs: [],
  });

  const [showSelectBar, setShowSelectBar] = useState(false);
  const [clickedFilter, setClickedFilter] = useState("");

  const { filters, isModifiedOrder, isModifiedState, isModifiedRegion, isModifiedTypes } = filterState;

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (!value || value === "ALL" || (Array.isArray(value) && value.length === 0))
        newSearchParams.delete(key);
      else newSearchParams.set(key, String(value));
    });

    window.history.pushState({}, "", "/");
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const handleFilter = (type: string) => {
    setShowSelectBar(true);
    setClickedFilter(type);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 min-w-full h-[3.75rem] p-3 text-sm font-medium whitespace-nowrap overflow-x-scroll">
        <button
          className="flex items-center justify-center mr-1 outline-none min-w-9 h-9 bg-gray100 rounded-3xl"
          onClick={() => dispatch({ type: "RESET", isEvent })}
        >
          <img className="p-[0.37rem]" src={icn_reset} alt="필터 초기화" />
        </button>
        {isEvent && (
          <div className="flex gap-2">
            <BtnOnOff
              isOn={filters.type === "FREE"}
              setOn={() => dispatch({ type: "SET_FILTER", key: "type", value: "FREE" })}
              setOff={() => dispatch({ type: "SET_FILTER", key: "type", value: "" })}
              title="무료"
            />
            <BtnOnOff
              isOn={filters.type === "DISCOUNT"}
              setOn={() => dispatch({ type: "SET_FILTER", key: "type", value: "DISCOUNT" })}
              setOff={() => dispatch({ type: "SET_FILTER", key: "type", value: "" })}
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
            title={filters.progressStatus ?? ""}
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
              state={filterState}
              dispatch={dispatch}
              title={clickedFilter}
              onClose={() => setShowSelectBar(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
