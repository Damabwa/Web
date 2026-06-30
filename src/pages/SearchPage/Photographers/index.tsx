import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPhotographerList } from "../../../api/photographer";
import icn_noList from "../../../assets/svgs/icn_no_photogrpher.svg";
import FilterBar from "../../../components/FilterBar";
import PhotographerBox from "../../../components/PhotographerBox";
import ListNotFound from "../../../components/ListNotFound";
import { PhotographerListItem } from "../../../types/photographer";

interface Props {
  data: PhotographerListItem[];
  searchKeyword: string;
}
export default function Photographers({ data, searchKeyword }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  // data를 초기값으로만 사용. 이 컴포넌트는 탭 전환 시 매번 언마운트/재마운트되므로
  // (SearchPage의 조건부 렌더) 재진입마다 최신 data로 다시 초기화된다.
  const [photographerList, setPhotographerList] =
    useState<PhotographerListItem[]>(data);

  // 부모(SearchPage)가 키워드로 이미 조회해 data로 넘기므로 첫 렌더의 중복 조회는 건너뛴다.
  // 이후 필터(searchParams)나 키워드가 실제로 바뀔 때만 재조회한다.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!searchKeyword) return;
    const fetchPhotographerList = async () => {
      const p = new URLSearchParams(searchParams);
      p.set("searchKeyword", searchKeyword);
      try {
        const res = await getPhotographerList(p);
        setPhotographerList(res.items);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPhotographerList();
  }, [searchParams, searchKeyword]);
  return (
    <div className="flex flex-col min-h-dvh-safe">
      <div className="border-b-[0.375rem] border-gray50">
        <FilterBar isEvent={false} setSearchParams={setSearchParams} />
      </div>
      {photographerList.length > 0 ? (
        <div className="relative grid grid-cols-2 gap-5 m-4">
          {photographerList.map((item) => (
            <PhotographerBox key={item.id} data={item} />
          ))}
          <div className="w-full h-20 bg-white" />
        </div>
      ) : (
        <div className="flex items-center flex-1 pb-40">
          <ListNotFound
            icon={icn_noList}
            title="앗! 조건에 맞는 작가님이 없어요."
            content="곧 더 다양한 작가님들을 모셔올게요!"
          />
        </div>
      )}
    </div>
  );
}
