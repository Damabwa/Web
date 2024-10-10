import icn_check from "../../../assets/svgs/icn_check.svg";

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
    <div
      className={`flex flex-col gap-5 pt-8 pb-12 bg-white px-7 rounded-t-xl`}
    >
      <div className="mb-2 text-xl">{title}</div>
      {child.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span
            className="text-base cursor-pointer"
            onClick={() => handleSelectType(item.name)}
          >
            {item.full}
          </span>
          {(item.name === order || item.name === state) && (
            <img alt="✓" src={icn_check} />
          )}
        </div>
      ))}
    </div>
  );
}
