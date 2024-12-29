import { useNavigate } from "react-router-dom";
import icn_next from "../../../assets/svgs/icn_next.svg";

export default function PhotographerBox() {
  const navigation = useNavigate();
  const mockdata = [
    {
      image: "",
      name: "담아봐작가담아봐작가담아봐작가",
      types: ["프로필"],
    },
    {
      image: "",
      name: "담아봐작가2",
      types: ["프로필", "컨셉"],
    },
    {
      image: "",
      name: "담아봐작가3",
      types: ["스냅", "프로필"],
    },
    {
      image: "",
      name: "담아봐작가4",
      types: ["스냅", "프로필"],
    },
  ];

  const navigatePhotographers = () => {
    navigation("/photographers");
  };

  const handleTextLength = (name: string) => {
    if (name.length < 8) return name;
    return `${name.slice(0, 8)}...`;
  };

  return (
    <div className="flex flex-col pt-5 pb-10">
      <div
        className="flex flex-col px-4 pb-5 cursor-pointer"
        onClick={() => navigatePhotographers()}
      >
        <span className="text-lg font-bold">작가님을 담아봐!</span>
        <div className="flex justify-between items-center text-sm">
          <span>지역의 사진관, 스냅 작가</span>
          <div className="flex text-xs">
            <button>전체보기</button>
            <img className="w-4 h-4" alt=">" src={icn_next} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 px-4">
        {mockdata.map((item) => (
          <div
            key={item.name}
            className="flex flex-col cursor-pointer justify-end bg-gray rounded-xl h-48 text-white"
          >
            <div className="p-3">
              <div className="font-semibold">{handleTextLength(item.name)}</div>
              <div className="flex gap-1 items-center text-xs">
                {item.types.map((type, index) => (
                  <div key={index}>
                    {type}
                    {index + 1 !== item.types.length && <>,</>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
