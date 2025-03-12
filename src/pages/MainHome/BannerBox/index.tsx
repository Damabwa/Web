import { useEffect, useRef, useState } from "react";
import banner_main from "../../../assets/imgs/banner_damaba_main.png";
import banner_event from "../../../assets/imgs/banner_event1.png";

export default function BannerBox() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const banners = [banner_main, banner_event];

  useEffect(() => {
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
  }, []);

  return (
    <div className="relative shadow-banner rounded-xl">
      <div
        className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        ref={containerRef}
      >
        <div className="flex">
          {banners.map((image: any, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-full slide-item snap-center"
              data-index={index}
            >
              <img src={image} className="object-cover min-w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      {banners.length > 1 && (
        <div className="absolute z-10 flex items-center h-4 px-3 py-2 text-xs text-white bg-black left-3 bottom-2 bg-opacity-30 rounded-2xl">
          {currentIndex + 1}/{banners.length}
        </div>
      )}
    </div>
  );
}
