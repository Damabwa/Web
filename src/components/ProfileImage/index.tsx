import { useRef } from "react";
import { onImageHandler } from "../../hooks/onImageHandler";
import icn_profile from "../../assets/svgs/icn_profile.svg";
import icn_camera from "../../assets/svgs/icn_profile_camera_white.svg";

interface Props {
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProfileImage({ userInfo, setUserInfo }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const image = await onImageHandler(file, "USER_PROFILE_IMAGE");
      if (image)
        setUserInfo({
          ...userInfo,
          profileImage: image,
        });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-medium ">
        <span className="text-red">*</span>
        <span>프로필(대표)사진</span>
      </div>
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
        {userInfo.profileImage.url ? (
          <img
            className="object-cover w-[5.25rem] h-[5.25rem] rounded-full border-2 border-darkgray"
            src={userInfo.profileImage.url}
          />
        ) : (
          <img src={icn_profile} />
        )}
        <div className="absolute bottom-0 right-0 p-1 rounded-full bg-darkgray w-fit">
          <img src={icn_camera} />
        </div>
      </div>
    </div>
  );
}
