import { useEffect, useState } from "react";
import axios from "axios";
import icn_down from "../../../assets/svgs/icn_down.svg";
import icn_down_purple from "../../../assets/svgs/icn_down_purple.svg";
import icn_reset from "../../../assets/svgs/icn_reset.svg";
import FilterType from "./FIlterType";

export default function FilterBar() {
  const orderBtns = [
    { id: "latest", name: "최신순", full: "최신순" },
    { id: "popularity", name: "인기순", full: "인기순" },
  ];
  const typeBtns = ["스냅", "프로필", "컨셉", "증명", "셀프"];
  const [order, setOrder] = useState("최신순");
  const [isModifiedOrder, setIsModifiedOrder] = useState(false);
  const [locList, setLocList] = useState([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [showSelectBar, setShowSelectBar] = useState(false);
  const [clickedFilter, setClickedFilter] = useState("");

  useEffect(() => {
    getLocationList();
  }, []);

  const getLocationList = async () => {
    axios
      .get(`https://api-dev.damaba.me/api/v1/regions/categories`)
      .then((res) => setLocList(res.data.categories));
  };

  const getBtnList = () => {
    if (clickedFilter === "정렬") return orderBtns;
    else if (clickedFilter === "지역") return locList;
    else if (clickedFilter === "촬영 종류") return typeBtns;
    else return [];
  };

  const handleResetFIlter = () => {
    setOrder("최신순");
    setIsModifiedOrder(false);
    setLocations([]);
    setTypes([]);
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
        <button
          className={`min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.88rem] py-[0.38rem] bg-gray100 rounded-3xl border ${isModifiedOrder ? "border-violet400 bg-violet400 bg-opacity-15 text-violet400" : "border-gray100"}`}
          onClick={() => handleFilter("정렬")}
        >
          {order}
          <img alt="▽" src={isModifiedOrder ? icn_down_purple : icn_down} />
        </button>

        <button
          className={`min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.9rem] py-[0.4rem] bg-gray100 rounded-3xl border ${locations.length > 0 ? "border-violet400 bg-violet400 bg-opacity-15 text-violet400" : "border-gray100"}`}
          onClick={() => handleFilter("지역")}
        >
          지역
          <img
            alt="▽"
            src={locations.length > 0 ? icn_down_purple : icn_down}
          />
        </button>
        <button
          className={`min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.9rem] py-[0.4rem] bg-gray100 rounded-3xl border ${types.length > 0 ? "border-violet400 bg-violet400 bg-opacity-15 text-violet400" : "border-gray100"}`}
          onClick={() => handleFilter("촬영 종류")}
        >
          촬영 종류
          <img alt="▽" src={types.length > 0 ? icn_down_purple : icn_down} />
        </button>
      </div>
      {showSelectBar && (
        <div className="fixed bottom-0 flex items-end h-full w-full max-w-[430px]">
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
              order={order}
              setOrder={setOrder}
              setIsModifiedOrder={setIsModifiedOrder}
              setLocations={setLocations}
              setTypes={setTypes}
              setShowSelectBar={setShowSelectBar}
            />
          </div>
        </div>
      )}
    </div>
  );
}
