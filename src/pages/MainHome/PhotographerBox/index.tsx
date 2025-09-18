import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPhotographerList } from "../../../api/photographer";
import { getPhotoType } from "../../../hooks/getKorean";
import icn_next from "../../../assets/svgs/icn_next.svg";

export default function PhotographerBox() {
  const navigation = useNavigate();

  const [photographers, setPhotographers] = useState<any>([]);

  useEffect(() => {
    getPhotographerListFunc();
  }, []);

  const getPhotographerListFunc = async () => {
    try {
      const res = await getPhotographerList("page=0&pageSize=4");
      setPhotographers(res.items);
    } catch (e) {
      console.log(e);
    }
  };

  const navigatePhotographers = () => {
    navigation("/photographers");
  };

  const handleTextLength = (name: string) => {
    if (name.length < 8) return name;
    return `${name.slice(0, 8)}...`;
  };

  const onClickPhotographer = (id: number) => {
    navigation(`/photographer/${id}`);
  };

  return (
    <div className="flex flex-col pt-5 pb-10">
      <div
        className="flex flex-col px-4 pb-5 cursor-pointer"
        onClick={() => navigatePhotographers()}
      >
        <span className="text-lg font-bold">작가님을 만나봐!</span>
        <div className="flex items-center justify-between text-sm">
          <span>지역의 사진관, 스냅 작가</span>
          <div className="flex text-xs">
            <button>전체보기</button>
            <img className="w-4 h-4" alt=">" src={icn_next} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 px-4">
        {photographers.map((item: any) => (
          <div
            key={item.nickname}
            className="relative flex flex-col justify-end h-48 overflow-hidden text-white cursor-pointer bg-gray rounded-xl"
          >
            <div
              className="absolute top-0 left-0 z-0 w-full h-full"
              onClick={() => onClickPhotographer(item.id)}
            >
              <div className="relative inline-block w-full h-full overflow-hidden rounded-xl">
                <img
                  src={item.profileImage.url}
                  alt={item.profileImage.name}
                  className="block object-cover min-w-full min-h-full"
                />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.25)] pointer-events-none" />
              </div>
            </div>
            <div className="z-10 p-3">
              <div className="font-semibold">
                {handleTextLength(item.nickname)}
              </div>
              <div className="flex items-center gap-1 text-xs">
                {item.mainPhotographyTypes.map(
                  (type: string, index: number) => (
                    <div key={index}>
                      {getPhotoType(type)}
                      {index + 1 !== item.mainPhotographyTypes.length && <>,</>}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
