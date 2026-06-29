import { useCallback, useEffect, useRef, useState } from "react";
import { SetURLSearchParams, useSearchParams } from "react-router-dom";
import icn_reset from "../../assets/svgs/icn_reset.svg";
import icn_line from "../../assets/svgs/icn_filterLine.svg";
import FilterType from "./FilterType";
import BtnOnOff from "./BtnOnOff";
import BtnChip from "./BtnChip";

interface Props {
  isEvent: boolean;
  setSearchParams: SetURLSearchParams;
}

// URL에 콤마 조인 형태로 직렬화되는 배열형 필터 키 (역직렬화 시 split 필요)
const ARRAY_FILTER_KEYS = ["regions", "photographyTypes"];

export default function FilterBar({ isEvent, setSearchParams }: Props) {
  // 쓰기는 부모가 넘긴 setSearchParams를 그대로 쓰고, 읽기(초기 복원)는 내부에서 한다.
  // 같은 라우터 상태를 가리키므로 일관적이다.
  const [searchParams] = useSearchParams();

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

  // 마운트 시 URL의 쿼리를 디폴트 위에 덮어 복원한다.
  // (공유 링크/새로고침/뒤로가기 복귀 시 적용돼 있던 필터를 유지)
  // regions/photographyTypes는 배열 필터라 콤마 조인되어 직렬화되므로 split해 배열로 되돌린다.
  const [filters, setFilters] = useState<any>(() => {
    const init: any = getDefaultFilters();
    searchParams.forEach((value, key) => {
      init[key] = ARRAY_FILTER_KEYS.includes(key) ? value.split(",") : value;
    });
    return init;
  });

  const [selectedLocs, setSelectedLocs] = useState<string[]>([]);

  // 직전에 URL로 반영한 쿼리 문자열. 동일하면 재반영(=재조회)을 건너뛴다.
  // 초기값을 현재 URL로 잡아, 복원된 필터를 마운트 직후 불필요하게 다시 쓰지 않는다.
  const lastParamsRef = useRef<string | null>(null);
  if (lastParamsRef.current === null) {
    lastParamsRef.current = searchParams.toString();
  }

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

    // 결과값이 바뀌지 않는 조작(같은 옵션 재선택 등)에서 불필요한 URL 갱신·재조회를 막는다.
    const next = newSearchParams.toString();
    if (lastParamsRef.current === next) return;
    lastParamsRef.current = next;

    // 필터/정렬은 '화면 내 상태' 변경이므로 히스토리에 쌓지 않고 현재 항목을 교체한다.
    // (URL은 갱신돼 공유/새로고침 시 필터가 유지되지만, 뒤로가기는 목록을 한 번에 벗어남)
    setSearchParams(newSearchParams, { replace: true });
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
        <div className="fixed bottom-0 z-40 flex items-end h-dvh-safe w-full max-w-[430px]">
          <div
            className="absolute top-0 w-full h-dvh-safe bg-black bg-opacity-40"
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
