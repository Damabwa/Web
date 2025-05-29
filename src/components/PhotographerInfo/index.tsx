import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteSavedPhotographer,
  savePhotographer,
} from "../../api/photographer";
import { getPhotoType } from "../../hooks/getKorean";
import icn_clip_off from "../../assets/svgs/icn_clip.svg";
import icn_clip_on from "../../assets/svgs/icn_clipOn.svg";
import icn_web from "../../assets/svgs/icn_web.svg";
import icn_loc from "../../assets/svgs/icn_location.svg";
import icn_insta from "../../assets/svgs/icn_instagram.svg";
import ModalCheck from "../ModalCheck";

interface Props {
  isMypage: boolean;
  userInfo: any;
}

export default function PhotographerInfo({ isMypage, userInfo }: Props) {
  const navigation = useNavigate();

  const [count, setCount] = useState(0);
  const [isSavedPhotographer, setIsSavedPhotographer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSave = () => {
    if (!localStorage.getItem("accessToken")) {
      setShowLoginModal(true);
      return;
    } else savePromotionFunc();
  };

  const savePromotionFunc = async () => {
    setCount(isSavedPhotographer ? count - 1 : count + 1);
    setIsSavedPhotographer(!isSavedPhotographer);
    try {
      isSavedPhotographer
        ? deleteSavedPhotographer(userInfo.id)
        : await savePhotographer(userInfo.id);
    } catch (e) {
      setShowLoginModal(true);
      console.log(e);
    }
  };

  return (
    <div className="relative w-full bg-white border-b-8 border-gray50 pt-[4.25rem] px-4 pb-5">
      <div className="absolute top-[-3rem] left-0 flex items-end justify-between w-full px-4">
        <img
          className="w-[6.5rem] h-[6.5rem] object-cover border-2 rounded-xl border-lineRegular bg-white"
          src={userInfo.profileImage.url}
        />
        {!isMypage && (
          <div
            className="cursor-pointer flex flex-col items-center justify-center w-12 h-12 rounded-md bg-gray50 text-black03 text-[0.625rem] font-medium"
            onClick={() => handleSave()}
          >
            <img
              className="w-5 ml-[-0.725px]"
              src={isSavedPhotographer ? icn_clip_on : icn_clip_off}
            />
            <div className="w-5 text-center">{count}</div>
          </div>
        )}
      </div>
      <div
        className={`flex items-end gap-2 pb-3 ${userInfo.nickname.length > 10 && "flex-col items-start"}`}
      >
        <div
          className={`text-xl font-bold ${userInfo.nickname.length > 10 && "w-full"}`}
        >
          {userInfo.nickname}
        </div>
        <div
          className={`text-sm font-medium text-black04 pb-[0.12rem] flex flex-row gap-1 ${userInfo.nickname.length > 10 && "w-full"}`}
        >
          {userInfo.mainPhotographyTypes.map((type: string, index: number) => (
            <div key={index}>
              {getPhotoType(type)}
              {userInfo.mainPhotographyTypes.length > index + 1 && <>,</>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 pb-1 -ml-1 text-sm font-medium text-black02">
        <div className="flex items-center gap-1">
          <img className="w-6" src={icn_loc} />
          <div className="flex w-full gap-1">
            {userInfo.activeRegions.map((loc: any, index: number) => (
              <div className="flex gap-1" key={index}>
                <p>{loc.category}</p>
                <p>
                  {loc.name}
                  {userInfo.activeRegions.length > index + 1 && <>,</>}
                </p>
              </div>
            ))}
          </div>
        </div>
        {userInfo.instagramId && (
          <div className="flex items-center gap-1">
            <img className="p-[0.35rem]" src={icn_insta} />
            <div
              className="cursor-pointer text-[#0068C3]"
              onClick={() =>
                window.open(`https://www.instagram.com/${userInfo.instagramId}`)
              }
            >
              {userInfo.instagramId}
            </div>
          </div>
        )}
        {userInfo.contactLink && (
          <div className="flex items-center gap-1">
            <img className="" src={icn_web} />
            <div
              className="cursor-pointer text-[#0068C3]"
              onClick={() => window.open(`${userInfo.contactLink}`)}
            >
              {userInfo.contactLink}
            </div>
          </div>
        )}
      </div>
      {isMypage && (
        <div className="flex items-center w-full gap-2 mt-4">
          <button
            className="flex-1 h-10 text-sm font-medium text-white rounded-md outline-none bg-violet300"
            onClick={() =>
              navigation(`/edit/photographer`, {
                state: userInfo,
                replace: true,
              })
            }
          >
            프로필 수정
          </button>
          <button
            className="flex-1 h-10 text-sm font-medium text-white rounded-md outline-none bg-violet300"
            onClick={() =>
              navigation(`/edit/photographer/detail`, {
                state: userInfo,
                replace: true,
              })
            }
          >
            작가 페이지 수정
          </button>
        </div>
      )}
      <div className="-mx-4">
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
    </div>
  );
}
