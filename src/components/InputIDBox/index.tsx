interface Props {
  title: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function InputIDBox({
  title,
  placeholder,
  onChange,
  value,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-2 text-sm">
      <div className="font-medium">
        <span>{title}</span>
      </div>
      <div className="flex items-center w-full">
        <div className="flex items-center pl-4 pr-1 h-12 bg-gray50 rounded-l-[0.63rem]">
          <p>@</p>
        </div>
        <input
          className="flex-1 h-12 pr-4 border-none outline-none rounded-r-xl bg-gray50"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
