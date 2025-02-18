import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  useEffect(() => {
    checkValidFunc();
  }, [photo, types, locs]);

  const [isValidName, setIsValidName] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState("");

  useEffect(() => {
    checkValidFunc();
  }, [tradename, isDuplicated]);

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

  const checkIsDuplicated = async () => {
    if (!isValidName) return;
    // if (role === "user") {
    await axios
      .get(
        `https://api-dev.damaba.me/api/v1/users/nicknames/existence?nickname=${tradename}`
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

  const checkValidFunc = () => {
    let count = 0;
    types.map((item) => {
      if (item.isSelected) count += 1;
    });
    if (isDuplicated === "false" && count > 0 && locs.length > 0)
      setIsValid(true);
    else setIsValid(false);
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
            onClick={() => checkIsDuplicated()}
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
