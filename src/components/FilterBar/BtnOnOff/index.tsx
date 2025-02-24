interface Props {
  isOn: boolean;
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export default function BtnOnOff({ isOn, setIsOn, title }: Props) {
  return (
    <button
      className={`min-w-fit outline-none flex items-center justify-center h-9 px-[0.88rem] py-[0.38rem] rounded-3xl border ${isOn ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-gray100 border-gray100"}`}
      onClick={() => setIsOn(!isOn)}
    >
      {title}
    </button>
  );
}
