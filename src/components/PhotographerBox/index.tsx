import { useEffect, useState } from "react";
import {
  savePhotographer,
  deleteSavedPhotographer,
} from "../../api/photographer";
import { getPhotoType } from "../../hooks/getKorean";
import { useLoginGuard } from "../../hooks/useLoginGuard";
import icn_clipOff from "../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../assets/svgs/icn_clipOn.svg";
import ModalCheck from "../ModalCheck";

interface postData {
  id: number;
  profileImage: { name: string; url: string };
  nickname: string;
  mainPhotographyTypes: string[];
  isSaved: boolean;
}

interface Props {
  data: postData;
}

export default function PhotographerBox({ data }: Props) {
  const [isClipped, setIsClipped] = useState(false);
  const { showLoginModal, setShowLoginModal, requireLogin, loginModalProps } =
    useLoginGuard();

  useEffect(() => {
    setIsClipped(data.isSaved);
  }, [data]);

  const handleTextLength = () => {
    if (data.nickname.length < 8) return data.nickname;
    return `${data.nickname.slice(0, 8)}...`;
  };

  const onClickPhotographer = () => {
    window.open(`/photographer/${data.id}`);
  };

  const onClickSave = () => {
    requireLogin(() => savePhotographerFunc(isClipped));
  };

  const savePhotographerFunc = async (isClipped: boolean) => {
    try {
      setIsClipped(!isClipped);
      isClipped
        ? await deleteSavedPhotographer(data.id)
        : await savePhotographer(data.id);
    } catch (e: any) {
      setIsClipped(false);
      setShowLoginModal(true);
      console.log(e);
    }
  };

  if (!data) return <></>;
  return (
    <div>
      <div className="relative flex flex-col justify-between w-full text-white cursor-pointer h-44 bg-gray rounded-xl">
        <div
          className="absolute top-0 left-0 z-0 w-full h-full"
          onClick={() => onClickPhotographer()}
        >
          <div className="relative inline-block w-full h-full overflow-hidden rounded-xl">
            <img
              src={data.profileImage.url}
              alt={data.profileImage.name}
              className="block object-cover min-w-full min-h-full"
            />
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.25)] pointer-events-none" />
          </div>
        </div>
        <div className="z-10 flex items-center justify-end p-2">
          <div className="bg-white rounded-full p-[0.375rem]">
            <img
              alt="clip"
              src={isClipped ? icn_clipOn : icn_clipOff}
              onClick={() => onClickSave()}
            />
          </div>
        </div>
        <div className="z-10 p-3" onClick={() => onClickPhotographer()}>
          <div className="font-semibold">{handleTextLength()}</div>
          <div className="flex items-center gap-1 text-xs">
            {data.mainPhotographyTypes.map((type, index) => (
              <div key={index}>
                {getPhotoType(type)}
                {index + 1 !== data.mainPhotographyTypes.length && <>,</>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <div className="absolute -left-4">
          <ModalCheck {...loginModalProps} />
        </div>
      )}
    </div>
  );
}
