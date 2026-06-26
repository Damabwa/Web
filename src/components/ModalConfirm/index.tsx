import { useEffect, useId, useRef } from "react";

interface Props {
  content: string[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalConfirm({ content, setShowModal }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setShowModal]);

  return (
    <div className="z-20 fixed top-0 w-screen max-w-[430px] h-dvh-safe bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex flex-col w-[17.125rem] rounded-[1.25rem] bg-white outline-none"
      >
        <div className="pt-[1.87rem] pb-[1.38rem] justify-center text-center">
          <div id={titleId} className="flex flex-col font-semibold text-gray900">
            {content.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="flex w-full text-sm font-medium border-t items-center border-gray100 h-[2.875rem] justify-center text-violet300 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
}
