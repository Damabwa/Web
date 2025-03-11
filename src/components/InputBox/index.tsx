interface Props {
  isRequired: boolean;
  title: string;
  description: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  bottomText: string;
  value: string;
}

export default function InputBox({
  isRequired,
  title,
  description,
  placeholder,
  onChange,
  bottomText,
  value,
}: Props) {
  return (
    <div className="flex flex-col w-full text-sm">
      <div className="font-medium mb-[0.62rem]">
        {isRequired && <span className="text-red mr-[0.12rem]">*</span>}
        <span>{title}</span>
        {description !== "" && (
          <span className="text-xs text-black03 pl-[0.38rem]">
            {description}
          </span>
        )}
      </div>
      <div className="flex items-center w-full gap-2 mb-[0.31rem]">
        <input
          className="flex-1 h-12 px-4 border-none outline-none rounded-xl bg-lightgray"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
      {bottomText !== "" && (
        <div className="text-xs text-textgray">{bottomText}</div>
      )}
    </div>
  );
}
