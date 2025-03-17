import { useState } from "react";
import icn_delete from "../../../assets/svgs/btn_keyword_delete.svg";

interface Props {
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Keywords({
  keywords,
  setKeywords,
  setShowModal,
}: Props) {
  const [item, setItem] = useState("");

  const handleInput = (e: any) => {
    setItem(e.target.value);
  };

  const addKeyword = () => {
    if (keywords.length === 3 || item.length === 0) {
      setShowModal(true);
      return;
    }
    let hasSame = false;
    keywords.map((k) => {
      if (k === item) hasSame = true;
    });
    if (hasSame) return;
    setKeywords([...keywords, item]);
    setItem("");
  };

  const deleteKeyword = (item: string) => {
    setKeywords(keywords.filter((k) => k !== item));
  };

  return (
    <div className="flex flex-col w-full text-sm">
      <div className="font-medium mb-[0.62rem]">
        <span className="text-red mr-[0.12rem]">*</span>
        <span>대표 키워드</span>
        <span className="text-xs text-black03 pl-[0.38rem]">
          최소 1개 - 최대 3개
        </span>
      </div>
      <div className="flex items-center w-full gap-2 mb-[0.63rem]">
        <div className="flex items-center w-full">
          <div className="flex items-center pl-4 pr-1 h-12 bg-gray50 rounded-l-[0.63rem]">
            <p>#</p>
          </div>
          <input
            className="flex-1 h-12 pr-4 border-none outline-none rounded-r-xl bg-gray50"
            placeholder="스냅, 서울숲, 커플"
            value={item}
            onChange={handleInput}
          />
        </div>
        <button
          className={`min-w-20 h-12 font-semibold outline-none ${item.length > 0 ? "bg-violet300 text-white" : "cursor-default text-black02 border-black03 border"} rounded-xl  whitespace-nowrap`}
          onClick={() => addKeyword()}
        >
          등록
        </button>
      </div>
      <div className="flex gap-[0.69rem] items-center">
        {keywords.map((item) => (
          <div
            key={item}
            className="flex items-center text-sm font-medium bg-violet400 bg-opacity-15 rounded-2xl pl-[0.69rem] py-1 pr-1 w-fit"
          >
            <div>#{item}</div>
            <img src={icn_delete} onClick={() => deleteKeyword(item)} />
          </div>
        ))}
      </div>
    </div>
  );
}
