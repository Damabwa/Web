import { useEffect, useRef, useState } from "react";
import icn_close from "../../../assets/svgs/icn_close_white.svg";

interface Props {
  images: any[];
  startIdx: number;
  setShowEnlargedImg: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EnlargeImage({
  images,
  startIdx,
  setShowEnlargedImg,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(startIdx);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: container.offsetWidth * startIdx,
      behavior: "smooth",
    });

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
  }, [startIdx]);

  const handlePrev = () => {
    if (containerRef.current && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * newIndex,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (containerRef.current && currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * newIndex,
        behavior: "smooth",
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="w-full h-full max-h-screen bg-[#000] flex-col flex justify-center items-center">
      <div className="absolute top-0 flex items-center justify-center w-full p-4">
        <div className="z-10 text-white">
          {currentIndex + 1} / {images.length}
        </div>
        <img
          className="absolute right-0 z-10 p-4 cursor-pointer"
          src={icn_close}
          onClick={() => setShowEnlargedImg(false)}
        />
      </div>
      <div className="relative">
        <div
          className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
          ref={containerRef}
          style={{
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth",
          }}
        >
          {images.map((image: any, index: number) => (
            <div
              key={image.url}
              className="flex-shrink-0 w-full slide-item snap-center"
              data-index={index}
              style={{
                scrollSnapAlign: "center",
                scrollSnapStop: "always",
              }}
            >
              <img
                src={image.url}
                className="object-contain w-full h-full max-w-screen max-h-screen"
              />
            </div>
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            className="absolute hidden w-6 h-6 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full md:block left-4 top-1/2"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#60;
          </button>
        )}
        {currentIndex < images.length - 1 && (
          <button
            className="absolute hidden w-6 h-6 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full md:block right-4 top-1/2"
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
          >
            &#62;
          </button>
        )}
      </div>
    </div>
  );
}
