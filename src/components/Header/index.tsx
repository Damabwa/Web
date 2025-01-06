interface Props {
  main: any;
  left: any;
  right: any;
}

export default function Header({ main, left, right }: Props) {
  return (
    <div className="fixed top-0 z-50 flex items-center justify-center h-12 px-4 w-full max-w-[430px] bg-violet600">
      <div className="absolute left-0 cursor-pointer">{left}</div>
      <div>{main}</div>
      <div className="absolute right-0 cursor-pointer ">{right}</div>
    </div>
  );
}
