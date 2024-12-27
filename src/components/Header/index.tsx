interface Props {
  title: string;
  left: any;
  right: any;
}

export default function Header({ title, left, right }: Props) {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-center h-12 px-4 py-1 w-full max-w-[426px] bg-violet600">
      <div className="absolute cursor-pointer left-4 ">{left}</div>
      <div className="font-semmibold text-white cursor-pointer font-pre">
        {title}
      </div>
      <div className="absolute cursor-pointer right-4 ">{right}</div>
    </div>
  );
}
