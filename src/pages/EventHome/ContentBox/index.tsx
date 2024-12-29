import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_clipOff from "../../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../../assets/svgs/icn_clipOn.svg";
import icn_time from "../../../assets/svgs/icn_time.svg";
import icn_location from "../../../assets/svgs/icn_location.svg";

interface postData {
  id: number;
  images: string[];
  title: string;
  name: string;
  tags: string[];
  endDate: string;
  location: string[];
  clipCount: number;
}

interface Props {
  data: postData;
}

export default function ContentBox({ data }: Props) {
  const navigation = useNavigate();
  const [isClipped, setIsClipped] = useState(false);
  const clipCount = data.clipCount > 99 ? "99+" : data.clipCount;

  const getDDay = () => {
    return "이벤트 마감까지 D-3";
    //수정 필요
  };

  return (
    <div
      className="flex flex-col pl-4 pt-5 pb-6 cursor-pointer"
      onClick={() => navigation(`/event/${data.id}`)}
    >
      <div className="flex justify-between items-start pr-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold mb-1">{data.title}</span>
          <div className="flex items-center gap-[0.38rem] text-sm text-black02">
            <span>{data.name}</span>
            <span>|</span>
            {data.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          <span className="w-6 text-end text-xs text-black03">{clipCount}</span>
          <img
            alt="clip"
            src={isClipped ? icn_clipOn : icn_clipOff}
            onClick={() => setIsClipped(!isClipped)}
          />
        </div>
      </div>
      <div className="flex w-full gap-3 pr-4 overflow-x-auto py-3">
        {data.images.map((image, index) => (
          <div key={index} className="gap-[0.62rem]">
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-lightgray">
              <img src={image} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 text-xs text-black03">
        <div className="flex gap-1 items-center">
          <img src={icn_time} />
          <span>{getDDay()}</span>
        </div>
        <div className="flex gap-1 items-center">
          <img src={icn_location} />
          {data.location.map((loc, index) => (
            <div key={index} className="gap-[0.62rem]">
              <span>{loc}</span>
              {index + 1 !== data.location.length && <span>, </span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
