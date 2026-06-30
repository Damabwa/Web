import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSavedPromotion, deleteSavedPromotion } from "../../../api/promotion";
import { useLoginGuard } from "../../../hooks/useLoginGuard";
import icn_clip_off from "../../../assets/svgs/icn_clip.svg";
import icn_clip_on from "../../../assets/svgs/icn_clipOn.svg";
import ModalCheck from "../../../components/ModalCheck";

interface Props {
  id: number;
  url: string;
  saveCount: number;
  isSaved: boolean;
}

export default function BottomBar({ id, url, saveCount, isSaved }: Props) {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(saveCount);
  const [isSavedPromotion, setIsSavedPromotion] = useState(isSaved);
  const { showLoginModal, setShowLoginModal, requireLogin, loginModalProps } =
    useLoginGuard();

  const handleSave = () => {
    requireLogin(() => toggleSavePromotion());
  };

  const toggleSavePromotion = async () => {
    const prevCount = count;
    const prevIsSaved = isSavedPromotion;
    setCount(isSavedPromotion ? count - 1 : count + 1);
    setIsSavedPromotion(!isSavedPromotion);
    try {
      isSavedPromotion
        ? await deleteSavedPromotion(id)
        : await createSavedPromotion(id);
      // 저장 변경을 목록/상세 캐시에 반영
      queryClient.invalidateQueries({ queryKey: ["promotions"] });
      queryClient.invalidateQueries({ queryKey: ["promotion", id] });
    } catch (e) {
      setCount(prevCount);
      setIsSavedPromotion(prevIsSaved);
      setShowLoginModal(true);
      console.log(e);
    }
  };

  return (
    <div className="fixed bottom-0 z-20 flex items-center w-full max-w-[430px] gap-2 pt-2 pb-8 bg-white">
      <div
        className={`${isSavedPromotion ? "bg-violet100" : "bg-gray50"} ml-4 cursor-pointer flex flex-col items-center justify-center w-12 h-12 rounded-md text-black03 text-[0.625rem] font-medium`}
        onClick={() => handleSave()}
      >
        <img
          className="w-5 ml-[-0.725px]"
          src={isSavedPromotion ? icn_clip_on : icn_clip_off}
          alt="저장"
        />
        <div className="w-5 text-center">{count}</div>
      </div>
      <div
        className="flex-1 cursor-pointer rounded-[0.63rem] bg-violet300 justify-center text-white h-12 mr-4 flex items-center font-semibold"
        onClick={() => window.open(url)}
      >
        신청하러 가기
      </div>
      {showLoginModal && <ModalCheck {...loginModalProps} />}
    </div>
  );
}
