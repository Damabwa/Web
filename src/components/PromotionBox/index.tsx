import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePromotion, deleteSavedPromotion } from "../../api/promotion";
import { useLoginGuard } from "../../hooks/useLoginGuard";
import { getDDayText } from "../../utils/date";
import { Region } from "../../types/common";
import { isMobileDevice } from "../../utils/device";
import icn_clipOff from "../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../assets/svgs/icn_clipOn.svg";
import icn_time from "../../assets/svgs/icn_event_home_clock.svg";
import icn_location from "../../assets/svgs/icn_event_home_location.svg";
import icn_camera from "../../assets/svgs/icn_camera.svg";
import ModalCheck from "../ModalCheck";

interface postData {
  id: number;
  images: any[];
  title: string;
  author: any;
  hashtags: string[];
  endedAt: string;
  activeRegions: Region[];
  saveCount: number;
  isSaved: boolean;
}

interface Props {
  data: postData;
}

export default function PromotionBox({ data }: Props) {
  const navigate = useNavigate();
  const [isClipped, setIsClipped] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const { showLoginModal, setShowLoginModal, requireLogin, loginModalProps } =
    useLoginGuard();

  useEffect(() => {
    setIsClipped(data.isSaved);
    setSaveCount(data.saveCount);
  }, [data.isSaved, data.saveCount]);

  const dDayText = useMemo(() => getDDayText(data.endedAt), [data.endedAt]);

  const savePromotionFunc = useCallback(
    async (clipped: boolean) => {
      try {
        setIsClipped(!clipped);
        setSaveCount((prev) => (clipped ? prev - 1 : prev + 1));
        clipped
          ? await deleteSavedPromotion(data.id)
          : await savePromotion(data.id);
      } catch (e) {
        setIsClipped(clipped);
        setSaveCount((prev) => (clipped ? prev + 1 : prev - 1));
        setShowLoginModal(true);
        console.log(e);
      }
    },
    [data.id, setShowLoginModal],
  );

  const onClickSave = useCallback(() => {
    requireLogin(() => savePromotionFunc(isClipped));
  }, [requireLogin, savePromotionFunc, isClipped]);

  const openDetailPage = useCallback(() => {
    isMobileDevice()
      ? navigate(`/event/${data.id}`)
      : window.open(`/event/${data.id}`);
  }, [data.id, navigate]);

  return (
    <div className="flex flex-col py-5 cursor-pointer">
      <div className="flex items-start justify-between px-4">
        <div className="flex flex-col flex-1" onClick={openDetailPage}>
          <span className="mb-1 text-lg font-semibold">{data.title}</span>
          <div className="flex items-center gap-[0.38rem] text-sm text-black02">
            {data.author && !data.author.isAdmin && (
              <>
                <span>{data.author.nickname}</span>
                <span>|</span>
              </>
            )}
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
            onClick={onClickSave}
          />
        </div>
      </div>
      <div
        className="flex w-full gap-3 py-3 pl-4 pr-4 overflow-x-auto "
        onClick={openDetailPage}
      >
        {data.images.map((image, index) => (
          <div key={index} className="gap-[0.62rem]">
            <div className="w-[7.5rem] h-[7.5rem]  rounded-lg bg-gray50 overflow-hidden">
              <img
                className="object-cover min-w-full min-h-full"
                src={image.url}
                alt="이벤트 이미지"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = icn_camera;
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex flex-col gap-1 pl-4 text-xs text-black03 "
        onClick={openDetailPage}
      >
        <div className="flex items-center gap-1">
          <img src={icn_time} alt="" />
          <span>{dDayText}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={icn_location} alt="" />
          {data.activeRegions.map((region: any, index) => (
            <div key={index} className="gap-[0.62rem]">
              <span>{`${region.category} ${region.name}`}</span>
              {index + 1 !== data.activeRegions.length && <span>, </span>}
            </div>
          ))}
        </div>
      </div>
      {showLoginModal && <ModalCheck {...loginModalProps} />}
    </div>
  );
}
