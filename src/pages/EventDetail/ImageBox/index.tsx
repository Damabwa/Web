import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  images: any[];
  promotionType: string;
}

export default function ImageBox({ images, promotionType }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="relative">
      <div
        className="overflow-x-auto overflow-y-hidden h-96 snap-x snap-mandatory"
        ref={containerRef}
      >
        <div className="flex">
          {images.map((image: any, index: number) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-full slide-item snap-center"
              data-index={index}
            >
              <img src={image.url} className="object-cover min-w-full h-96 " />
              <div
                className="absolute top-0 left-0 w-full pointer-events-none h-28"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {(promotionType === "FREE" || promotionType === "DISCOUNT") && (
        <div className="absolute z-10 px-2 py-[0.38rem] text-sm font-semibold text-center text-white rounded-lg bottom-4 left-4 bg-violet300">
          {promotionType === "FREE" ? "무료" : "할인"} 이벤트
        </div>
      )}
      {images.length > 1 && (
        <div className="absolute z-10 right-4 bottom-3 bg-[rgb(85,85,85)] bg-opacity-80 flex items-center h-7 px-[0.88rem] text-white rounded-2xl text-xs">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
}
