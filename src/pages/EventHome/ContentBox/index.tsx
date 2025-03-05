import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_clipOff from "../../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../../assets/svgs/icn_clipOn.svg";
import icn_time from "../../../assets/svgs/icn_event_home_clock.svg";
import icn_location from "../../../assets/svgs/icn_event_home_location.svg";

interface postData {
  id: number;
  images: any[];
  title: string;
  author: any;
  hashtags: string[];
  endedAt: string;
  activeRegions: string[];
  saveCount: number;
}

interface Props {
  data: postData;
}

export default function ContentBox({ data }: Props) {
  const navigation = useNavigate();
  const [isClipped, setIsClipped] = useState(false);
  const clipCount = data.saveCount > 99 ? "99+" : data.saveCount;

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

  return (
    <div
      className="flex flex-col py-5 pl-4 cursor-pointer"
      onClick={() => navigation(`/event/${data.id}`)}
    >
      <div className="flex items-start justify-between pr-4">
        <div className="flex flex-col">
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
          <span className="w-6 text-xs text-end text-black03">{clipCount}</span>
          <img
            alt="clip"
            src={isClipped ? icn_clipOn : icn_clipOff}
            onClick={() => setIsClipped(!isClipped)}
          />
        </div>
      </div>
      <div className="flex w-full gap-3 py-3 pr-4 overflow-x-auto">
        {data.images.map((image, index) => (
          <div key={index} className="gap-[0.62rem]">
            <div className="w-[7.5rem] h-[7.5rem]  rounded-lg bg-lightgray">
              <img className="object-cover w-full h-full" src={image.url} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 text-xs text-black03">
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
    </div>
  );
}
