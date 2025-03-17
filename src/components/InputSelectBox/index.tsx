interface Props {
  isRequired: boolean;
  title: string;
  onClickA: () => void;
  onClickB: () => void;
  activationA: boolean;
  activationB: boolean;
  titleA: string;
  titleB: string;
  isReadonly: boolean;
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
  isReadonly,
}: Props) {
  const getBtnStyle = (activation: boolean) => {
    if (isReadonly && activation)
      return "bg-black03 bg-opacity-30 border-black02 text-black02";
    else if (activation)
      return "bg-violet400 bg-opacity-15 border-violet400 text-violet400";
    else return "bg-gray50 border-gray50";
  };
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="font-medium">
        {isRequired && <span className="text-red mr-[0.12rem]">*</span>}
        <span>{title}</span>
      </div>
      <div className="flex items-center w-full gap-2">
        <button
          className={`flex-1 h-12 rounded-xl border font-semibold ${getBtnStyle(activationA)}`}
          onClick={() => onClickA()}
        >
          {titleA}
        </button>
        <button
          className={`flex-1 h-12 rounded-xl border font-semibold ${getBtnStyle(activationB)}`}
          onClick={() => onClickB()}
        >
          {titleB}
        </button>
      </div>
    </div>
  );
}
