import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserExistence } from "../../api/user";
import icn_camera from "../../assets/svgs/icn_profile_camera_white.svg";
import icn_profile from "../../assets/svgs/icn_profile.svg";
import SubHeader from "../../components/SubHeader";
import InputButtonBox from "../../components/InputButtonBox";
import InputSelctBox from "../../components/InputSelectBox";
import InputIDBox from "../../components/InputIDBox";
import ButtonActive from "../../components/ButtonActive";

export default function EditUserProfile() {
  const navigation = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState("");
  const [username, setUsername] = useState("김송이");
  const [instagramId, setInstagramId] = useState("instaid");
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

  const checkExistenceFunc = async () => {
    if (!isValidName) return;
    try {
      const res = await checkUserExistence(username);
      if (res.exists) setIsDuplicated("true");
      else setIsDuplicated("false");
    } catch (e) {
      console.log(e);
    }
  };

  const checkValidFunc = () => {
    if (isChangedInstaId || (isChangedName && isDuplicated === "false"))
      setIsValid(true);
    else setIsValid(false);
  };

  return (
    <div className="relative flex flex-col justify-between min-h-screen px-4">
      <div>
        <SubHeader title="프로필 수정" />
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
        <div className="flex flex-col w-full gap-8 mb-12 text-sm">
          <div className="flex flex-col">
            <InputButtonBox
              isRequired={false}
              title="닉네임"
              description=""
              placeholder="닉네임을 입력해주세요."
              onChange={handleNameInput}
              onClick={() => checkExistenceFunc()}
              activation={
                isValidName && isChangedName && isDuplicated !== "false"
              }
              buttonTitle="중복 확인"
              bottomText=""
              value={username}
              isReadOnly={false}
            />
            {isDuplicated === "" ? (
              <div className="text-xs text-red">
                {!isValidName &&
                  username.length > 0 &&
                  "한글, 영어, 숫자 조합 2-7자만 가능해요."}
                {username.length === 0 && "닉네임을 입력해주세요."}
              </div>
            ) : (
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
              isRequired={false}
              title="성별"
              onClickA={() => {}}
              onClickB={() => {}}
              activationA={gender === "male"}
              activationB={gender === "female"}
              titleA="남성"
              titleB="여성"
              isReadonly={true}
            />
          </div>
          <InputIDBox
            title="인스타그램 아이디"
            placeholder="인스타그램 아이디를 입력해주세요."
            onChange={handleIdInput}
            value={instagramId}
          />
        </div>
      </div>
      <div className="mb-4">
        <ButtonActive
          activation={isValid}
          onClick={() => {
            if (isValid) navigation(`/mypage`);
          }}
          text="확인"
        />
      </div>
    </div>
  );
}
