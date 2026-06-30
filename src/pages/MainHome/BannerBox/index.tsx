import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import banner_main from "../../../assets/imgs/banner_damaba_main.webp";
import banner_event from "../../../assets/banner/banner_1.webp";

export default function BannerBox() {
  const navigate = useNavigate();
  const images: { img: string; url: string | null }[] = [
    { img: banner_main, url: null },
    { img: banner_event, url: "/event/8" },
  ];
  const [idx, setIdx] = useState(1);

  return (
    <div className="relative w-full aspect-[2/1] overflow-hidden bg-gray100 rounded-xl shadow-banner">
      <Swiper
        className="h-full"
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        onSlideChange={(swiper: SwiperClass) => setIdx(swiper.realIndex + 1)}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="h-full">
            <img
              className={`${item.url && "cursor-pointer"} object-cover w-full h-full`}
              src={item.img}
              alt="배너"
              onClick={() => item.url && navigate(item.url)}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
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
