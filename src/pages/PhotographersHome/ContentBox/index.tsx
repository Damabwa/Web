import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_clipOff from "../../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../../assets/svgs/icn_clipOn.svg";
import { savePhotographer } from "../../../api/photographer";

interface postData {
  id: number;
  profileImage: { name: string; url: string };
  nickname: string;
  mainPhotographyTypes: string[];
}

interface Props {
  data: postData;
}

export default function ContentBox({ data }: Props) {
  const [isClipped, setIsClipped] = useState(false);
  const navigation = useNavigate();

  const handleTextLength = () => {
    if (data.nickname.length < 8) return data.nickname;
    return `${data.nickname.slice(0, 8)}...`;
  };

  const onClickPhotographer = () => {
    navigation(`/photographer/${data.id}`);
  };

  const savePhotographerFunc = async () => {
    // try {
    //   await savePhotographer(data.id);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  if (!data) return <></>;
  return (
    <div className="relative flex flex-col justify-between w-48 h-48 text-white cursor-pointer bg-gray rounded-xl">
      <div
        className="absolute top-0 left-0 z-0"
        onClick={() => onClickPhotographer()}
      >
        <div className="relative inline-block w-48 h-48 overflow-hidden rounded-xl">
          <img
            src={data.profileImage.url}
            alt={data.profileImage.name}
            className="block object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.25)] pointer-events-none" />
        </div>
      </div>
      <div className="z-10 flex items-center justify-end p-2">
        <div className="bg-white rounded-full p-[0.375rem]">
          <img
            alt="clip"
            src={isClipped ? icn_clipOn : icn_clipOff}
            onClick={() => savePhotographerFunc()}
          />
        </div>
      </div>
      <div className="z-10 p-3" onClick={() => onClickPhotographer()}>
        <div className="font-semibold">{handleTextLength()}</div>
        <div className="flex items-center gap-1 text-xs">
          {data.mainPhotographyTypes.map((type, index) => (
            <div key={index}>
              {type}
              {index + 1 !== data.mainPhotographyTypes.length && <>,</>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
