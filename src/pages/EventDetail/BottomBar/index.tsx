import { useState } from "react";
import { savePromotion, deleteSavedPromotion } from "../../../api/promotion";
import icn_clip_off from "../../../assets/svgs/icn_clip.svg";
import icn_clip_on from "../../../assets/svgs/icn_clipOn.svg";

interface Props {
  id: number;
  url: string;
  saveCount: number;
  isSaved: boolean;
}

export default function BottomBar({ id, url, saveCount, isSaved }: Props) {
  const [count, setCount] = useState(saveCount);
  const [isSavedPromotion, setIsSavedPromotion] = useState(isSaved);

  const handleSave = () => {
    isSavedPromotion ? deleteSavedPromotionFunc() : savePromotionFunc();
  };

  const savePromotionFunc = async () => {
    setCount(count + 1);
    setIsSavedPromotion(true);
    try {
      await savePromotion(id);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteSavedPromotionFunc = async () => {
    setCount(count - 1);
    setIsSavedPromotion(false);
    try {
      await deleteSavedPromotion(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed bottom-0 z-20 flex items-center w-full max-w-[430px] gap-2 pt-2 px-4 pb-8 bg-white">
      <div
        className={`${isSavedPromotion ? "bg-violet100" : "bg-gray50"} cursor-pointer flex flex-col items-center justify-center w-12 h-12 rounded-md text-black03 text-[0.625rem] font-medium`}
        onClick={() => handleSave()}
      >
        <img
          className="w-5 ml-[-0.725px]"
          src={isSavedPromotion ? icn_clip_on : icn_clip_off}
        />
        <div className="w-5 text-center">{count}</div>
      </div>
      <div
        className="flex-1 cursor-pointer rounded-[0.63rem] bg-violet300 justify-center text-white h-12 flex items-center font-semibold"
        onClick={() => window.open(url)}
      >
        신청하러 가기
      </div>
    </div>
  );
}
