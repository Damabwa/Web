import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import banner_main from "../../../assets/imgs/banner_damaba_main.png";
import banner_event from "../../../assets/banner/banner_1.png";

export default function BannerBox() {
  const navigation = useNavigate();
  const images = [
    { img: banner_main, url: null },
    { img: banner_event, url: "/event/8" },
  ];
  const [idx, setIdx] = useState(1);

  return (
    <div className="relative w-full overflow-hidden bg-gray100 rounded-xl shadow-banner">
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSlideChange={() => {
          setIdx(idx > images.length - 1 ? 1 : idx + 1);
        }}
      >
        {images.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <img
              className={`${item.url && "cursor-pointer"} object-cover w-full h-full`}
              src={item.img}
              onClick={() => item.url && navigation(item.url)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-10 w-10 py-[1px] text-xs font-medium text-center text-white bg-black bottom-2 left-3 bg-opacity-35 rounded-2xl">
        {idx}/{images.length}
      </div>
    </div>
  );
}
