import img_logo from "../../assets/svgs/img_onboarding_logo.svg";
import img_dialogue from "../../assets/svgs/img_onboarding_dialogue.svg";
import img_kakao_login from "../../assets/imgs/img_login_kakao.png";

export default function Login() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_JS_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="flex flex-col items-center w-full h-screen px-4 bg-violet300">
      <div className="flex flex-col justify-center flex-1 gap-3">
        <img src={img_logo} />
        <div className="font-semibold text-center text-white">
          여러분의 아름다운 '지금'을 담아보세요
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-3 mb-10">
        <img src={img_dialogue} />
        <img
          className="w-full cursor-pointer"
          src={img_kakao_login}
          alt="카카오 로그인"
          onClick={handleLogin}
        />
      </div>
      <div className="flex justify-center gap-6 mb-10 text-sm text-white outline-none">
        <button>개인정보처리방침</button>
        <button>이용약관</button>
      </div>
    </div>
  );
}
