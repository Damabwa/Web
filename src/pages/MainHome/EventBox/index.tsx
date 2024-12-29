import { useNavigate } from "react-router-dom";
import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_camera from "../../../assets/svgs/icn_camera.svg";
import icn_clock from "../../../assets/svgs/icn_clock.svg";

export default function EventBox() {
  const mockdata = [
    {
      image: "",
      name: "이벤트1",
      types: ["스냅"],
      endDate: "20241229",
    },
    {
      image: "",
      name: "이벤트2",
      types: ["스냅", "프로필"],
      endDate: "20241230",
    },
    {
      image: "",
      name: "이벤트3",
      types: ["스냅", "프로필"],
      endDate: "20241230",
    },
    {
      image: "",
      name: "이벤트4",
      types: ["스냅", "프로필"],
      endDate: "20241231",
    },
    {
      image: "",
      name: "이벤트5",
      types: ["스냅", "프로필"],
      endDate: "20241231",
    },
  ];

  const navigation = useNavigate();

  const navigateEvent = () => {
    navigation("/events");
  };

  return (
    <div className="flex flex-col py-5">
      <div
        className="flex flex-col px-4 pb-5 cursor-pointer"
        onClick={() => navigateEvent()}
      >
        <span className="text-lg font-bold">Event로담아봐!</span>
        <div className="flex justify-between items-center text-sm">
          <span>현재 진행 중인 사진 이벤트</span>
          <div className="flex text-xs">
            <button>전체보기</button>
            <img className="w-4 h-4" alt=">" src={icn_next} />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3 px-4 overflow-x-auto">
        {mockdata.map((item) => (
          <div key={item.name} className="flex flex-col gap-2 cursor-pointer">
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-lightgray" />
            <div className="flex flex-col text-xs font-medium text-black02">
              <div className="mb-1 text-sm font-semibold text-black">
                {item.name}
              </div>
              <div className="flex items-center">
                <div className=" flex items-center justify-center w-4 h-4">
                  <img src={icn_camera} />
                </div>
                <div className="flex gap-1 items-center">
                  {item.types.map((type, index) => (
                    <div key={index}>
                      {type}
                      {index + 1 !== item.types.length && <>,</>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className=" flex items-center justify-center w-4 h-4">
                  <img src={icn_clock} />
                </div>
                마감까지 D-3
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
