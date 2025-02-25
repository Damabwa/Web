import { useState } from "react";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";
import FilterType from "./FIlterType";
import BtnOnOff from "./BtnOnOff";
import BtnChip from "./BtnChip";

interface Props {
  isEvent: boolean;
}

export default function FilterBar({ isEvent }: Props) {
  const [free, setFree] = useState(false);
  const [discount, setDiscount] = useState(false);

  const [order, setOrder] = useState("최신순");
  const [state, setState] = useState("진행중");
  const [isModifiedOrder, setIsModifiedOrder] = useState(false);
  const [isModifiedState, setIsModifiedState] = useState(false);

  const [locs, setLocs] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [showSelectBar, setShowSelectBar] = useState(false);
  const [clickedFilter, setClickedFilter] = useState("");

  const handleResetFIlter = () => {
    setFree(false);
    setDiscount(false);
    setOrder("최신순");
    setState("진행중");
    setIsModifiedOrder(false);
    setIsModifiedState(false);
    setLocs([]);
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
          activation={locs.length > 0}
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
              order={order}
              setOrder={setOrder}
              setIsModifiedOrder={setIsModifiedOrder}
              state={state}
              setState={setState}
              setIsModifiedState={setIsModifiedState}
              locs={locs}
              setLocs={setLocs}
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
