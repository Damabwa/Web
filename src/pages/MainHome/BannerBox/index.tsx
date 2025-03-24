import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import banner_main from "../../../assets/imgs/banner_damaba_main.png";
import banner_event from "../../../assets/imgs/banner_event1.png";
import { useState } from "react";

export default function BannerBox() {
  const images = [banner_main, banner_event];
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
        {images.map((img: string, index: number) => (
          <SwiperSlide key={index}>
            <img className="object-cover w-full h-full" src={img} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute z-10 w-10 py-[1px] text-xs font-medium text-center text-white bg-black bottom-2 left-3 bg-opacity-35 rounded-2xl">
        {idx}/{images.length}
      </div>
    </div>
  );
}
