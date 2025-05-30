interface Props {
  icn: any;
  text: string;
}

export default function SubHeader({ icn, text }: Props) {
  return (
    <div className="flex items-center w-full gap-1 px-4 pt-4 font-bold text-violet400">
      {icn}
      <div>{text}</div>
    </div>
  );
}
