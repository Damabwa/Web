import { useRef, useState } from "react";
import icn_camera from "../../assets/svgs/icn_profile_camera.svg";
import icn_delete from "../../assets/svgs/btn_delete_porfolio_ellipse.svg";

interface Props {
  isRequired: boolean;
  title: string;
  description: string;
  maxLength: number;
}

export default function GetImagesBox({
  isRequired,
  title,
  description,
  maxLength,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleImageClick = () => {
    if (photos.length === 10) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevItem) => [reader.result as string, ...prevItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </div>
      <div className="flex flex-col w-full gap-8 text-sm font-medium">
        <div className="flex flex-col w-full">
          <div className="font-medium">
            {isRequired && <span className="text-red mr-[0.12rem]">*</span>}
            <span>{title}</span>
            {description !== "" && (
              <span className="text-xs text-black03 pl-[0.38rem]">
                {description}
              </span>
            )}
          </div>
          <div className="flex gap-3 pt-3 overflow-scroll w-fit">
            <div
              className="cursor-pointer  min-w-[4.75rem] min-h-[4.75rem] border-black04 rounded-[0.63rem] border  items-center justify-center  flex flex-col text-black03 text-xs"
              onClick={() => handleImageClick()}
            >
              <img className="w-[1.8125rem] h-[1.8125rem]" src={icn_camera} />
              <div className="">
                {photos.length}/{maxLength}
              </div>
            </div>
            {photos.map((item, index) => (
              <div
                className={`relative min-w-fit ${index === photos.length - 1 && "mr-6"}`}
              >
                <img
                  className="absolute right-[-0.75rem] top-[-0.75rem] cursor-pointer z-50"
                  src={icn_delete}
                  onClick={() =>
                    setPhotos((prev) => prev.filter((photo) => photo !== item))
                  }
                />
                <img
                  className="object-cover w-[4.75rem] h-[4.75rem] border-black04 rounded-[0.63rem] border"
                  src={item}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
