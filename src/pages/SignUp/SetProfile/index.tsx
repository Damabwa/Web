import { useNavigate } from "react-router-dom";
import icn_back from "../../../assets/svgs/icn_back.svg";

export default function SetProfile() {
  const navigation = useNavigate();
  return (
    <div className="w-full">
      <div className="w-full">
        <img
          className="w-8 cursor-pointer"
          alt="<"
          src={icn_back}
          onClick={() => navigation("/login")}
        />
      </div>
      <div className="w-full px-8 pt-12 text-lg font-medium text-start">
        프로필을 완성해 주세요!
      </div>
      <div className="flex flex-col justify-around gap-12 px-8 py-8 mb-12">
        <div className="flex flex-col gap-2">
          <span className="">1. 닉네임</span>
          <div className="flex items-center gap-2">
            <input className="border-none rounded-lg outline-none bg-gray " />
            <button className="px-3 py-1 text-xs border rounded-lg whitespace-nowrap">
              중복 확인
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="">2. 성별</span>
          <div className="flex items-center gap-2">
            <button className="">여성</button>/
            <button className="">남성</button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="">3. 나이</span>
          <div className="flex items-center gap-1">
            <input className="w-12 border-b outline-none" />세
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="">4. 인스타그램 아이디 (선택)</span>
          <div className="flex items-center gap-1">
            @<input className="w-24 border-b outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
