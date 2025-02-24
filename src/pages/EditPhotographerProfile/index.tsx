import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkPhotographerExistence } from "../../api/photographer";
import SubHeader from "../../components/SubHeader";
import ProfileImage from "../../components/ProfileImage";
import Types from "../../components/Types";
import Location from "../../components/Location";
import ButtonActive from "../../components/ButtonActive";
import InputButtonBox from "../../components/InputButtonBox";

interface Item {
  id: number;
  name: string;
  isSelected: boolean;
}
export default function EditPhotographerProfile() {
  const navigation = useNavigate();
  const [photo, setPhoto] = useState();
  const [tradename, setTradename] = useState("");
  const [types, setTypes] = useState<Item[]>([]);
  const [locs, setLocs] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState("");

  useEffect(() => {
    checkValidFunc();
  }, [tradename, isDuplicated, photo, types, locs]);

  const handleNameInput = (e: any) => {
    setIsDuplicated("");
    setTradename(e.target.value);

    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
    setIsValidName(
      e.target.value.length > 1 &&
        e.target.value.length < 16 &&
        nicknameRegex.test(e.target.value)
    );
  };

  const checkValidFunc = () => {
    let count = 0;
    types.map((item) => {
      if (item.isSelected) count += 1;
    });
    if (isDuplicated === "false" && count > 0 && locs.length > 0)
      setIsValid(true);
    else setIsValid(false);
  };

  const checkExistenceFunc = async () => {
    if (!isValidName) return;
    try {
      const res = await checkPhotographerExistence(tradename);
      if (res.exists) setIsDuplicated("true");
      else setIsDuplicated("false");
    } catch (e) {
      console.log(e);
    }
  };

  const onClickFunc = () => {
    navigation(`/mypage`);
  };

  return (
    <div className="relative flex flex-col gap-6 px-4">
      <SubHeader title="프로필 수정" />
      <div className="flex flex-col gap-8 mb-20">
        <ProfileImage photo={photo} setPhoto={setPhoto} />
        <div>
          <InputButtonBox
            isRequired={true}
            title="상호/활동명"
            description=""
            placeholder="상호명을 입력해주세요."
            onChange={handleNameInput}
            onClick={() => checkExistenceFunc()}
            activation={isValidName}
            buttonTitle="중복 확인"
            bottomText="한글, 영어, 숫자 조합 15자 이내"
            value={tradename}
          />
          {isDuplicated === "" ? (
            <div className="text-xs text-red">
              {!isValidName &&
                tradename.length > 0 &&
                "한글, 영어, 숫자 조합 2-7자만 가능해요."}
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
        <Types types={types} setTypes={setTypes} maxNum={3} />
        <Location locs={locs} setLocs={setLocs} maxNum={5} />
      </div>
      <ButtonActive
        activation={isValid}
        onClick={() => {
          if (isValid) onClickFunc();
        }}
        text="확인"
      />
    </div>
  );
}
