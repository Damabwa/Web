import icn_check from "../../../assets/svgs/icn_filterCheck.svg";

interface Props {
  title: string;
  child: any[];
  order: string;
  state: string;
  handleSelectType: (name: string) => void;
}

export default function FilterType({
  title,
  child,
  order,
  state,
  handleSelectType,
}: Props) {
  return (
    <div className={`flex flex-col bg-white px-4 pt-3 pb-10 rounded-t-3xl`}>
      <div className="p-[0.62rem] font-semibold text-center">{title}</div>
      {child.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelectType(item.name)}
          className="cursor-pointer flex justify-between w-full border-t border-gray100 py-4 font-medium"
        >
          <span>{item.name}</span>
          {(item.name === order || item.name === state) && (
            <img className="px-2" alt="✓" src={icn_check} />
          )}
        </div>
      ))}
    </div>
  );
}
