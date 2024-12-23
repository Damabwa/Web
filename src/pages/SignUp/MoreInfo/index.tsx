import { useEffect, useState } from "react";
import axios from "axios";
import icn_close from "../../../assets/svgs/icn_closeRegion.svg";
import ProfileImage from "./ProfileImage";
import Types from "./Types";
import Location from "./Location";

interface Props {
  setNextFunc: () => void;
}

interface Item {
  id: number;
  name: string;
  isSelected: boolean;
}

export default function MoreInfo({ setNextFunc }: Props) {
  const [photo, setPhoto] = useState();
  const [types, setTypes] = useState<Item[]>([]);
  const [locs, setLocs] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    checkValidFunc();
  }, [photo, types, locs]);

  const checkValidFunc = () => {
    let count = 0;
    types.map((item) => {
      if (item.isSelected) count += 1;
    });
    console.log(types);
    console.log(locs);
    if (photo && count > 0 && locs.length > 0) setIsValid(true);
    else setIsValid(false);
    console.log(types);
    console.log(locs);
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="w-full pb-5 text-xl font-bold">
        작가 정보를 입력해주세요
      </div>
      <div className="flex flex-col gap-8">
        <ProfileImage photo={photo} setPhoto={setPhoto} />
        <Types types={types} setTypes={setTypes} />
        <Location locs={locs} setLocs={setLocs} />
      </div>
      <button
        className={`absolute bottom-0 w-full py-3 mb-4 text-white outline-none rounded-xl font-semibold ${isValid ? "bg-violet400" : "bg-buttonfalse"}`}
        onClick={() => {
          if (isValid) setNextFunc();
        }}
      >
        다음
      </button>
    </div>
  );
}
