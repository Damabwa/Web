import { useEffect, useState } from "react";
import { checkUserExistence } from "../../../api/user";
import { checkPhotographerExistence } from "../../../api/photographer";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import InputButtonBox from "../../../components/InputButtonBox";
import InputSelctBox from "../../../components/InputSelectBox";
import InputIDBox from "../../../components/InputIDBox";
import ButtonActive from "../../../components/ButtonActive";

interface Props {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  setNextFunc: () => void;
}

export default function SetProfile({
  userInfo,
  setNextFunc,
  setUserInfo,
}: Props) {
  const [isValid, setIsValid] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState("");
  const [gender, setGender] = useState("");
  const [instagramId, setInstagramId] = useState("");

  useEffect(() => {
    checkValidFunc();
  }, [nickname, isDuplicated, gender]);

  const handleNameInput = (e: any) => {
    setIsDuplicated("");

    let value = e.target.value;
    value = value.replace(/^\s+/, "").replace(/\s+/g, " ");

    setNickname(value);

    const userRegex = /^[가-힣a-zA-Z0-9]+$/;
    const photographerRegex = /^[가-힣a-zA-Z0-9\s]+$/;

    if (userInfo.role === "USER") {
      setIsValidName(
        value.length > 1 && value.length <= 7 && userRegex.test(value)
      );
    } else if (userInfo.role === "PHOTOGRAPHER") {
      setIsValidName(
        value.length > 1 && value.length <= 18 && photographerRegex.test(value)
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
      if (userInfo.role === "USER") {
        const res = await checkUserExistence(nickname);
        if (res.exists) setIsDuplicated("true");
        else setIsDuplicated("false");
      } else if (userInfo.role === "PHOTOGRAPHER") {
        const res = await checkPhotographerExistence(nickname);
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
    setUserInfo({
      ...userInfo,
      nickname,
      gender,
      instagramId: instagramId.length > 0 ? instagramId : null,
    });
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
            title={userInfo.role === "USER" ? "닉네임" : "상호/활동명"}
            description=""
            placeholder={`${userInfo.role === "USER" ? "닉네임" : "상호/활동명"}을 입력해주세요.`}
            onChange={handleNameInput}
            onClick={() => checkExistenceFunc()}
            activation={isValidName && isDuplicated !== "false"}
            buttonTitle="중복 확인"
            bottomText={`${userInfo.role === "USER" ? "한글, 영어, 숫자 조합 2-7자" : "한글, 영어, 숫자, 공백 조합 18자 이내"}`}
            value={nickname}
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
            onClickA={() => setGender("MALE")}
            onClickB={() => setGender("FEMALE")}
            activationA={gender === "MALE"}
            activationB={gender === "FEMALE"}
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
