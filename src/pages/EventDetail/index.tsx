import { useEffect, useRef, useState } from "react";
import icn_next from "../../assets/svgs/icn_imageNext.svg";
import icn_back from "../../assets/svgs/icn_imageBack.svg";
import icn_clip from "../../assets/svgs/icn_clip.svg";
import icn_time from "../../assets/svgs/icn_time.svg";
import icn_loc from "../../assets/svgs/icn_location.svg";
import icn_insta from "../../assets/svgs/icn_instagram.svg";

export default function EventDetail() {
  const mockdata = {
    id: 0,
    authorId: 0,
    type: "EVENT",
    eventType: "FREE",
    title: "꽃 컨셉 늦여름 촬영 이벤트",
    content:
      "콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다. 콘텐츠 내용입니다.",
    address: {
      sido: "경기",
      sigungu: "성남시 분당구",
      roadAddress: "경기 성남시 분당구 판교역로 166",
      jibunAddress: "경기 성남시 분당구 백현동 532",
    },
    externalLink: "https://promotion-instagram-post",
    startedAt: "2025-01-04",
    endedAt: "2025-01-04",
    photographerName: "담아사진",
    photographerInstagramId: "dama.photo",
    images: [
      "https://i.pinimg.com/236x/b5/35/90/b53590a25445742b56c2bffb68987e11.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0gWBNWbbcHj95yiemGhcE4c9lkjvJxoLQg&s",
      "https://image.dongascience.com/Photo/2019/12/15751948028007.jpg",
    ],
    hashtags: ["서울", "개인", "올림픽공원"],
    activeRegions: [
      {
        category: "서울",
        name: "강남구",
      },
      {
        category: "서울",
        name: "강남구",
      },
    ],
  };

  const [isPC, setIsPC] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexPC, setCurrentIndexPC] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    setIsPC(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isPC) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    const slides = container.querySelectorAll(".slide-item");
    slides.forEach((slide) => observer.observe(slide));

    return () => {
      slides.forEach((slide) => observer.unobserve(slide));
    };
  }, [isPC]);

  return (
    <div className="w-full">
      <div className="relative">
        <div
          className="overflow-x-auto overflow-y-hidden h-96 snap-x snap-mandatory"
          ref={containerRef}
        >
          <div
            className={`${isPC ? `flex transition-transform duration-500 ease-in-out translate-x-[-${currentIndexPC * 100}%]` : "flex"}`}
          >
            {mockdata.images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full slide-item snap-center"
                data-index={index}
              >
                <img src={image} className="object-cover min-w-full h-96" />
              </div>
            ))}
          </div>
        </div>
        {(mockdata.eventType === "FREE" ||
          mockdata.eventType === "DISCOUNT") && (
          <div className="absolute z-10 px-2 py-[0.38rem] text-sm font-semibold text-center text-white rounded-lg top-4 left-4 bg-violet300">
            {mockdata.eventType === "FREE" ? "무료" : "할인"} 이벤트
          </div>
        )}
        {mockdata.images.length > 1 && (
          <div className="absolute z-10 right-4 bottom-3 bg-[rgb(85,85,85)] bg-opacity-80 flex items-center h-7 px-[0.88rem] text-white rounded-2xl text-xs">
            {isPC ? currentIndexPC + 1 : currentIndex + 1}/
            {mockdata.images.length}
          </div>
        )}
        {isPC && (
          <div className="absolute top-0 z-10 flex items-center w-full h-96">
            <div className="relative w-full">
              {currentIndexPC > 0 && (
                <img
                  className="absolute w-5 bg-white bg-opacity-50 rounded-full cursor-pointer left-2"
                  src={icn_back}
                  onClick={() => setCurrentIndexPC(currentIndexPC - 1)}
                />
              )}
              {currentIndexPC + 1 < mockdata.images.length && (
                <img
                  className="absolute w-5 bg-white bg-opacity-50 rounded-full cursor-pointer right-2"
                  src={icn_next}
                  onClick={() => setCurrentIndexPC(currentIndexPC + 1)}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-full bg-lightgray">
        <div className="flex flex-col w-full py-5 bg-white border-b-8 border-gray50">
          <div className="px-4 text-sm font-semibold text-black04 pb-[2px]">
            스냅, 컨셉
          </div>
          <div className="px-4 pb-4 text-xl font-bold ">{mockdata.title}</div>
          <div className="flex flex-col gap-2 px-3 text-sm font-medium text-black02">
            <div className="flex items-center gap-1">
              <img className="p-[0.35rem]" src={icn_time} />
              <div>
                {mockdata.startedAt.replace(/-/g, ".")}
                {" ~ "}
                {mockdata.endedAt.replace(/-/g, ".")}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <img className="w-6" src={icn_loc} />
              <div className="flex w-full gap-1">
                {mockdata.activeRegions.map((loc, index) => (
                  <div className="flex gap-1" key={index}>
                    <p>{loc.category}</p>
                    <p>
                      {loc.name}
                      {mockdata.activeRegions.length > index + 1 && <>,</>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {mockdata.photographerInstagramId && (
              <div className="flex items-center gap-1">
                <img className="p-[0.35rem]" src={icn_insta} />
                <div
                  className="cursor-pointer text-[#0068C3]"
                  onClick={() =>
                    window.open(
                      `https://www.instagram.com/${mockdata.photographerInstagramId}`
                    )
                  }
                >
                  {mockdata.photographerInstagramId}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col px-4 py-6 bg-white">
          <div className="pb-3 font-bold">촬영 작가</div>
          <div className="flex items-center gap-2 pb-6">
            <img
              className="w-10 h-10 rounded-full"
              src="https://i.pinimg.com/236x/b5/35/90/b53590a25445742b56c2bffb68987e11.jpg"
            />
            <div>{mockdata.photographerName}</div>
          </div>
          <div className="pb-3 font-bold">상세 설명</div>
          <div className="pb-5 text-sm font-medium text-black02">
            {mockdata.content}
          </div>
          <div className="flex gap-2 text-sm font-medium pb-36 text-black02">
            {mockdata.hashtags.map((tag) => (
              <div
                key={tag}
                className="px-3 py-1 rounded-2xl bg-violet400 bg-opacity-15 text-violet400"
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 z-20 flex items-center w-full max-w-[430px] gap-2 pt-2 px-4 pb-8 bg-white">
          <div className="cursor-pointer flex flex-col items-center justify-center w-12 h-12 rounded-md bg-gray50 text-black03 text-[0.625rem] font-medium">
            <img className="w-5 ml-[-0.725px]" src={icn_clip} />
            <div className="w-5 text-center">0</div>
          </div>
          <div className="flex-1 cursor-pointer rounded-[0.63rem] bg-violet300 justify-center text-white h-12 flex items-center font-semibold">
            신청하러 가기
          </div>
        </div>
      </div>
    </div>
  );
}
