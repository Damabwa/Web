import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import EventBox from "./EventBox";
import Posts from "./Posts";

function MainHome() {
  return (
    <div>
      <Header title="Damaba" left={null} right={null} />
      <div className="flex flex-col w-full px-4 pt-3">
        <div className="mb-3 ">
          <SearchBar />
        </div>
        <div className="h-24 cursor-pointer bg-gray mb-7"></div>
      </div>
      <div className="flex flex-col w-full pl-4">
        <div className="mb-9">
          <EventBox
            title="Event로 담아봐!"
            subTitle="현재 진행 중인 사진 이벤트"
          />
        </div>
        <div className="mb-9">
          <EventBox title="Model이 되어봐!" subTitle="상호 무페이 작업들" />
        </div>
      </div>
      <div className="flex flex-col w-full px-4">
        <div className="mb-9">
          <Posts
            title="Hot 인기 게시글"
            subTitle="현재 진행 중인 사진 이벤트"
          />
        </div>
        <div className="mb-9">
          <Posts title="최신 게시글" subTitle="상호 무페이 작업들" />
        </div>
      </div>
    </div>
  );
}

export default MainHome;
