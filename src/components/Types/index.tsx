interface Props {
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  maxNum: number;
}

const typeList = ["스냅", "프로필", "컨셉", "증명", "셀프"];

export default function Types({ types, setTypes, maxNum }: Props) {
  const handleSelectTypes = (item: string) => {
    if (types.includes(item)) setTypes(types.filter((t) => t !== item));
    else if (types.length < maxNum) setTypes([...types, item]);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium ">
        <span className="text-red mr-[0.12rem]">*</span>
        <span>촬영 종류</span>
        <span className="pl-1 text-xs text-textgray">
          (최대 {maxNum}개까지 선택 가능해요)
        </span>
      </div>
      <div className="flex w-full gap-2">
        {typeList.map((item, index) => (
          <button
            className={`flex-1 outline-none py-[0.6rem] text-sm font-medium border ${types.includes(item) ? "text-violet400 border-violet400 bg-violet400 bg-opacity-15" : "border-black border-opacity-10"} rounded-3xl`}
            key={index}
            onClick={() => handleSelectTypes(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
