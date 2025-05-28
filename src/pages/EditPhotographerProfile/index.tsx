import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkPhotographerExistence } from "../../api/photographer";
import { modifyPhotographerProfile } from "../../api/photographer";
import SubHeader from "../../components/SubHeader";
import ProfileImage from "../../components/ProfileImage";
import Types from "../../components/Types";
import Location from "../../components/Location";
import ButtonActive from "../../components/ButtonActive";
import InputButtonBox from "../../components/InputButtonBox";

export default function EditPhotographerProfile() {
  const navigation = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState<any>();
  const [mainPhotographyTypes, setMainPhotographyTypes] = useState<string[]>(
    []
  );
  const [activeRegions, setActiveRegions] = useState<string[]>([]);

  const [isValid, setIsValid] = useState(false);
  const [isChangedName, setIsChangedName] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState("");

  useEffect(() => {
    setUserInfo(location.state);
    console.log(location.state);
    setMainPhotographyTypes(location.state.mainPhotographyTypes);
    setActiveRegions(location.state.activeRegions);
  }, []);

  useEffect(() => {
    checkValidFunc();
  }, [isDuplicated, userInfo]);

  const handleNameInput = (e: any) => {
    setIsDuplicated("");
    setIsChangedName(true);
    if (location.state.nickname === e.target.value) setIsChangedName(false);
    setUserInfo({ ...userInfo, nickname: e.target.value });

    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    setIsValidName(
      e.target.value.length > 1 &&
        e.target.value.length <= 18 &&
        nicknameRegex.test(e.target.value)
    );
  };

  const checkValidFunc = () => {
    if (
      isDuplicated !== "true" &&
      mainPhotographyTypes.length > 0 &&
      activeRegions.length > 0
    )
      setIsValid(true);
    else setIsValid(false);
  };

  const checkExistenceFunc = async () => {
    if (!isValidName) return;
    try {
      const res = await checkPhotographerExistence(userInfo.nickname);
      if (res.exists) setIsDuplicated("true");
      else setIsDuplicated("false");
    } catch (e) {
      console.log(e);
    }
  };

  const onClickSave = async () => {
    const { nickname, profileImage } = userInfo;
    try {
      await modifyPhotographerProfile({
        nickname,
        profileImage,
        mainPhotographyTypes,
        activeRegions,
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigation(`/mypage`, { replace: true });
    }
  };

  if (!userInfo) return <></>;
  return (
    <div className="relative flex flex-col gap-6 px-4">
      <SubHeader title="프로필 수정" />
      <div className="flex flex-col gap-8 mb-20">
        <ProfileImage userInfo={userInfo} setUserInfo={setUserInfo} />
        <div>
          <InputButtonBox
            isRequired={true}
            title="상호/활동명"
            description=""
            placeholder="상호명을 입력해주세요."
            onChange={handleNameInput}
            onClick={() => checkExistenceFunc()}
            activation={
              isValidName && isChangedName && isDuplicated !== "false"
            }
            buttonTitle="중복 확인"
            bottomText=""
            value={userInfo.nickname}
            isReadOnly={false}
          />
          {isDuplicated === "" ? (
            <div
              className={`text-xs ${
                isValidName && userInfo.nickname.length > 0
                  ? "text-textgray"
                  : "text-red"
              }`}
            >
              {"한글, 영어, 숫자 조합 18자 이내"}
            </div>
          ) : (
            <div
              className={`text-xs ${isDuplicated === "true" ? "text-red" : "text-violet500"}`}
            >
              {isDuplicated === "true"
                ? "중복된 상호/활동명입니다"
                : "사용 가능한 상호/활동명입니다."}
            </div>
          )}
        </div>
        <Types
          types={mainPhotographyTypes}
          setTypes={setMainPhotographyTypes}
          maxNum={3}
        />
        <Location locs={activeRegions} setLocs={setActiveRegions} maxNum={5} />
      </div>
      <ButtonActive
        activation={isValid}
        onClick={() => onClickSave()}
        text="확인"
      />
    </div>
  );
}
