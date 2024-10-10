import { useState } from "react";
import FilterType from "./FIlterType";
import icn_down from "../../assets/svgs/icn_down.svg";
import FilterItem from "./FilterItem";

export default function FilterBar() {
  const orderBtns = [
    { id: "latest", name: "최신순", full: "최신순" },
    { id: "popularity", name: "저장순", full: "저장 많은 순" },
  ];
  const stateBtns = [
    { id: "all", name: "전체", full: "전체" },
    { id: "in_progress", name: "진행중", full: "진행 중인 이벤트" },
    { id: "ended", name: "마감", full: "마감된 이벤트" },
  ];
  const [order, setOrder] = useState("최신순");
  const [state, setState] = useState("진행중");
  const [free, setFree] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [showSelectBar, setShowSelectBar] = useState(false);
  const [clickedFilter, setClickedFilter] = useState("");

  const handleSelectType = (name: string) => {
    clickedFilter === "order" ? setOrder(name) : setState(name);
    setShowSelectBar(false);
  };

  const getBtnList = () => {
    return clickedFilter === "order" ? orderBtns : stateBtns;
  };

  const handleFilter = (type: string) => {
    setShowSelectBar(true);
    setClickedFilter(type);
  };

  return (
    <div className="flex items-center justify-around h-16 p-4 text-sm font-medium select-none">
      <div
        className="px-[0.9rem] py-[0.4rem] cursor-pointer bg-gray rounded-3xl"
        onClick={() => handleFilter("all")}
      >
        F
      </div>
      <div
        className="flex gap-1 px-[0.9rem] py-[0.4rem] cursor-pointer bg-gray rounded-3xl"
        onClick={() => handleFilter("order")}
      >
        {order}
        <img alt="▽" src={icn_down} />
      </div>
      <div
        className="flex gap-1 px-[0.9rem] py-[0.4rem] cursor-pointer bg-gray rounded-3xl"
        onClick={() => handleFilter("state")}
      >
        {state}
        <img alt="▽" src={icn_down} />
      </div>
      <div className="w-[0.06rem] h-6 bg-gray mx-1" />
      <div
        className={`px-[0.9rem] py-[0.4rem] cursor-pointer rounded-3xl ${free ? "bg-black text-white" : "bg-gray"}`}
        onClick={() => setFree(!free)}
      >
        무료
      </div>
      <div
        className={`px-[0.9rem] py-[0.4rem] cursor-pointer rounded-3xl ${discount ? "bg-black text-white" : "bg-gray"}`}
        onClick={() => setDiscount(!discount)}
      >
        할인
      </div>
      {showSelectBar && (
        <div className="fixed bottom-0 flex items-end h-full w-96">
          <div
            className="absolute z-10 w-full h-full bg-[rgba(0,0,0,0.4)]"
            onClick={() => setShowSelectBar(false)}
          ></div>
          <div
            className={`z-20 w-full ${showSelectBar ? "animate-slideUp" : "hidden"}`}
          >
            {clickedFilter === "all" ? (
              <FilterItem />
            ) : (
              <FilterType
                title={clickedFilter === "order" ? "정렬" : "이벤트 상태"}
                child={getBtnList()}
                handleSelectType={handleSelectType}
                order={order}
                state={state}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
