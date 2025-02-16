import { useState } from "react";
import icn_user_on from "../../../assets/svgs/icn_onboarding_model_on.svg";
import icn_user_off from "../../../assets/svgs/icn_onboarding_model_off.svg";
import icn_photographer_on from "../../../assets/svgs/icn_onboarding_photographer_on.svg";
import icn_photographer_off from "../../../assets/svgs/icn_onboarding_photographer_off.svg";

interface Props {
  setRoleFunc: (name: string) => void;
}

export default function SelectRole({ setRoleFunc }: Props) {
  const [role, setRole] = useState("");

  return (
    <div className="w-full">
      <div className="flex-col mt-20">
        <div className="mb-10 text-xl font-bold">
          어떤 회원으로 가입할 것인지
          <br />한 가지를 선택해 주세요.
        </div>
        <div
          className={`mb-5 w-full cursor-pointer rounded-[0.63rem] flex items-center py-7 px-2 ${role === "user" ? "bg-violet300" : "bg-[#F3F5F7] "}`}
          onClick={() => setRole("user")}
        >
          <img src={role === "user" ? icn_user_on : icn_user_off} />
          <div className="flex flex-col gap-[1px]">
            <div
              className={`text-lg font-bold ${role === "user" ? "text-white" : "text-black02"}`}
            >
              모델로 시작하기
            </div>
            <div
              className={`text-sm font-medium ${role === "user" ? "text-white" : "text-black04"}`}
            >
              사진 찍는 걸 좋아하는 일반인/모델이에요
            </div>
          </div>
        </div>
        <div
          className={`mb-5 w-full cursor-pointer rounded-[0.63rem] flex items-center py-7 px-2 ${role === "photographer" ? "bg-violet300" : "bg-[#F3F5F7] "}`}
          onClick={() => setRole("photographer")}
        >
          <img
            src={
              role === "photographer"
                ? icn_photographer_on
                : icn_photographer_off
            }
          />
          <div className="flex flex-col gap-[1px]">
            <div
              className={`text-lg font-bold ${role === "photographer" ? "text-white" : "text-black02"}`}
            >
              작가로 시작하기
            </div>
            <div
              className={`text-sm font-medium ${role === "photographer" ? "text-white" : "text-black04"}`}
            >
              페이/무페이로 사진을 찍어주는 사진 작가예요
            </div>
          </div>
        </div>
      </div>
      <button
        className={`absolute bottom-0 w-full h-[3.25rem] mb-4 text-white outline-none rounded-xl font-semibold ${role !== "" ? "bg-violet400" : "bg-buttonfalse cursor-default"}`}
        onClick={() => setRoleFunc(role)}
      >
        다음
      </button>
    </div>
  );
}
