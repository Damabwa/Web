import { useRef, useState } from "react";
import { onImageHandler } from "../../hooks/onImageHandler";
import icn_camera from "../../assets/svgs/icn_profile_camera.svg";
import icn_delete from "../../assets/svgs/btn_delete_porfolio_ellipse.svg";
import Loading from "../Loading";

interface Props {
  isRequired: boolean;
  title: string;
  description: string;
  maxLength: number;
  images: any[];
  fileType: string;
  setImages: React.Dispatch<React.SetStateAction<any[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GetImagesBox({
  isRequired,
  title,
  description,
  maxLength,
  images,
  fileType,
  setImages,
  setShowModal,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageClick = () => {
    if (images.length === 10) {
      setShowModal(true);
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    else if (images.length + files.length > 10) {
      setShowModal(true);
      return;
    }
    setLoading(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const image = await onImageHandler(files[i], fileType);
      if (image) newImages.push(image);
    }

    setImages([...images, ...newImages]);
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          className="hidden"
          type="file"
          accept="image/*"
          multiple
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
                {images.length}/{maxLength}
              </div>
            </div>
            {images.map((item, index) => (
              <div
                key={index}
                className={`relative min-w-fit ${index === images.length - 1 && "mr-6"}`}
              >
                <img
                  className="absolute right-[-0.75rem] top-[-0.75rem] cursor-pointer"
                  src={icn_delete}
                  onClick={() =>
                    setImages((prev) =>
                      prev.filter((image) => image.url !== item.url)
                    )
                  }
                />
                <img
                  className="object-cover w-[4.75rem] h-[4.75rem] border-lineRegular rounded-[0.63rem] border"
                  src={item.url}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Loading isLoading={loading} />
    </div>
  );
}
