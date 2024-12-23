import { useEffect, useState } from "react";

interface Props {
  types: Item[];
  setTypes: React.Dispatch<React.SetStateAction<Item[]>>;
}

interface Item {
  id: number;
  name: string;
  isSelected: boolean;
}

export default function Types({ types, setTypes }: Props) {
  useEffect(() => {
    setTypes([
      {
        id: 0,
        name: "스냅",
        isSelected: false,
      },
      {
        id: 1,
        name: "프로필",
        isSelected: false,
      },
      {
        id: 2,
        name: "컨셉",
        isSelected: false,
      },
      {
        id: 3,
        name: "증명",
        isSelected: false,
      },
      {
        id: 4,
        name: "셀프",
        isSelected: false,
      },
    ]);
  }, []);

  const handleSelectTypes = (id: number) => {
    let count = 0;
    types.map((item) => {
      if (item.isSelected) count += 1;
    });
    if (count === 3 && !types[id].isSelected) return;
    setTypes((prevTypes) =>
      prevTypes.map((t) =>
        t.id === id ? { ...t, isSelected: !t.isSelected } : t
      )
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium ">
        <span className="text-red">*</span>
        <span>촬영 종류</span>
        <span className="pl-1 text-xs text-textgray">
          (최대 3개까지 선택 가능해요)
        </span>
      </div>
      <div className="flex w-full gap-2">
        {types.map((item) => (
          <button
            className={`flex-1 outline-none py-[0.6rem] text-sm font-semibold border ${item.isSelected ? "text-violet400 border-violet400 bg-violet400 bg-opacity-15" : "border-black border-opacity-10"} rounded-3xl`}
            key={item.id}
            onClick={() => handleSelectTypes(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
