import { useState } from "react";
import { logout } from "../../../hooks/logout";
import icn_next from "../../../assets/svgs/icn_next_gray.svg";
import ModalCheck from "../../../components/ModalCheck";

export default function BottomBtns() {
  const url = process.env.REACT_APP_INQUIRY_URL;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const onClickLogout = () => {
    logout();
  };

  const onClickWithdrawal = () => {
    logout();
  };

  return (
    <div className="flex flex-col gap-1 text-sm font-medium text-black02 mb-28">
      <div className="flex items-center justify-between h-12 px-4 ">
        <div className="pl-2 cursor-pointer" onClick={() => window.open(url)}>
          문의하기
        </div>
        <img className="cursor-pointer" src={icn_next} />
      </div>
      <div className="flex items-center justify-between h-12 px-4 ">
        <div
          className="pl-2 cursor-pointer"
          onClick={() => setShowLogoutModal(true)}
        >
          로그아웃
        </div>
        <img
          className="cursor-pointer"
          onClick={() => setShowLogoutModal(true)}
          src={icn_next}
        />
      </div>
      <div className="flex items-center justify-between h-12 px-4 ">
        <div
          className="pl-2 cursor-pointer"
          onClick={() => setShowWithdrawalModal(true)}
        >
          탈퇴하기
        </div>
        <img
          className="cursor-pointer"
          onClick={() => setShowWithdrawalModal(true)}
          src={icn_next}
        />
      </div>
      {showLogoutModal && (
        <ModalCheck
          title="로그아웃 하시겠습니까?"
          content={[]}
          btnMsg="확인"
          align="center"
          setShowModal={setShowLogoutModal}
          onClick={onClickLogout}
        />
      )}
      {showWithdrawalModal && (
        <ModalCheck
          title="정말 탈퇴하시겠습니까?"
          content={[
            "회원 탈퇴 시, 지금까지 저장된 정보와",
            "데이터가 삭제되어 복원되지 않습니다.",
          ]}
          btnMsg="확인"
          align="start"
          setShowModal={setShowWithdrawalModal}
          onClick={onClickWithdrawal}
        />
      )}
    </div>
  );
}
