import { useEffect, useRef, useState } from "react";
import banner_main from "../../../assets/imgs/banner_damaba_main.png";
import banner_event from "../../../assets/imgs/banner_event1.png";

export default function BannerBox() {
  const realBanners = [banner_main, banner_event];
  const banners = [
    realBanners[realBanners.length - 1],
    ...realBanners,
    realBanners[0],
  ];
  const [currentIndex, setCurrentIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = (
    index: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.clientWidth;
    container.scrollTo({ left: width * index, behavior });
  };

  const resetAutoSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
  };

  useEffect(() => {
    resetAutoSlide();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

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

  useEffect(() => {
    scrollToIndex(currentIndex);
    const container = containerRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      if (currentIndex === 0) {
        setTimeout(() => {
          scrollToIndex(realBanners.length, "auto");
          setCurrentIndex(realBanners.length);
        }, 300);
      } else if (currentIndex === banners.length - 1) {
        setTimeout(() => {
          scrollToIndex(1, "auto");
          setCurrentIndex(1);
        }, 300);
      }
    };

    handleScrollEnd();
  }, [currentIndex]);

  return (
    <div className="relative shadow-banner rounded-xl">
      <div
        className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
        ref={containerRef}
        onScroll={() => resetAutoSlide()}
      >
        <div className="flex w-full">
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

      {realBanners.length > 1 && (
        <div className="absolute z-10 flex items-center h-4 px-3 py-2 text-xs text-white bg-black left-3 bottom-2 bg-opacity-30 rounded-2xl">
          {((currentIndex - 1 + realBanners.length) % realBanners.length) + 1}/
          {realBanners.length}
        </div>
      )}
    </div>
  );
}
