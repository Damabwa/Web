import { useRef, useState } from "react";
import { upLoadFile } from "../../api/file";
import icn_camera from "../../assets/svgs/icn_profile_camera.svg";
import icn_delete from "../../assets/svgs/btn_delete_porfolio_ellipse.svg";
import ModalComfirm from "../ModalComfirm";

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
  const [showSizeModal, setShowSizeModal] = useState(false);

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
    const file = event.target.files?.[0];
    if (file) {
      const image = await uploadFileFunc(file);
      if (image) setImages([...images, image]);
    }
  };

  const uploadFileFunc = async (file: any) => {
    const formData = new FormData();
    formData.append("fileType", fileType);
    formData.append("files", file);
    try {
      const res = await upLoadFile(formData);
      return res.files[0];
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 413) {
        setShowSizeModal(true);
      }
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
                {images.length}/{maxLength}
              </div>
            </div>
            {images.map((item, index) => (
              <div
                key={item.url}
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
      <div className="ml-[-1rem]">
        {showSizeModal && (
          <ModalComfirm
            content={["최대 3MB까지 등록 가능합니다."]}
            setShowModal={setShowSizeModal}
          />
        )}
      </div>
    </div>
  );
}
