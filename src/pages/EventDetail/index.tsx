import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import icn_back from "../../assets/svgs/icn_back.svg";
import icn_next from "../../assets/svgs/icn_next.svg";
import icn_back_w from "../../assets/svgs/icn_back_white.svg";
import icn_clip from "../../assets/svgs/icn_clip_white.svg";
import icn_time from "../../assets/svgs/icn_time.svg";
import icn_loc from "../../assets/svgs/icn_location.svg";
import icn_insta from "../../assets/svgs/icn_instagram.svg";

export default function EventDetail() {
  const mockdata = {
    id: 0,
    event_name: "이벤트 이름",
    name: "사진 업체 상호",
    clip_count: 100,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0gWBNWbbcHj95yiemGhcE4c9lkjvJxoLQg&s",
      "https://image.dongascience.com/Photo/2019/12/15751948028007.jpg",
      "https://i.pinimg.com/236x/b5/35/90/b53590a25445742b56c2bffb68987e11.jpg",
    ],
    tags: ["서울", "개인", "올림픽공원"],
    time: "00.00.00 - 00.00.00",
    location: ["수원시", "화성시"],
    address: "경기도 수원시 영통구 월드컵로 206",
    content:
      "콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다.",
    insta_id: "instagramid",
    insta_url: "https://www.instagram.com/",
  };

  const navigation = useNavigate();

  const scrollRef = useRef<HTMLInputElement>(null);
  const [isPC, setIsPC] = useState(true);
  const [current, setCurrent] = useState(0);

  const handleResize = () => {
    setIsPC(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBack = () => {
    if (isPC && scrollRef.current) {
      scrollRef.current.scrollBy({ left: -384, behavior: "smooth" });
    }
    setCurrent(current - 1);
  };

  const handleNext = () => {
    if (isPC && scrollRef.current) {
      scrollRef.current.scrollBy({ left: 384, behavior: "smooth" });
    }
    setCurrent(current + 1);
  };

  return (
    <div className="text-sm ">
      <div className="h-12">
        <Header
          title={mockdata.event_name}
          left={
            <img
              className="cursor-pointer"
              alt="<"
              src={icn_back_w}
              onClick={() => {
                navigation(-1);
              }}
            />
          }
          right={
            <div className="flex flex-col items-center text-[0.65rem] text-white">
              {mockdata.clip_count > 99 ? "99+" : mockdata.clip_count}
              <img
                className="w-[1.125rem] cursor-pointer mt-[-0.25rem]"
                alt="clip"
                src={icn_clip}
              />
            </div>
          }
        />
      </div>
      <div className="relative">
        <div className="flex w-full overflow-auto bg-gray h-96" ref={scrollRef}>
          {mockdata.images.map((image) => (
            <img
              key={image}
              className="object-cover min-w-96 min-h-96"
              alt="event_image"
              src={image}
            />
          ))}
        </div>
        {mockdata.images.length > 1 && (
          <div className="absolute z-10 flex justify-center w-full bottom-4">
            <div className="flex gap-2">
              {mockdata.images.map((item, index) => (
                <div
                  className={`w-2 h-2 rounded-xl bg-black ${index !== current && "opacity-50"}`}
                />
              ))}
            </div>
          </div>
        )}
        {isPC && (
          <div>
            {current + 1 < mockdata.images.length && (
              <div className="flex top-0 absolute items-center h-96 w-12 from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.5)] bg-gradient-to-r justify-end right-0">
                <img
                  className="pr-2 cursor-pointer"
                  alt=">"
                  src={icn_next}
                  onClick={() => handleNext()}
                />
              </div>
            )}
            {current !== 0 && (
              <div className="flex top-0 absolute items-center h-96 w-12 from-[rgba(255,255,255,0)] to-[rgba(255,255,255,0.5)] bg-gradient-to-l justify-start left-0">
                <img
                  className="pl-2 cursor-pointer"
                  alt="<"
                  src={icn_back}
                  onClick={() => handleBack()}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full gap-1 bg-gray">
        <div className="flex flex-col w-full gap-1 p-4 bg-white">
          <div className="text-xl font-semibold">{mockdata.event_name}</div>
          <div>{mockdata.name}</div>
          <div className="flex gap-1">
            {mockdata.tags.map((tag) => (
              <div className="px-2 py-1 select-none bg-violet100 rounded-xl">
                #{tag}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-1 p-4 bg-white">
          <div className="flex gap-1">
            <img className="w-4" alt="" src={icn_time} />
            {mockdata.time}
          </div>
          <div className="flex gap-1">
            <img className="w-4" alt="" src={icn_loc} />
            {mockdata.location.map((item, index) => (
              <div key={index}>
                {item}
                {mockdata.location.length > 1 &&
                  index + 1 !== mockdata.location.length &&
                  ", "}
              </div>
            ))}
          </div>
          <div className="ml-[1.25rem] flex justify-between">
            {mockdata.address}
            <div
              className="px-2 border cursor-pointer rounded-xl"
              onClick={() =>
                navigator.clipboard.writeText(mockdata.address).then(() => {
                  alert("복사되었습니다.");
                })
              }
            >
              복사
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 bg-white">
          <div className="mb-4">{mockdata.content}</div>
          <div className="flex gap-1 mb-1">
            <img className="w-4" alt="" src={icn_insta} />
            <div>@{mockdata.insta_id}</div>
          </div>
          <div className="mb-12 ml-5 cursor-pointer">{mockdata.insta_url}</div>
          <div className="flex justify-center mb-8">
            <button className="px-12 py-1 text-lg text-white rounded-md bg-violet600">
              신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
