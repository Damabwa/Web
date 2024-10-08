import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back.svg";
import icn_search_white from "../../assets/svgs/icn_search_white.svg";
import Header from "../../components/Header";
import NavigationBar from "../../components/NavigationBar";
import ContentBox from "../../components/ContentBox";
import FilterBar from "../../components/FilterBar";
function EventHome() {
  const mockdata = [
    {
      images: ["", "", ""],
      title: "이벤트1",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 100,
    },
    {
      images: ["", "", ""],
      title: "이벤트2",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 30,
    },
    {
      images: ["", "", ""],
      title: "이벤트3",
      name: "사진 업체 상호",
      tags: ["서울", "개인", "올림픽 공원"],
      period: "08.29 - 08.30",
      location: "경기도 수원시 영통구 월드컵로 206",
      clipCount: 20,
    },
    {
      images: ["", "", ""],
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
    <div>
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
          right={
            <img
              className="cursor-pointer"
              alt="search"
              src={icn_search_white}
              onClick={() => {
                navigation("/");
              }}
            />
          }
        />
      </div>
      <div className="fixed z-20 h-16 bg-white top-12 w-96 shadow-bottom-only">
        <FilterBar />
      </div>
      <div className="flex flex-col gap-1 mt-16 bg-gray">
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
