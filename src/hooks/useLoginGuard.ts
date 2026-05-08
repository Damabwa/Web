import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenStore } from "../utils/tokenStore";

interface UseLoginGuardReturn {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  requireLogin: (onAuthorized: () => void) => void;
  loginModalProps: {
    title: string[];
    content: string[];
    btnMsg: string;
    align: "start" | "center" | "end";
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: () => void;
  };
}

export function useLoginGuard(): UseLoginGuardReturn {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const requireLogin = (onAuthorized: () => void) => {
    if (!tokenStore.getAccessToken()) {
      setShowLoginModal(true);
      return;
    }
    onAuthorized();
  };

  const loginModalProps = {
    title: ["로그인이 필요한 서비스입니다."],
    content: [
      "이 기능은 로그인 후 이용하실 수 있습니다.",
      "로그인 페이지로 이동하시겠습니까?",
    ],
    btnMsg: "로그인 하기",
    align: "start" as const,
    setShowModal: setShowLoginModal,
    onClick: () => navigate("/login"),
  };

  return { showLoginModal, setShowLoginModal, requireLogin, loginModalProps };
}
