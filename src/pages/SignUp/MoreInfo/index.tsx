import { useEffect, useState } from "react";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import ProfileImage from "../../../components/ProfileImage";
import Types from "../../../components/Types";
import Location from "../../../components/Location";
import ButtonActive from "../../../components/ButtonActive";

interface Props {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
  onClickFunc: () => void;
}

export default function MoreInfo({
  userInfo,
  setUserInfo,
  onClickFunc,
}: Props) {
  const [profileImage, setProfileImage] = useState();
  const [mainPhotographyTypes, setMainPhotographyTypes] = useState<string[]>(
    []
  );
  const [locs, setLocs] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    checkValidFunc();
  }, [profileImage, mainPhotographyTypes, locs]);

  const checkValidFunc = () => {
    if (profileImage && mainPhotographyTypes.length > 0 && locs.length > 0)
      setIsValid(true);
    else setIsValid(false);
  };

  const onClickHandler = () => {
    const regions = locs.map((l) => {
      const [category, name] = l.split(" ");
      return { category, name };
    });
    setUserInfo({
      ...userInfo,
      profileImage: { name: "apple.jpg", url: base64ToBlobUrl(profileImage) },
      mainPhotographyTypes,
      activeRegions: regions,
    });
    onClickFunc();
  };

  function base64ToBlobUrl(base64: any) {
    const parts = base64.split(",");
    const mimeType = parts[0].match(/:(.*?);/)[1];
    const byteCharacters = atob(parts[1]);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    return URL.createObjectURL(blob).slice(5);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="w-full pb-5 text-xl font-bold">
        작가 정보를 입력해주세요
      </div>
      <div className="flex flex-col gap-8 mb-20">
        <ProfileImage photo={profileImage} setPhoto={setProfileImage} />
        <Types
          types={mainPhotographyTypes}
          setTypes={setMainPhotographyTypes}
          maxNum={3}
        />
        <Location locs={locs} setLocs={setLocs} maxNum={5} />
      </div>
      <ButtonActive
        activation={isValid}
        onClick={() => {
          if (isValid) onClickHandler();
        }}
        text="다음"
      />
    </div>
  );
}
