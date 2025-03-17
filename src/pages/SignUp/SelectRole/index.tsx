import { useState } from "react";
import icn_user_on from "../../../assets/svgs/icn_onboarding_model_on.svg";
import icn_user_off from "../../../assets/svgs/icn_onboarding_model_off.svg";
import icn_photographer_on from "../../../assets/svgs/icn_onboarding_photographer_on.svg";
import icn_photographer_off from "../../../assets/svgs/icn_onboarding_photographer_off.svg";
import ButtonActive from "../../../components/ButtonActive";

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
          className={`mb-5 w-full cursor-pointer rounded-[0.63rem] flex items-center py-7 px-2 ${role === "user" ? "bg-violet300" : "bg-gray50"}`}
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
          className={`mb-5 w-full cursor-pointer rounded-[0.63rem] flex items-center py-7 px-2 ${role === "photographer" ? "bg-violet300" : "bg-gray50 "}`}
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
              활동 중인 사진작가, 사진관 대표예요
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <ButtonActive
          activation={role !== ""}
          onClick={() => setRoleFunc(role)}
          text="다음"
        />
      </div>
    </div>
  );
}
