import { useEffect, useId, useRef } from "react";

type Align = "start" | "center" | "end";

const alignClassMap: Record<Align, string> = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
};

interface Props {
  title: string[];
  content: string[];
  btnMsg: string;
  align: Align;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

export default function ModalCheck({
  title,
  content,
  btnMsg,
  align,
  setShowModal,
  onClick,
}: Props) {
  const titleId = useId();
  const descId = useId();
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
    <div className="z-30 fixed top-0 w-screen max-w-[430px] h-dvh-safe bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className={`flex flex-col w-[17.125rem] rounded-[1.25rem] bg-white ${alignClassMap[align]} outline-none`}
      >
        <div className="flex flex-col gap-[0.44rem] p-6 pb-4 min-h-24 justify-center text-gray900 text-nowrap">
          <div id={titleId} className="font-semibold">
            {title.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          {content && (
            <div id={descId} className="flex flex-col text-sm">
              {content.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full text-sm font-medium border-t border-gray100 h-[2.875rem] text-center">
          <button
            type="button"
            className="flex items-center justify-center w-1/2 border-r cursor-pointer text-gray900 border-gray100"
            onClick={() => setShowModal(false)}
          >
            취소
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-1/2 cursor-pointer text-violet300"
            onClick={() => {
              onClick();
              setShowModal(false);
            }}
          >
            {btnMsg}
          </button>
        </div>
      </div>
    </div>
  );
}
