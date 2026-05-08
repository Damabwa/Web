import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import { useLoginGuard } from "../../hooks/useLoginGuard";
import Header from "../../components/Header";
import ModalCheck from "../../components/ModalCheck";
import Bottom from "../../components/Bottom";
import logo_header from "../../assets/imgs/img_mainhome_header_logo.png";
import icn_mypage from "../../assets/svgs/icn_mainhome_mypage.svg";
import icn_search from "../../assets/svgs/icn_search_white.svg";
import BannerBox from "./BannerBox";
import EventBox from "./EventBox";
import PhotographerBox from "./PhotographerBox";

function MainHome() {
  const navigate = useNavigate();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { showLoginModal, requireLogin, loginModalProps } = useLoginGuard();

  useEffect(() => {
    const showLoginPopupFunc = () => {
      if (
        !localStorage.getItem("accessToken") &&
        !sessionStorage.getItem("hasVisited")
      ) {
        setIsLoginPopupOpen(true);
        sessionStorage.setItem("hasVisited", "true");
        return true;
      }
    };

    const getUserInfoFunc = async () => {
      if (showLoginPopupFunc()) return;
      else if (localStorage.getItem("accessToken")) {
        try {
          await getUserInfo();
        } catch (e) {
        } finally {
          showLoginPopupFunc();
        }
      }
    };

    getUserInfoFunc();
  }, []);

  const handleMyPageClick = () => {
    requireLogin(() => navigate(`/mypage`));
  };

  return (
    <div className="w-full">
      <div className="h-12">
        <Header
          main={null}
          left={
            <img
              className="w-[4.75rem] cursor-pointer ml-4"
              onClick={() => navigate(`/`)}
              src={logo_header}
              alt="담아봐"
            />
          }
          right={
            <div className="flex items-center gap-2">
              <img src={icn_search} alt="검색" onClick={() => navigate(`/search`)} />
              <img
                className="mr-4"
                src={icn_mypage}
                alt="마이페이지"
                onClick={() => handleMyPageClick()}
              />
            </div>
          }
        />
      </div>
      <div className="w-full px-4 pt-3">
        <BannerBox />
      </div>
      <div className="border-b-8 border-gray50">
        <EventBox />
      </div>
      <PhotographerBox />
      <Bottom />
      {isLoginPopupOpen && (
        <ModalCheck
          title={[
            "우측 상단 [마이페이지] 버튼을 통해",
            "회원가입/로그인 하실 수 있습니다.",
          ]}
          content={[]}
          btnMsg="회원가입/로그인"
          align="start"
          setShowModal={setIsLoginPopupOpen}
          onClick={() => navigate(`/login`)}
        />
      )}
      {showLoginModal && <ModalCheck {...loginModalProps} />}
    </div>
  );
}

export default MainHome;
