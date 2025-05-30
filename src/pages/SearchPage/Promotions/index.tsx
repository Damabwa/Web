import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPromotionList } from "../../../api/promotion";
import icn_noList from "../../../assets/svgs/icn_no_promotion.svg";
import FilterBar from "../../../components/FilterBar";
import PromotionBox from "../../../components/PromotionBox";
import ListNotFound from "../../../components/ListNotFound";

interface Props {
  data: any[];
  searchKeyword: string;
}
export default function Promotions({ data, searchKeyword }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [promotionList, setPromotionList] = useState<any[]>(data);

  useEffect(() => {
    getPromotionListFunc();
  }, [searchParams]);

  const getPromotionListFunc = async () => {
    const params = searchParams.toString();
    try {
      const res = await getPromotionList(
        `${params}&searchKeyword=${searchKeyword}`
      );
      setPromotionList(res.items);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b-[0.375rem] border-gray50">
        <FilterBar isEvent={true} setSearchParams={setSearchParams} />
      </div>
      {promotionList.length > 0 ? (
        <div className="flex flex-col gap-1 bg-gray50">
          {promotionList.map((item) => (
            <div key={item.id} className="bg-white">
              <PromotionBox data={item} />
            </div>
          ))}
          <div className="w-full h-20 bg-white" />
        </div>
      ) : (
        <div className="flex items-center flex-1 pb-40">
          <ListNotFound
            icon={icn_noList}
            title="앗! 조건에 맞는 이벤트가 없어요."
            content="곧 더 다양한 이벤트 소식을 준비해올게요!"
          />
        </div>
      )}
    </div>
  );
}
