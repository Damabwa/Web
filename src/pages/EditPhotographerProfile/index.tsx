import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import icn_back from "../../assets/svgs/icn_back.svg";
import icn_camera from "../../assets/svgs/icn_profile_camera.svg";
import icn_profile from "../../assets/svgs/icn_profile.svg";
import SetPhotographerProfile from "../../components/SetPhotographerProfile";

export default function EditPhotographerProfile() {
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

  const onClickFunc = () => {
    navigation(`/mypage`);
  };

  return (
    <div className="relative flex flex-col px-4">
      <div className="relative flex items-center justify-center h-12 mb-6 font-semibold bg-white">
        <img
          className="absolute left-0 w-6 h-6 cursor-pointer"
          src={icn_back}
          onClick={() => navigation(-1)}
        />
        <div>프로필 수정</div>
        <div />
      </div>
      <SetPhotographerProfile isEdit={true} onClickFunc={onClickFunc} />
    </div>
  );
}
