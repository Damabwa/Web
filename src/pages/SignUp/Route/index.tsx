import { useEffect, useState } from "react";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import ButtonActive from "../../../components/ButtonActive";

interface Props {
  setNextFunc: () => void;
}

export default function Route({ setNextFunc }: Props) {
  const [isValid, setIsValid] = useState(false);
  const [btns, setBtns] = useState([
    {
      id: 0,
      title: "지인에게 소개 받았어요.",
      isSelected: false,
    },
    {
      id: 1,
      title: "인스타그램 보고 알게 됐어요",
      isSelected: false,
    },
    {
      id: 2,
      title: "촬영 이벤트를 통해 알게 됐어요",
      isSelected: false,
    },
    {
      id: 3,
      title: "인터넷 검색을 통해 알게 됐어요",
      isSelected: false,
    },
    {
      id: 4,
      title: "기타",
      isSelected: false,
    },
  ]);

  useEffect(() => {
    setIsValid(false);
    btns.map((item) => {
      if (item.isSelected === true) setIsValid(true);
    });
  }, [btns]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="w-full pb-8 text-xl font-bold">
        담아봐를
        <br /> 어떻게 알게 되셨나요?
      </div>
      <div className="flex flex-col gap-4">
        {btns.map((item) => (
          <button
            key={item.id}
            className={`outline-none w-full py-4 rounded-xl font-medium text-sm ${item.isSelected ? "bg-[#515151] text-white" : "bg-gray50"}`}
            onClick={() =>
              setBtns((prevBtns) =>
                prevBtns.map((btn) =>
                  btn.id === item.id
                    ? { ...btn, isSelected: !btn.isSelected }
                    : btn
                )
              )
            }
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <ButtonActive
          activation={isValid}
          onClick={() => {
            if (isValid) setNextFunc();
          }}
          text="다음"
        />
      </div>
    </div>
  );
}
