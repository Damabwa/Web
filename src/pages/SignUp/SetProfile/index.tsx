import { useEffect, useState } from "react";
import axios from "axios";

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

  const checkIsDuplicated = async () => {
    if (!isValidName) return;
    // if (role === "user") {
    await axios
      .get(
        `https://api-dev.damaba.me/api/v1/users/nicknames/existence?nickname=${username}`
      )
      .then((res) => {
        if (res.data.exists) setIsDuplicated("true");
        else setIsDuplicated("false");
      });
    // }
    // else if (role === "photographer") {
    //   await axios
    //     .get(
    //       `https://api-dev.damaba.me/api/v1/users/nicknames/existence?nickname=${username}`
    //     )
    //     .then((res) => {
    //       if (res.data.exists) setIsDuplicated("true");
    //       else setIsDuplicated("false");
    //     });
    // }
  };

  const handleIdInput = (e: any) => {
    setInstagramId(e.target.value);
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
      <div className="w-full pb-8 text-xl font-bold">
        회원 정보를 입력해주세요
      </div>
      <div className="flex flex-col w-full mb-12 text-sm gap-7">
        <div className="flex flex-col w-full gap-2">
          <div className="pb-1 font-medium">
            <span className="text-red">*</span>
            <span>{role === "user" ? "닉네임" : "상호/활동명"}</span>
          </div>
          <div className="flex items-center w-full gap-2">
            <input
              className="flex-1 px-4 py-3 border-none outline-none rounded-xl bg-lightgray"
              placeholder={`${role === "user" ? "닉네임" : "상호/활동명"}을 입력해주세요.`}
              onChange={handleNameInput}
            />
            <button
              className={`px-4 py-3 font-semibold ${isValidName ? "bg-violet300 text-white" : "cursor-default text-textgray border"} rounded-xl  whitespace-nowrap`}
              onClick={() => checkIsDuplicated()}
            >
              중복 확인
            </button>
          </div>
          <div className="flex flex-col">
            <div className="text-xs text-textgray">
              한글, 영어, 숫자 조합 {role === "user" ? "2-7자" : "15자 이내"}
            </div>
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
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="pb-1 font-medium">
            <span className="text-red">*</span> <span>성별</span>
          </div>
          <div className="flex items-center w-full gap-2">
            <button
              className={`flex-1 py-3 rounded-xl border font-semibold ${gender === "male" ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-lightgray border-lightgray"}`}
              onClick={() => setGender("male")}
            >
              남성
            </button>
            <button
              className={`flex-1 py-3 rounded-xl border font-semibold ${gender === "female" ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "bg-lightgray border-lightgray"}`}
              onClick={() => setGender("female")}
            >
              여성
            </button>
          </div>
          <div className="text-xs text-textgray">
            더 적합한 추천 필터링을 제공합니다!
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="pb-1 font-medium">
            <span>인스타그램 ID</span>
          </div>
          <div className="flex items-center w-full">
            <div className="py-3 pl-4 pr-1 bg-lightgray rounded-l-xl">@</div>
            <input
              className="flex-1 py-3 pr-4 border-none outline-none rounded-r-xl bg-lightgray"
              placeholder="인스타그램 ID를 입력해주세요."
              onChange={handleIdInput}
            />
          </div>
        </div>
      </div>
      <button
        className={`absolute bottom-0 w-full py-3 mb-4 text-white outline-none rounded-xl font-semibold ${isValid ? "bg-violet400" : "bg-buttonfalse"}`}
        onClick={() => handleNextBtn()}
      >
        다음
      </button>
    </div>
  );
}
