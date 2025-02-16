interface Props {
  isRequired: boolean;
  title: string;
  onClickA: () => void;
  onClickB: () => void;
  activationA: boolean;
  activationB: boolean;
  titleA: string;
  titleB: string;
}

export default function InputSelctBox({
  isRequired,
  title,
  onClickA,
  onClickB,
  activationA,
  activationB,
  titleA,
  titleB,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="pb-1 font-medium">
        {isRequired && <span className="text-red mr-[0.12rem]">*</span>}
        <span>{title}</span>
      </div>
      <div className="flex items-center w-full gap-2">
        <button
          className={`flex-1 h-12 rounded-xl border font-semibold ${activationA ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-lightgray border-lightgray"}`}
          onClick={() => onClickA()}
        >
          {titleA}
        </button>
        <button
          className={`flex-1 h-12 rounded-xl border font-semibold ${activationB ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-lightgray border-lightgray"}`}
          onClick={() => onClickB()}
        >
          {titleB}
        </button>
      </div>
    </div>
  );
}
