interface Props {
  isOn: boolean;
  setOn: () => void;
  setOff: () => void;
  title: string;
}

export default function BtnOnOff({ isOn, setOn, setOff, title }: Props) {
  return (
    <button
      className={`min-w-fit outline-none flex items-center justify-center h-9 px-[0.88rem] py-[0.38rem] rounded-3xl border ${isOn ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-gray100 border-gray100"}`}
      onClick={() => (isOn ? setOff() : setOn())}
    >
      {title}
    </button>
  );
}
