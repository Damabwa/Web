import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icn_back from "../../../assets/svgs/icn_back.svg";
import icn_search from "../../../assets/svgs/icn_search_black.svg";

interface Props {
  onSubmit: (input: string) => void;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ onSubmit, state, setState }: Props) {
  const navigation = useNavigate();
  const [input, setInput] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit(input);
  };

  return (
    <div className="flex items-center w-full h-16 px-2">
      <div className="p-2">
        <img
          className="w-6 cursor-pointer"
          src={icn_back}
          onClick={() =>
            state === "OVERVIEW" ? navigation(-1) : setState("OVERVIEW")
          }
        />
      </div>
      <input
        className="text-base scale-[0.875] origin-left flex-1 h-10 bg-gray50 rounded-[0.63rem] px-4 outline-none"
        placeholder="검색어를 입력해주세요."
        onChange={inputHandler}
        onKeyDown={keyDownHandler}
        value={input}
      />
      <div className="p-3">
        <img
          className="cursor-pointer "
          src={icn_search}
          onClick={() => onSubmit(input)}
        />
      </div>
    </div>
  );
}
