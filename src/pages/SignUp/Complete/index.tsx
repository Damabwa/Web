import { useNavigate } from "react-router-dom";
import logo_damaba from "../../../assets/imgs/logo_damaba.png";
import img_complete from "../../../assets/svgs/img_completeSignup.svg";

interface Props {
  username: string;
  role: string;
}
export default function Complete({ username, role }: Props) {
  const navigation = useNavigate();

  const getPhotographerName = (name: string) => {
    if (name.length > 10) return `${name.slice(0, 10)}... `;
    else return name;
  };

  const getMessage = (isUser: boolean) => {
    if (isUser)
      return (
        <div className="flex flex-col gap-3 mb-20 text-center text-black02">
          <div>
            이제 담아봐에서 <br />
            인생의 소중한 순간을
            <br />
            더욱 자유롭게 사진으로 담아보세요.
          </div>
          <div className="font-semibold text-violet300">
            당신의 리즈는 바로 지금입니다.
          </div>
          <div className="pt-4">From. 사진에 관한 모든 것, 담아봐</div>
        </div>
      );
    else
      return (
        <div className="flex flex-col gap-3 mb-20 text-center text-black02">
          <div>
            작가님을 소개하고 <br />
            작가님의 감각적인 사진으로 기록해 줄
            <br />더 많은 고객님들을 만나보세요.
          </div>
          <div className="font-semibold">
            <span className="text-violet300">
              담아봐는 작가님의 든든한 파트너
            </span>
            가 되겠습니다!
          </div>
          <div className="pt-4">From. 사진에 관한 모든 것, 담아봐</div>
        </div>
      );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="flex flex-col items-center justify-center h-[80%] w-full gap-6">
        <div className="text-2xl font-bold">
          {getPhotographerName(username)}
          {role === "photographer" && " 작가"}님,
          {username.length > 10 && <br />} 환영합니다!
        </div>
        <img src={img_complete} />
        {getMessage(role === "user")}
      </div>
      <div className="flex-grow" />
      <div className="absolute bottom-0 flex flex-col items-center w-full">
        {role === "photographer" && (
          <button className="mb-3 text-sm border-b text-black02 border-black02">
            작가 프로필 입력하러 바로가기
          </button>
        )}
        <button
          className="w-full mb-4 h-[3.25rem] font-semibold text-white outline-none rounded-xl bg-violet400"
          onClick={() => navigation("/")}
        >
          홈으로 이동하기
        </button>
      </div>
    </div>
  );
}
