import { useEffect, useState } from "react";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_check_on from "../../../assets/svgs/btn_signup_check_on.svg";
import icn_check_off from "../../../assets/svgs/btn_signup_check_off.svg";
import ButtonActive from "../../../components/ButtonActive";

interface Props {
  setNextFunc: () => void;
  role: string;
}

export default function Terms({ setNextFunc, role }: Props) {
  const [isValid, setIsValid] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [termsList, setTermsList] = useState([
    {
      isRequired: true,
      roles: ["USER", "PHOTOGRAPHER"],
      text: "만 14세 이상입니다.",
      link: null,
      isChecked: false,
    },
    {
      isRequired: true,
      roles: ["USER", "PHOTOGRAPHER"],
      text: "담아봐 서비스 이용약관",
      link: process.env.REACT_APP_TERMS_URL,
      isChecked: false,
    },
    {
      isRequired: true,
      roles: ["USER", "PHOTOGRAPHER"],
      text: "개인정보 수집·이용 동의",
      link: process.env.REACT_APP_POLICY_URL,
      isChecked: false,
    },
    {
      isRequired: true,
      roles: ["PHOTOGRAPHER"],
      text: "입점 작가 약관 동의서",
      link: process.env.REACT_APP_PARTNERSHIP,
      isChecked: false,
    },
  ]);

  const handleCheckOnly = (index: Number) => {
    const updated = termsList.map((item, i) => ({
      ...item,
      isChecked: index === i ? !item.isChecked : item.isChecked,
    }));
    setTermsList(updated);
  };

  const handleCheckAll = () => {
    const updated = termsList.map((item) => ({
      ...item,
      isChecked: !allCheck,
    }));
    setTermsList(updated);
    setAllCheck(!allCheck);
  };

  useEffect(() => {
    setIsValid(true);
    termsList.map((item) => {
      if (item.roles.includes(role) && !item.isChecked) {
        setAllCheck(false);
        if (item.isRequired) setIsValid(false);
      }
    });
  }, [termsList]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="w-full pb-8 text-xl font-bold">
        서비스 약관에 동의해주세요
      </div>
      <div className="flex flex-col justify-center text-sm">
        <div className="w-full flex gap-4 px-[1.12rem] py-5">
          <img
            className="w-[1.125rem] h-[1.125rem]"
            onClick={() => handleCheckAll()}
            src={allCheck ? icn_check_on : icn_check_off}
          />
          <div> 모두 동의합니다.</div>
        </div>
        {termsList.map((item, i) => (
          <div
            key={item.text}
            className={`${item.roles.includes(role) ? "flex" : "hidden"} w-full items-center justify-between px-[1.12rem] py-5`}
          >
            <div className="flex gap-4">
              <img
                className="w-[1.125rem] h-[1.125rem]"
                onClick={() => handleCheckOnly(i)}
                src={item.isChecked ? icn_check_on : icn_check_off}
              />
              <div>
                {item.isRequired ? "[필수] " : "[선택] "}
                {item.text}
              </div>
            </div>
            {item.link && (
              <button onClick={() => window.open(item.link)}>
                <img className="w-6 h-6" src={icn_next} />
              </button>
            )}
          </div>
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
