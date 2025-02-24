interface Props {
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

const typeList = ["스냅", "프로필", "컨셉", "증명", "셀프"];

export default function Types({ types, setTypes }: Props) {
  const handleSelectTypes = (item: string) => {
    if (types.includes(item)) setTypes(types.filter((t) => t !== item));
    else if (types.length < typeList.length) setTypes([...types, item]);
  };

  return (
    <div className="flex w-full gap-2 pt-[0.88rem]">
      {typeList.map((item, index) => (
        <button
          className={`flex-1 outline-none h-10 text-sm font-medium whitespace-nowrap border rounded-3xl ${types.includes(item) ? "border-black" : "border-white"}`}
          key={index}
          onClick={() => handleSelectTypes(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
