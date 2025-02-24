import { useEffect, useState } from "react";
import { checkUserExistence } from "../../../api/user";
import { checkPhotographerExistence } from "../../../api/photographer";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import InputButtonBox from "../../../components/InputButtonBox";
import InputSelctBox from "../../../components/InputSelectBox";
import InputIDBox from "../../../components/InputIDBox";
import ButtonActive from "../../../components/ButtonActive";

interface Props {
  role: string;
  setNextFunc: () => void;
  setInfoFunc: (username: string, gender: string, instagramId: string) => void;
}

export default function SetProfile({ role, setNextFunc, setInfoFunc }: Props) {
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState("");
  const [gender, setGender] = useState("");
  const [instagramId, setInstagramId] = useState("");

  useEffect(() => {
    checkValidFunc();
  }, [username, isDuplicated, gender]);

  const handleNameInput = (e: any) => {
    setIsDuplicated("");
    setUsername(e.target.value);

    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    if (role === "user") {
      setIsValidName(
        e.target.value.length > 1 &&
          e.target.value.length < 8 &&
          nicknameRegex.test(e.target.value)
      );
    } else if (role === "photographer") {
      setIsValidName(
        e.target.value.length > 1 &&
          e.target.value.length < 16 &&
          nicknameRegex.test(e.target.value)
      );
    }
  };

  const handleIdInput = (e: any) => {
    let { value } = e.target;
    value = value.toLowerCase();
    value = value.replace(/[^0-9a-z._]/g, "");
    if (value.length > 30) {
      value = value.slice(0, 30);
    }
    setInstagramId(value);
  };

  const checkExistenceFunc = async () => {
    if (!isValidName) return;
    try {
      if (role === "user") {
        const res = await checkUserExistence(username);
        if (res.exists) setIsDuplicated("true");
        else setIsDuplicated("false");
      } else if (role === "photographer") {
        const res = await checkPhotographerExistence(username);
        if (res.exists) setIsDuplicated("true");
        else setIsDuplicated("false");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const checkValidFunc = () => {
    if (isDuplicated === "false" && gender !== "") setIsValid(true);
    else setIsValid(false);
  };

  const handleNextBtn = () => {
    if (!isValid) return;
    setInfoFunc(username, gender, instagramId);
    setNextFunc();
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="w-full pb-8 text-xl font-bold">
        회원 정보를 입력해주세요
      </div>
      <div className="flex flex-col w-full mb-12 text-sm gap-7">
        <div className="flex flex-col">
          <InputButtonBox
            isRequired={true}
            title={role === "user" ? "닉네임" : "상호활동명"}
            description=""
            placeholder={`${role === "user" ? "닉네임" : "상호/활동명"}을 입력해주세요.`}
            onChange={handleNameInput}
            onClick={() => checkExistenceFunc()}
            activation={isValidName && isDuplicated !== "false"}
            buttonTitle="중복 확인"
            bottomText={`한글, 영어, 숫자 조합 ${role === "user" ? "2-7자" : "15자 이내"}`}
            value={username}
            isReadOnly={false}
          />
          {isDuplicated !== "" && (
            <div
              className={`text-xs ${isDuplicated === "true" ? "text-red" : "text-violet500"}`}
            >
              {isDuplicated === "true"
                ? "중복된 닉네임입니다"
                : "사용 가능한 닉네임입니다."}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[0.38rem]">
          <InputSelctBox
            isRequired={true}
            title="성별"
            onClickA={() => setGender("male")}
            onClickB={() => setGender("female")}
            activationA={gender === "male"}
            activationB={gender === "female"}
            titleA="남성"
            titleB="여성"
            isReadonly={false}
          />
          <div className="text-xs text-textgray">
            더 적합한 추천 필터링을 제공합니다!
          </div>
        </div>
        <InputIDBox
          title="인스타그램 아이디"
          placeholder="인스타그램 아이디를 입력해주세요."
          onChange={handleIdInput}
          value={instagramId}
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <ButtonActive
          activation={isValid}
          onClick={() => handleNextBtn()}
          text="다음"
        />
      </div>
    </div>
  );
}
