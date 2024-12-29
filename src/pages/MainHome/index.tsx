import Header from "../../components/Header";
import EventBox from "./EventBox";
import logo_header from "../../assets/imgs/img_mainhome_header_logo.png";
import icn_mypage from "../../assets/svgs/icn_mainhome_mypage.svg";

function MainHome() {
  return (
    <div className="w-full">
      <div className="h-12">
        <Header
          main={<img className="w-[5.5rem]" src={logo_header} />}
          left={null}
          right={<img className="px-2" src={icn_mypage} />}
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="h-32 cursor-pointer bg-lightgray"></div>
      </div>
      <div className="border-b-8 border-lightgray">
        <EventBox />
      </div>
    </div>
  );
}

export default MainHome;
