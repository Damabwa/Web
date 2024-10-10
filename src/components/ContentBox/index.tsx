import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back.svg";
import icn_next from "../../assets/svgs/icn_next.svg";
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
  const scrollRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  const [isPC, setIsPC] = useState(true);
  const [isNext, setIsNext] = useState(true);
  const [isClipped, setIsClipped] = useState(false);
  const clipCount = data.clipCount > 99 ? "99+" : data.clipCount;

  const handleResize = () => {
    setIsPC(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (isPC && scrollRef.current) {
      scrollRef.current.scrollBy(
        isNext
          ? { left: 300, behavior: "smooth" }
          : { left: -300, behavior: "smooth" }
      );
    }
    setIsNext(!isNext);
  };

  return (
    <div className="relative flex flex-col gap-2 py-4 cursor-pointer">
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
      <div className="flex w-full gap-3 px-4 overflow-x-auto" ref={scrollRef}>
        {data.images.map((image) => (
          <div className="gap-2">
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-gray" />
          </div>
        ))}
      </div>
      {isPC && (
        <div
          className={`flex top-12 mt-6 absolute items-center h-32 w-12 from-[rgba(255,255,255,0)] to-[rgba(255,255,255,1)] ${isNext ? "bg-gradient-to-r justify-end right-0 " : "bg-gradient-to-l justify-start left-0"}`}
        >
          <img
            className={`${isNext ? "pr-2" : "pl-2"} cursor-pointer`}
            alt=""
            src={isNext ? icn_next : icn_back}
            onClick={() => handleNext()}
          />
        </div>
      )}
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
