import React, { useState, useRef, useEffect } from "react";

interface Props {
  isRequired: boolean;
  title: string;
  minHeight: string;
  maxLength: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export default function InputLongformBox({
  isRequired,
  title,
  minHeight,
  maxLength,
  setValue,
  value,
}: Props) {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 1000) {
      setValue(e.target.value);
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = minHeight;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="flex flex-col w-full gap-2 text-sm">
      <div className="font-medium">
        {isRequired && <span className="text-red mr-[0.12rem]">*</span>}
        <span>{title}</span>
      </div>
      <div className="flex flex-col w-full">
        <textarea
          ref={textareaRef}
          onChange={handleChange}
          maxLength={maxLength}
          id="intro"
          value={value}
          placeholder="인사말, 작가님 소개, 작업 스타일, 예약 방법, 영업 일시 등을 작성해주세요."
          className={`text-base min-h-[10.5rem] p-4 border-none outline-none rounded-[0.63rem] bg-gray50 resize-none ${minHeight}`}
        />
        <div className="w-full pt-2 text-sm text-end text-black02">
          {text.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}
