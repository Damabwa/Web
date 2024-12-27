import { useState } from "react";
import FilterType from "./FIlterType";
import icn_down from "../../assets/svgs/icn_down.svg";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";

export default function FilterBar() {
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
  const [order, setOrder] = useState("최신순");
  const [state, setState] = useState("진행중");
  const [free, setFree] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [showSelectBar, setShowSelectBar] = useState(false);
  const [clickedFilter, setClickedFilter] = useState("");

  const handleSelectType = (name: string) => {
    if (clickedFilter === "정렬") setOrder(name);
    else if (clickedFilter === "진행 상태") setState(name);
    setShowSelectBar(false);
  };

  const getBtnList = () => {
    if (clickedFilter === "정렬") return orderBtns;
    else if (clickedFilter === "진행 상태") return stateBtns;
    else return stateBtns;
  };

  const handleResetFIlter = () => {};

  const handleFilter = (type: string) => {
    setShowSelectBar(true);
    setClickedFilter(type);
  };

  return (
    <div className="w-full ">
      <div className="flex items-center gap-2 min-w-full h-[3.75rem] p-3 text-sm font-medium whitespace-nowrap overflow-x-scroll">
        <button
          className="outline-none flex items-center justify-center min-w-9 h-9 mr-1 bg-gray100 rounded-3xl"
          onClick={() => handleResetFIlter()}
        >
          <img className="p-[0.37rem]" src={icn_reset} />
        </button>
        <button
          className={`min-w-fit outline-none flex items-center justify-center h-9 px-[0.88rem] py-[0.38rem] rounded-3xl border ${free ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-gray100 border-gray100"}`}
          onClick={() => setFree(!free)}
        >
          무료
        </button>
        <button
          className={`min-w-fit outline-none flex items-center justify-center h-9 px-[0.88rem] py-[0.38rem] rounded-3xl border ${discount ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-gray100 border-gray100"}`}
          onClick={() => setDiscount(!discount)}
        >
          할인
        </button>
        <img src={icn_line} />
        <button
          className="min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.88rem] py-[0.38rem] bg-gray100 rounded-3xl"
          onClick={() => handleFilter("정렬")}
        >
          {order}
          <img alt="▽" src={icn_down} />
        </button>
        <button
          className="min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.9rem] py-[0.4rem] bg-gray100 rounded-3xl"
          onClick={() => handleFilter("진행 상태")}
        >
          {state}
          <img alt="▽" src={icn_down} />
        </button>
        <button
          className="min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.9rem] py-[0.4rem] bg-gray100 rounded-3xl"
          onClick={() => handleFilter("지역")}
        >
          지역
          <img alt="▽" src={icn_down} />
        </button>
        <button
          className="min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.9rem] py-[0.4rem] bg-gray100 rounded-3xl"
          onClick={() => handleFilter("촬영 종류")}
        >
          촬영 종류
          <img alt="▽" src={icn_down} />
        </button>
      </div>
      {showSelectBar && (
        <div className="fixed bottom-0 flex items-end h-full w-full max-w-[426px]">
          <div
            className="absolute z-20 w-full h-full bg-black bg-opacity-40"
            onClick={() => setShowSelectBar(false)}
          />
          <div
            className={`z-30 w-full ${showSelectBar ? "animate-slideUp" : "hidden"}`}
          >
            <FilterType
              title={clickedFilter}
              child={getBtnList()}
              handleSelectType={handleSelectType}
              order={order}
              state={state}
            />
          </div>
        </div>
      )}
    </div>
  );
}
