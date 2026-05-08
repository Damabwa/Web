import { Dispatch, useState } from "react";
import icn_check from "../../../assets/svgs/icn_filterCheck.svg";
import icn_reset from "../../../assets/svgs/icn_reset.svg";
import Types from "../Types";
import RegionCluster from "../RegionCluster";
import { FilterAction, FilterState } from "..";

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
  state: FilterState;
  dispatch: Dispatch<FilterAction>;
  title: string;
  onClose: () => void;
}

export default function FilterType({ state, dispatch, title, onClose }: Props) {
  const { filters, isModifiedOrder, isModifiedState, selectedLocs } = state;

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    filters.photographyTypes || []
  );

  const handleChildClick = (item: string) => {
    if (title === "정렬") {
      dispatch({ type: "SET_FILTER", key: "sortType", value: item });
      dispatch({ type: "SET_MODIFIED", key: "isModifiedOrder", value: true });
    } else if (title === "진행 상태") {
      dispatch({ type: "SET_FILTER", key: "progressStatus", value: item });
      dispatch({ type: "SET_MODIFIED", key: "isModifiedState", value: true });
    }
    onClose();
  };

  const getChild = () => {
    if (title === "정렬") return orderBtns;
    return stateBtns;
  };

  const handleResetBtn = () => {
    if (title === "지역") dispatch({ type: "SET_SELECTED_LOCS", value: [] });
    else if (title === "촬영 종류") setSelectedTypes([]);
  };

  const handleSave = () => {
    if (title === "지역") {
      const regions = getRegionName();
      dispatch({ type: "SET_FILTER", key: "regions", value: regions });
      dispatch({ type: "SET_MODIFIED", key: "isModifiedRegion", value: selectedLocs.length > 0 });
    } else if (title === "촬영 종류") {
      dispatch({ type: "SET_FILTER", key: "photographyTypes", value: selectedTypes });
      dispatch({ type: "SET_MODIFIED", key: "isModifiedTypes", value: selectedTypes.length > 0 });
    }
    onClose();
  };

  const getRegionName = () => {
    const arr: string[] = [];
    for (const region of selectedLocs) {
      const category = region.split(" ")[0];
      const value = region.split(" ")[1];
      if (value === "전체") arr.push(category);
      else
        value.split("/").forEach((e) => {
          arr.push(`${category} ${e}`);
        });
    }
    return arr;
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
          setLocs={(value) => dispatch({ type: "SET_SELECTED_LOCS", value })}
          maxNum={10000}
        />
      )}
      {title === "촬영 종류" && (
        <Types types={selectedTypes} setTypes={setSelectedTypes} />
      )}
      {(title === "지역" || title === "촬영 종류") && (
        <div className="flex gap-2 pt-4 text-sm">
          <button
            className="flex items-center justify-center h-12 gap-1 px-6 bg-gray50 rounded-xl"
            onClick={handleResetBtn}
          >
            <img src={icn_reset} alt="재설정" />
            재설정
          </button>
          <button
            className="flex-1 h-12 text-center text-white rounded-xl bg-violet300"
            onClick={handleSave}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
}
