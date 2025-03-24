interface Props {
  icon: string;
  title: string;
  content: string;
}

export default function ListNotFound({ icon, title, content }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-1">
      <img className="pb-2" alt="NotFound" src={icon} />
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs text-black02">{content}</div>
    </div>
  );
}
