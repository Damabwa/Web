import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPromotionDetail } from "../../api/promotion";
import ImageBox from "./ImageBox";
import TopInfo from "./TopInfo";
import BottomInfo from "./BottomInfo";
import BottomBar from "./BottomBar";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = Number(id);
  const invalidId = !id || isNaN(numericId);

  useEffect(() => {
    if (invalidId) navigate("/");
  }, [invalidId, navigate]);

  const { data: promotionData } = useQuery({
    queryKey: ["promotion", numericId],
    queryFn: () => getPromotionDetail(numericId),
    enabled: !invalidId,
  });

  if (!promotionData) return <></>;
  return (
    <div className="w-full">
      <ImageBox
        images={promotionData.images}
        promotionType={promotionData.promotionType}
      />
      <div className="flex flex-col w-full bg-gray50">
        <TopInfo promotionData={promotionData} />
        <BottomInfo promotionData={promotionData} />
        <BottomBar
          id={promotionData.id}
          url={promotionData.externalLink}
          saveCount={promotionData.saveCount}
          isSaved={promotionData.isSaved}
        />
      </div>
    </div>
  );
}
