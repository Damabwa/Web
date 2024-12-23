import { useNavigate } from "react-router-dom";

interface Props {
  username: string;
}
export default function Complete({ username }: Props) {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <div className="w-full pb-20 text-xl font-bold">
        {username}
        님,
        <br />
        환영합니다!
      </div>
      <div className="flex flex-col gap-4 font-medium">
        <div>이제 담아봐에서,</div>
        <div>
          인생의 소중한 순간을
          <br />
          더욱 자유롭게 사진으로 담아보세요 :)
        </div>
        <div>당신의 리즈는 바로 지금입니다.</div>
        <div>
          From.
          <br />
          사진에 관한 모든 것, 담아봐
        </div>
      </div>
      <button
        className="absolute bottom-0 w-full py-3 mb-4 font-semibold text-white outline-none rounded-xl bg-violet400"
        onClick={() => navigation("/")}
      >
        홈으로 이동하기
      </button>
    </div>
  );
}
