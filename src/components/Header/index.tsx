interface Props {
  title: string;
  left: any;
  right: any;
}

export default function Header({ title, left, right }: Props) {
  return (
    <div className="flex items-center justify-between w-full h-12 py-1 bg-violet600">
      <div>{left}</div>
      <div className="text-2xl font-bold text-center text-white font-pre">
        {title}
      </div>
      <div>{right}</div>
    </div>
  );
}
