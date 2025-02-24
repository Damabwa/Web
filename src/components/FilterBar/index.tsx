import { useEffect, useState } from "react";
import axios from "axios";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";
import FilterType from "./FIlterType";
import BtnOnOff from "./BtnOnOff";
import BtnChip from "./BtnChip";

interface Props {
  isEvent: boolean;
}

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
const typeBtns = ["스냅", "프로필", "컨셉", "증명", "셀프"];

export default function FilterBar({ isEvent }: Props) {
  const [free, setFree] = useState(false);
  const [discount, setDiscount] = useState(false);

  const [order, setOrder] = useState("최신순");
  const [state, setState] = useState("진행중");
  const [isModifiedOrder, setIsModifiedOrder] = useState(false);
  const [isModifiedState, setIsModifiedState] = useState(false);

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
    else if (clickedFilter === "진행 상태") return stateBtns;
    else if (clickedFilter === "지역") return locList;
    else if (clickedFilter === "촬영 종류") return typeBtns;
    else return [];
  };

  const handleResetFIlter = () => {
    setFree(false);
    setDiscount(false);
    setOrder("최신순");
    setState("진행중");
    setIsModifiedOrder(false);
    setIsModifiedState(false);
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
        {isEvent && (
          <div className="flex gap-2">
            <BtnOnOff isOn={free} setIsOn={setFree} title="무료" />
            <BtnOnOff isOn={discount} setIsOn={setDiscount} title="할인" />
            <img src={icn_line} />
          </div>
        )}
        <BtnChip
          activation={isModifiedOrder}
          onClick={handleFilter}
          setFilterName="정렬"
          title={order}
        />
        {isEvent && (
          <BtnChip
            activation={isModifiedState}
            onClick={handleFilter}
            setFilterName="진행 상태"
            title={state}
          />
        )}
        <BtnChip
          activation={locations.length > 0}
          onClick={handleFilter}
          setFilterName="지역"
          title="지역"
        />
        <BtnChip
          activation={types.length > 0}
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
              title={clickedFilter}
              child={getBtnList()}
              order={order}
              setOrder={setOrder}
              setIsModifiedOrder={setIsModifiedOrder}
              state={state}
              setState={setState}
              setIsModifiedState={setIsModifiedState}
              locs={locations}
              setLocs={setLocations}
              types={types}
              setTypes={setTypes}
              setShowSelectBar={setShowSelectBar}
            />
          </div>
        </div>
      )}
    </div>
  );
}
