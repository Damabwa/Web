import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_camera from "../../../assets/svgs/icn_camera.svg";
import icn_calendar from "../../../assets/svgs/icn_calendar.svg";

interface Props {
  title: string;
  subTitle: string;
}

export default function EventBox({ title, subTitle }: Props) {
  const mockdata = [
    {
      image: "",
      name: "이벤트 이름",
      sub1: "스냅 사진",
      period: "08.29 - 08.30",
    },
    {
      image: "",
      name: "이벤트 이름",
      sub1: "스냅 사진",
      period: "08.29 - 08.30",
    },
    {
      image: "",
      name: "이벤트 이름",
      sub1: "스냅 사진",
      period: "08.29 - 08.30",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between pr-4 mb-3">
        <div className="flex flex-col font-pre">
          <span className="text-xl font-bold cursor-pointer">{title}</span>
          <span className="text-xs cursor-pointer">{subTitle}</span>
        </div>
        <div className="flex items-center cursor-pointer">
          <button className="text-[0.625rem] font-medium">전체보기</button>
          <img className="w-3 h-3" alt=">" src={icn_next} />
        </div>
      </div>
      <div className="flex gap-3">
        {mockdata.map((item) => (
          <div className="flex flex-col gap-2 cursor-pointer">
            {/* <img alt="image" src={}/> */}
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-gray" />
            <div className="flex flex-col font-pre text-[0.625rem] font-medium text-black02">
              <div className="mb-1 text-sm font-semibold text-black">
                {item.name}
              </div>
              <div className="flex items-center gap-1">
                <img className="w-3 h-3" alt="" src={icn_camera} />
                {item.sub1}
              </div>
              <div className="flex items-center gap-1">
                <img className="w-3 h-3" alt="" src={icn_calendar} />
                {item.period}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
