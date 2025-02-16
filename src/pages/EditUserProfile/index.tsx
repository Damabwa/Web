import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import icn_back from "../../assets/svgs/icn_back.svg";
import icn_camera from "../../assets/svgs/icn_profile_camera.svg";
import icn_profile from "../../assets/svgs/icn_profile.svg";

export default function EditUserProfile() {
  const navigation = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("김송이");
  const [instagramId, setInstagramId] = useState("");
  let gender = "female";

  const [isValid, setIsValid] = useState(false);
  const [isChangedName, setIsChangedName] = useState(false);
  const [isChangedInstaId, setIsChangedInstaId] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState("");

  useEffect(() => {
    checkValidFunc();
  }, [username, isDuplicated, instagramId]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameInput = (e: any) => {
    setIsDuplicated("");
    setIsChangedName(true);
    setUsername(e.target.value);

    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    setIsValidName(
      e.target.value.length > 1 &&
        e.target.value.length < 8 &&
        nicknameRegex.test(e.target.value)
    );
  };

  const handleIdInput = (e: any) => {
    setIsChangedInstaId(true);
    let { value } = e.target;
    value = value.toLowerCase();
    value = value.replace(/[^0-9a-z._]/g, "");
    if (value.length > 30) {
      value = value.slice(0, 30);
    }
    setInstagramId(value);
  };

  const checkIsDuplicated = async () => {
    if (!isValidName) return;
    await axios
      .get(
        `https://api-dev.damaba.me/api/v1/users/nicknames/existence?nickname=${username}`
      )
      .then((res) => {
        if (res.data.exists) setIsDuplicated("true");
        else setIsDuplicated("false");
      });
  };

  const checkValidFunc = () => {
    console.log(isChangedInstaId);
    if (isChangedInstaId || (isChangedName && isDuplicated === "false"))
      setIsValid(true);
    else setIsValid(false);
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-4">
      <div>
        <div className="relative flex items-center justify-center h-12 font-semibold bg-white">
          <img
            className="absolute left-0 w-6 h-6 cursor-pointer"
            src={icn_back}
            onClick={() => navigation(-1)}
          />
          <div>프로필 수정</div>
          <div />
        </div>
        <div className="flex justify-center pt-[0.8rem]">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <div
            className="relative cursor-pointer w-fit "
            onClick={handleImageClick}
          >
            {photo ? (
              <img
                className="object-contain w-24 h-24 rounded-full"
                src={photo}
              />
            ) : (
              <img className="w-24 h-24 rounded-full" src={icn_profile} />
            )}
            <div className="bg-[#A7A8AA] w-fit p-1 rounded-full absolute bottom-0 right-0 border-2 border-white">
              <img src={icn_camera} />
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full py-2 text-xs text-black04">
          <div
            className="border-b cursor-pointer border-black04 w-fit"
            onClick={() => setPhoto("")}
          >
            프로필 사진 삭제하기
          </div>
        </div>
        <div className="flex flex-col w-full gap-8 mb-12 text-sm font-medium">
          <div className="flex flex-col w-full gap-2">
            <div>닉네임</div>
            <div className="flex items-center w-full gap-2">
              <input
                className="flex-1 h-12 px-4 border-none outline-none rounded-[0.63rem] bg-lightgray"
                placeholder="닉네임을 입력해주세요."
                onChange={handleNameInput}
                value={username}
              />
              <button
                className={`px-4 h-12 font-semibold outline-none ${isValidName && isChangedName && isDuplicated !== "false" ? "bg-violet300 text-white" : "cursor-default text-textgray border"} rounded-xl  whitespace-nowrap`}
                onClick={() => checkIsDuplicated()}
              >
                중복 확인
              </button>
            </div>
            {username === "" && (
              <div className="text-xs text-red">닉네임을 입력해주세요.</div>
            )}
            {!isValidName && username.length > 0 && (
              <div className="text-xs text-red">
                한글, 영어, 숫자 조합 2-7자만 가능해요.
              </div>
            )}
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
          <div className="flex flex-col w-full gap-2">
            <div>성별</div>
            <div className="flex items-center w-full gap-2">
              <button
                className={`cursor-default flex-1 h-12 rounded-[0.63rem] border font-semibold ${gender === "male" ? "bg-[#767676] bg-opacity-30 border-black02 text-black02" : "bg-lightgray border-lightgray"}`}
              >
                남성
              </button>
              <button
                className={`cursor-default flex-1 h-12 rounded-[0.63rem] border font-semibold ${gender === "female" ? "bg-[#767676] bg-opacity-30 border-black02 text-black02" : "bg-lightgray border-lightgray"}`}
              >
                여성
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="pb-1 font-medium">
              <span>인스타그램 ID</span>
            </div>
            <div className="flex items-center w-full">
              <div className="flex items-center pl-4 pr-1 h-12 bg-lightgray rounded-l-[0.63rem]">
                <p>@</p>
              </div>
              <input
                className="flex-1 h-12 pr-4 border-none outline-none rounded-r-[0.63rem] bg-lightgray"
                placeholder="인스타그램 ID를 입력해주세요."
                onChange={handleIdInput}
                value={instagramId}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className={`w-full h-[3.25rem] mb-8 text-white outline-none rounded-xl font-semibold ${isValid ? "bg-violet400" : "bg-buttonfalse cursor-default"}`}
        onClick={() => {
          if (isValid) navigation(`/mypage`);
        }}
      >
        확인
      </button>
    </div>
  );
}
