interface Props {
  icn: any;
  text: string;
}

export default function SubHeader({ icn, text }: Props) {
  return (
    <div className="pt-[0.62rem]">
      <div className="flex items-center w-full h-10 gap-1 px-4 font-bold text-violet400">
        {icn}
        <div>{text}</div>
      </div>
    </div>
  );
}
