import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePromotion, deleteSavedPromotion } from "../../api/promotion";
import icn_clipOff from "../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../assets/svgs/icn_clipOn.svg";
import icn_time from "../../assets/svgs/icn_event_home_clock.svg";
import icn_location from "../../assets/svgs/icn_event_home_location.svg";
import ModalCheck from "../ModalCheck";

interface postData {
  id: number;
  images: any[];
  title: string;
  author: any;
  hashtags: string[];
  endedAt: string;
  activeRegions: string[];
  saveCount: number;
  isSaved: boolean;
}

interface Props {
  data: postData;
}

export default function PromotionBox({ data }: Props) {
  const navigation = useNavigate();
  const [isClipped, setIsClipped] = useState<boolean>(data.isSaved);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [saveCount, setSaveCount] = useState(data.saveCount);

  const getDDay = () => {
    const now = new Date();
    const koreaTimeOffset = 9 * 60 * 60 * 1000;
    const today = new Date(now.getTime() + koreaTimeOffset);

    const targetDate = new Date(data.endedAt);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "마감된 이벤트";
    } else if (diffDays === 0) {
      return "오늘 마감되는 이벤트";
    } else {
      return `이벤트 마감까지 D-${diffDays}`;
    }
  };

  const onClickSave = () => {
    if (!localStorage.getItem("accessToken")) {
      setShowLoginModal(true);
      return;
    } else savePromotionFunc(isClipped);
  };

  const savePromotionFunc = async (isClipped: boolean) => {
    try {
      setIsClipped(!isClipped);
      setSaveCount(isClipped ? saveCount - 1 : saveCount + 1);
      isClipped
        ? await deleteSavedPromotion(data.id)
        : await savePromotion(data.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col py-5 cursor-pointer">
      <div className="flex items-start justify-between px-4">
        <div
          className="flex flex-col"
          onClick={() => navigation(`/event/${data.id}`)}
        >
          <span className="mb-1 text-lg font-semibold">{data.title}</span>
          <div className="flex items-center gap-[0.38rem] text-sm text-black02">
            <span>{data.author.nickname}</span>
            <span>|</span>
            {data.hashtags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          <span className="w-6 text-xs text-end text-black03">
            {saveCount > 99 ? "99+" : saveCount}
          </span>
          <img
            alt="clip"
            src={isClipped ? icn_clipOn : icn_clipOff}
            onClick={() => onClickSave()}
          />
        </div>
      </div>
      <div
        className="flex w-full gap-3 py-3 pl-4 pr-4 overflow-x-auto "
        onClick={() => navigation(`/event/${data.id}`)}
      >
        {data.images.map((image, index) => (
          <div key={index} className="gap-[0.62rem]">
            <div className="w-[7.5rem] h-[7.5rem]  rounded-lg bg-gray50 overflow-hidden">
              <img
                className="object-cover min-w-full min-h-full"
                src={image.url}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex flex-col gap-1 pl-4 text-xs text-black03 "
        onClick={() => navigation(`/event/${data.id}`)}
      >
        <div className="flex items-center gap-1">
          <img src={icn_time} />
          <span>{getDDay()}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={icn_location} />
          {data.activeRegions.map((region: any, index) => (
            <div key={index} className="gap-[0.62rem]">
              <span>{`${region.category} ${region.name}`}</span>
              {index + 1 !== data.activeRegions.length && <span>, </span>}
            </div>
          ))}
        </div>
      </div>
      {showLoginModal && (
        <ModalCheck
          title="로그인이 필요한 서비스입니다."
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
