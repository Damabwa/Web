import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back_white.svg";
import Header from "../../components/Header";
import FilterBar from "./FilterBar";
import ContentBox from "./ContentBox";

function EventHome() {
  const mockdata = [
    {
      id: 0,
      images: ["", "", "", ""],
      title: "이벤트1",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      endDate: "2024-12-30",
      location: ["서울 강동구", "서울 강서구", "서울 강북구"],
      clipCount: 100,
    },
    {
      id: 1,
      images: ["", "", "", ""],
      title: "이벤트2",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      endDate: "2024-12-27",
      location: ["서울 강동구", "서울 강서구", "서울 강북구"],
      clipCount: 40,
    },
    {
      id: 2,
      images: ["", "", "", ""],
      title: "이벤트3",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      endDate: "2024-12-28",
      location: ["서울 강동구", "서울 강서구", "서울 강북구"],
      clipCount: 30,
    },
    {
      id: 3,
      images: ["", "", "", ""],
      title: "이벤트4",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      endDate: "2024-12-29",
      location: ["서울 강동구", "서울 강서구", "서울 강북구"],
      clipCount: 20,
    },
    {
      id: 4,
      images: ["", "", "", ""],
      title: "이벤트5",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      endDate: "2024-12-30",
      location: ["서울 강동구", "서울 강서구", "서울 강북구"],
      clipCount: 10,
    },
  ];

  const navigation = useNavigate();

  return (
    <div className="w-full">
      <div className="h-12">
        <Header
          main={
            <div className="font-semibold text-white cursor-pointer">
              Event로 담아봐
            </div>
          }
          left={
            <img
              className="px-4 cursor-pointer"
              alt="<"
              src={icn_back}
              onClick={() => {
                navigation(-1);
              }}
            />
          }
          right={null}
        />
      </div>
      <div className="border-b-[0.375rem] border-lightgray">
        <FilterBar />
      </div>
      <div className="flex flex-col gap-1 bg-lightgray">
        {mockdata.map((item) => (
          <div key={item.id} className="bg-white">
            <ContentBox data={item} />
          </div>
        ))}
        <div className="w-full h-20 bg-white" />
      </div>
    </div>
  );
}

export default EventHome;
