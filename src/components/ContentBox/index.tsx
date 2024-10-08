import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_clip from "../../assets/svgs/icn_clip.svg";
import icn_time from "../../assets/svgs/icn_time.svg";
import icn_location from "../../assets/svgs/icn_location.svg";

interface postData {
  images: string[];
  title: string;
  name: string;
  tags: string[];
  period: string;
  location: string;
  clipCount: number;
}

interface Props {
  data: postData;
}

export default function ContentBox({ data }: Props) {
  const navigation = useNavigate();
  const [isClipped, setIsClipped] = useState(false);
  const clipCount = data.clipCount > 99 ? "99+" : data.clipCount;

  return (
    <div className="flex flex-col gap-2 py-4 cursor-pointer">
      <div className="flex justify-between px-4 ">
        <div className="flex flex-col font-pre">
          <span className="text-xl font-bold">{data.title}</span>
          <div className="flex items-center gap-1">
            <span className="text-xs">{data.name}</span>|
            {data.tags.map((tag, index) => (
              <span key={index} className="text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[0.12rem] cursor-pointer">
          <img
            alt="clip"
            src={icn_clip}
            onClick={() => setIsClipped(!isClipped)}
          />
          <span className="w-6 text-xs">{clipCount}</span>
        </div>
      </div>
      <div className="flex w-full gap-3 px-4 overflow-x-auto">
        {data.images.map((image) => (
          <div className="gap-2">
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-gray" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 pl-4 text-[0.625rem]">
        <div className="flex gap-[0.12rem]">
          <img alt="" src={icn_time} />
          <span>{data.period}</span>
        </div>
        <div className="flex gap-[0.12rem]">
          <img alt="" src={icn_location} />
          <span>{data.location}</span>
        </div>
      </div>
    </div>
  );
}
