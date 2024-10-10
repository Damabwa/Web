interface Props {
  title: string;
  left: any;
  right: any;
}

export default function Header({ title, left, right }: Props) {
  return (
    <div className="fixed top-0 z-20 flex items-center justify-between h-12 px-4 py-1 w-96 bg-violet600">
      <div>{left}</div>
      <div className="text-2xl font-bold text-center text-white cursor-pointer font-pre">
        {title}
      </div>
      <div>{right}</div>
    </div>
  );
}
