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
      fileInputRef.current.click(); // 파일 입력 요소를 클릭
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택된 파일 가져오기
    if (file) {
      const reader = new FileReader(); // FileReader를 사용해 파일 읽기
      reader.onloadend = () => {
        setPhoto(reader.result as string); // 이미지 데이터를 상태에 저장
      };
      reader.readAsDataURL(file); // 파일을 Base64 URL로 변환
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
            className="object-contain w-[5.25rem] h-[5.25rem] rounded-full border border-black border-opacity-15"
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
