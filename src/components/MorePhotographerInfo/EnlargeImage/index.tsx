import icn_close from "../../../assets/svgs/icn_close_white.svg";

interface Props {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}
export default function EnlargeImage({
  selectedImage,
  setSelectedImage,
}: Props) {
  return (
    <div className="relative w-full h-full bg-[#000] flex justify-center items-center">
      <img className="object-contain w-full max-h-screen" src={selectedImage} />
      <img
        className="absolute top-0 right-0 p-4 cursor-pointer"
        src={icn_close}
        onClick={() => setSelectedImage("")}
      />
    </div>
  );
}
