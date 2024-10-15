import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_back from "../../../assets/svgs/icn_back.svg";
import icn_camera from "../../../assets/svgs/icn_camera.svg";
import icn_calendar from "../../../assets/svgs/icn_calendar.svg";

interface Props {
  title: string;
  subTitle: string;
}

export default function EventBox({ title, subTitle }: Props) {
  const mockdata = [
    {
      image: "",
      name: "이벤트1",
      sub: "스냅 사진",
      period: "08.29 - 08.30",
    },
    {
      image: "",
      name: "이벤트2",
      sub: "스냅 사진",
      period: "08.29 - 08.30",
    },
    {
      image: "",
      name: "이벤트3",
      sub: "스냅 사진",
      period: "08.29 - 08.30",
    },
    {
      image: "",
      name: "이벤트4",
      sub: "스냅 사진",
      period: "08.29 - 08.30",
    },
    {
      image: "",
      name: "이벤트5",
      sub: "스냅 사진",
      period: "08.29 - 08.30",
    },
  ];

  const scrollRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const [isPC, setIsPC] = useState(true);
  const [isNext, setIsNext] = useState(true);

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

  const navigateEvent = () => {
    navigation("/events");
  };

  return (
    <div className="relative flex flex-col">
      <div className="flex justify-between px-4 mb-3">
        <div className="flex flex-col font-pre" onClick={() => navigateEvent()}>
          <span className="text-lg font-bold cursor-pointer">{title}</span>
          <span className="text-sm cursor-pointer">{subTitle}</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <button
            className="text-xs font-medium"
            onClick={() => navigateEvent()}
          >
            전체보기
          </button>
          <img className="w-4 h-4" alt=">" src={icn_next} />
        </div>
      </div>
      <div
        className="flex w-full gap-3 px-4 pb-4 overflow-x-auto select-none"
        ref={scrollRef}
      >
        {mockdata.map((item) => (
          <div key={item.name} className="flex flex-col gap-2 cursor-pointer">
            {/* <img alt="image" src={}/> */}
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-gray" />
            <div className="flex flex-col font-pre text-[0.625rem] font-medium text-black02">
              <div className="mb-1 text-sm font-semibold text-black">
                {item.name}
              </div>
              <div className="flex items-center gap-1">
                <img className="w-3 h-3" alt="" src={icn_camera} />
                {item.sub}
              </div>
              <div className="flex items-center gap-1">
                <img className="w-3 h-3" alt="" src={icn_calendar} />
                {item.period}
              </div>
            </div>
          </div>
        ))}
      </div>
      {isPC && (
        <div
          className={`flex top-12 absolute items-center h-32 w-12 from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.75)] ${isNext ? "bg-gradient-to-r justify-end right-0 " : "bg-gradient-to-l justify-start left-0"}`}
        >
          <img
            className={`${isNext ? "pr-2" : "pl-2"} cursor-pointer`}
            alt=""
            src={isNext ? icn_next : icn_back}
            onClick={() => handleNext()}
          />
        </div>
      )}
    </div>
  );
}
