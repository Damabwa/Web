interface Props {
  activation: boolean;
  onClick: () => void;
  text: string;
}

export default function ButtonActive({ activation, onClick, text }: Props) {
  return (
    <button
      className={`w-full h-[3.25rem] mb-4 text-white outline-none rounded-xl font-semibold ${activation ? "bg-violet400" : "bg-darkgray cursor-default"}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
