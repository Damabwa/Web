import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPromotionDetail } from "../../api/promotion";
import icn_clip from "../../assets/svgs/icn_clip.svg";
import ImageBox from "./ImageBox";
import TopInfo from "./TopInfo";
import BottomInfo from "./BottomInfo";

export default function EventDetail() {
  const navigation = useNavigate();
  const { id } = useParams();
  const [promotionData, setPromotionData] = useState<any>();

  useEffect(() => {
    getPromotionFunc();
  }, []);

  const getPromotionFunc = async () => {
    try {
      const res = await getPromotionDetail(Number(id));
      setPromotionData(res);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(promotionData);

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
        <div className="fixed bottom-0 z-20 flex items-center w-full max-w-[430px] gap-2 pt-2 px-4 pb-8 bg-white">
          <div className="cursor-pointer flex flex-col items-center justify-center w-12 h-12 rounded-md bg-gray50 text-black03 text-[0.625rem] font-medium">
            <img className="w-5 ml-[-0.725px]" src={icn_clip} />
            <div className="w-5 text-center">0</div>
          </div>
          <div
            className="flex-1 cursor-pointer rounded-[0.63rem] bg-violet300 justify-center text-white h-12 flex items-center font-semibold"
            onClick={() => navigation(promotionData.externalLink)}
          >
            신청하러 가기
          </div>
        </div>
      </div>
    </div>
  );
}
