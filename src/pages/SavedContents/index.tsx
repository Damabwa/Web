import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSavedPromotionList } from "../../api/promotion";
import { getSavedPhotographerList } from "../../api/photographer";
import { PromotionListItem } from "../../types/promotion";
import { PhotographerListItem } from "../../types/photographer";
import SubHeader from "../../components/SubHeader";
import PromotionBox from "../../components/PromotionBox";
import PhotographerBox from "../../components/PhotographerBox";
import Loading from "../../components/Loading";

export default function SavedContents() {
  const { type } = useParams();
  const isPromotion = type === "promotion";

  // 저장목록을 라이브로 조회(캐시 공유 + 해제 시 invalidate로 즉시 갱신).
  const promotionsQuery = useQuery({
    queryKey: ["savedPromotions"],
    queryFn: () => getSavedPromotionList().then((res) => res.items),
    enabled: isPromotion,
  });
  const photographersQuery = useQuery({
    queryKey: ["savedPhotographers"],
    queryFn: () => getSavedPhotographerList().then((res) => res.items),
    enabled: !isPromotion,
  });

  const promotions: PromotionListItem[] = promotionsQuery.data ?? [];
  const photographers: PhotographerListItem[] = photographersQuery.data ?? [];
  const activeQuery = isPromotion ? promotionsQuery : photographersQuery;
  const isEmpty = isPromotion
    ? promotions.length === 0
    : photographers.length === 0;

  // 콜드 진입 시 조회 대기 동안 빈 화면이 깜빡이지 않도록 로딩 표시
  if (activeQuery.isLoading) return <Loading isLoading={true} />;
  if (isEmpty) return <></>;
  return (
    <div className="relative w-full ">
      <div className="h-12 px-4">
        <SubHeader
          title={`저장한 ${isPromotion ? "이벤트" : "작가님"}`}
        />
      </div>
      {isPromotion ? (
        <div className="flex flex-col gap-1 pt-2 bg-gray50">
          {promotions.map((item) => (
            <div key={item.id} className="bg-white">
              <PromotionBox data={item} />
            </div>
          ))}
          <div className="w-full h-20 bg-white" />
        </div>
      ) : (
        <div className="flex flex-col border-t-8 border-t-gray50">
          <div className="relative grid grid-cols-2 gap-5 m-4">
            {photographers.map((item) => (
              <PhotographerBox key={item.id} data={item} />
            ))}
            <div className="w-full h-20 bg-white" />
          </div>
        </div>
      )}
    </div>
  );
}
