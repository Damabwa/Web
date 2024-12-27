import { useRef } from "react";
import icn_profile from "../../../../assets/svgs/icn_profile.svg";
import icn_camera from "../../../../assets/svgs/icn_profile_camera.svg";

interface Props {
  photo: any;
  setPhoto: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProfileImage({ photo, setPhoto }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        {photo ? (
          <img
            className="object-contain w-[5.25rem] h-[5.25rem] rounded-full border-2 border-[#A7A8AA]"
            src={photo}
          />
        ) : (
          <img src={icn_profile} />
        )}
        <div className="bg-[#A7A8AA] w-fit p-1 rounded-full absolute bottom-0 right-0">
          <img src={icn_camera} />
        </div>
      </div>
    </div>
  );
}
