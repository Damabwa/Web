import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePromotion, deleteSavedPromotion } from "../../../api/promotion";
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
  const navigation = useNavigate();
  const [count, setCount] = useState(saveCount);
  const [isSavedPromotion, setIsSavedPromotion] = useState(isSaved);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSave = () => {
    if (!localStorage.getItem("accessToken")) {
      setShowLoginModal(true);
      return;
    } else savePromotionFunc();
  };

  const savePromotionFunc = async () => {
    setCount(isSavedPromotion ? count - 1 : count + 1);
    setIsSavedPromotion(!isSavedPromotion);
    try {
      isSavedPromotion
        ? await deleteSavedPromotion(id)
        : await savePromotion(id);
    } catch (e) {
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
        />
        <div className="w-5 text-center">{count}</div>
      </div>
      <div
        className="flex-1 cursor-pointer rounded-[0.63rem] bg-violet300 justify-center text-white h-12 mr-4 flex items-center font-semibold"
        onClick={() => window.open(url)}
      >
        신청하러 가기
      </div>
      {showLoginModal && (
        <ModalCheck
          title={["로그인이 필요한 서비스입니다."]}
          content={[
            "이 기능은 로그인 후 이용하실 수 있습니다.",
            "로그인 페이지로 이동하시겠습니까?",
          ]}
          btnMsg="로그인 하기"
          align="start"
          setShowModal={setShowLoginModal}
          onClick={() => navigation(`/login`)}
        />
      )}
    </div>
  );
}
