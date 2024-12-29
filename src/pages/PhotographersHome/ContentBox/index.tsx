import { useState } from "react";
import icn_clipOff from "../../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../../assets/svgs/icn_clipOn.svg";

interface postData {
  image: string;
  name: string;
  types: string[];
}

interface Props {
  data: postData;
}

export default function ContentBox({ data }: Props) {
  const [isClipped, setIsClipped] = useState(false);

  const handleTextLength = () => {
    if (data.name.length < 8) return data.name;
    return `${data.name.slice(0, 8)}...`;
  };

  return (
    <div className="flex flex-col cursor-pointer justify-between bg-gray rounded-xl h-48 text-white">
      <div className="flex justify-end items-center p-2 ">
        <div className="bg-white rounded-full p-[0.375rem]">
          <img
            alt="clip"
            src={isClipped ? icn_clipOn : icn_clipOff}
            onClick={() => setIsClipped(!isClipped)}
          />
        </div>
      </div>
      <div className="p-3">
        <div className="font-semibold">{handleTextLength()}</div>
        <div className="flex gap-1 items-center text-xs">
          {data.types.map((type, index) => (
            <div key={index}>
              {type}
              {index + 1 !== data.types.length && <>,</>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
