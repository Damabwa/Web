import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back_white.svg";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import FilterBar from "../../components/FilterBar";
import ContentBox from "../../components/ContentBox";

function EventHome() {
  const mockdata = [
    {
      images: ["", "", "", ""],
      title: "이벤트1",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 100,
    },
    {
      images: ["", "", "", ""],
      title: "이벤트2",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 30,
    },
    {
      images: ["", "", "", ""],
      title: "이벤트3",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 20,
    },
    {
      images: ["", "", "", ""],
      title: "이벤트4",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 10,
    },
  ];

  const navigation = useNavigate();

  return (
    <div className="w-full">
      <div className="h-12">
        <Header
          title="Event로 담아봐"
          left={
            <img
              className="cursor-pointer"
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
      <div className="flex flex-col gap-1 mt-28 bg-lightgray">
        {mockdata.map((item) => (
          <div key={item.title} className="bg-white">
            <ContentBox data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventHome;
