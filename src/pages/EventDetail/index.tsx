import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPromotionDetail } from "../../api/promotion";
import ImageBox from "./ImageBox";
import TopInfo from "./TopInfo";
import BottomInfo from "./BottomInfo";
import BottomBar from "./BottomBar";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotionData, setPromotionData] = useState<any>();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate("/");
      return;
    }
    const fetchPromotion = async () => {
      try {
        const res = await getPromotionDetail(Number(id));
        setPromotionData(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPromotion();
  }, [id, navigate]);

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
