import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPhotographerList } from "../../../api/photographer";
import icn_noList from "../../../assets/svgs/icn_no_photogrpher.svg";
import FilterBar from "../../../components/FilterBar";
import PhotographerBox from "../../../components/PhotographerBox";
import ListNotFound from "../../../components/ListNotFound";

interface Props {
  data: any[];
  searchKeyword: string;
}
export default function Photographers({ data, searchKeyword }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [photographerList, setPhotographerList] = useState<any[]>(data);

  useEffect(() => {
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
    <div className="flex flex-col min-h-dvh">
      <div className="border-b-[0.375rem] border-gray50">
        <FilterBar isEvent={false} setSearchParams={setSearchParams} />
      </div>
      {photographerList.length > 0 ? (
        <div className="relative grid grid-cols-2 gap-5 m-4">
          {photographerList.map((item: any) => (
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
