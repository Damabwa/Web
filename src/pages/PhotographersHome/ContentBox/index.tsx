import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_clipOff from "../../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../../assets/svgs/icn_clipOn.svg";

interface postData {
  id: number;
  image: string;
  name: string;
  types: string[];
}

interface Props {
  data: postData;
}

export default function ContentBox({ data }: Props) {
  const [isClipped, setIsClipped] = useState(false);
  const navigation = useNavigate();

  const handleTextLength = () => {
    if (data.name.length < 8) return data.name;
    return `${data.name.slice(0, 8)}...`;
  };

  return (
    <div
      className="flex flex-col justify-between h-48 text-white cursor-pointer bg-gray rounded-xl"
      onClick={() => navigation(`/photographer/${data.id}`)}
    >
      <div className="flex items-center justify-end p-2 ">
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
        <div className="flex items-center gap-1 text-xs">
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
