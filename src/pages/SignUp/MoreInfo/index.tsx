import { useEffect, useState } from "react";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import ProfileImage from "../../../components/ProfileImage";
import Types from "../../../components/Types";
import Location from "../../../components/Location";
import ButtonActive from "../../../components/ButtonActive";

interface Props {
  onClickFunc: () => void;
}

interface Item {
  id: number;
  name: string;
  isSelected: boolean;
}

export default function MoreInfo({ onClickFunc }: Props) {
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
    if (photo && count > 0 && locs.length > 0) setIsValid(true);
    else setIsValid(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="w-full pb-5 text-xl font-bold">
        작가 정보를 입력해주세요
      </div>
      <div className="flex flex-col gap-8 mb-20">
        <ProfileImage photo={photo} setPhoto={setPhoto} />
        <Types types={types} setTypes={setTypes} maxNum={3} />
        <Location locs={locs} setLocs={setLocs} maxNum={5} />
      </div>
      <ButtonActive
        activation={isValid}
        onClick={() => {
          if (isValid) onClickFunc();
        }}
        text="다음"
      />
    </div>
  );
}
