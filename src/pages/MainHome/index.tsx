import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ModalCheck from "../../components/ModalCheck";
import logo_header from "../../assets/imgs/img_mainhome_header_logo.png";
import icn_mypage from "../../assets/svgs/icn_mainhome_mypage.svg";
import BannerBox from "./BannerBox";
import EventBox from "./EventBox";
import PhotographerBox from "./PhotographerBox";

function MainHome() {
  const navigation = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onClickMyPage = () => {
    if (!localStorage.getItem("accessToken")) setShowLoginModal(true);
    else navigation(`/mypage`);
  };

  return (
    <div className="w-full">
      <div className="h-12">
        <Header
          main={
            <img
              className="w-[5.5rem] cursor-pointer"
              onClick={() => navigation(`/`)}
              src={logo_header}
            />
          }
          left={null}
          right={
            <img
              className="px-2"
              src={icn_mypage}
              onClick={() => onClickMyPage()}
            />
          }
        />
      </div>
      <div className="w-full px-4 pt-3">
        <BannerBox />
      </div>
      <div className="border-b-8 border-lightgray">
        <EventBox />
      </div>
      <PhotographerBox />
      <div className="w-full bg-lightgray h-28" />
      {showLoginModal && (
        <ModalCheck
          title="로그인이 필요한 서비스입니다."
          content={[
            "이 기능은 로그인 후 이용하실 수 있습니다.",
            "로그인 페이지로 이동하시겠습니까?",
          ]}
          btnMsg="로그인 하기"
          align="start"
          setShowModal={setShowLoginModal}
          onClick={() => navigation(`/login`)}
        />
      )}
    </div>
  );
}

export default MainHome;
