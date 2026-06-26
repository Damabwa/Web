import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../atom/atom";
import { createUser } from "../../api/user";
import { createPhotographer } from "../../api/photographer";
import SelectRole from "./SelectRole";
import SetProfile from "./SetProfile";
import Route from "./Route";
import Terms from "./Terms";
import MoreInfo from "./MoreInfo";

export default function SignUp() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    role: "",
    nickname: "",
    gender: "",
    instagramId: null,
    profileImage: { name: "", url: "" },
    mainPhotographyTypes: [""],
    activeRegions: [] as string[],
  });

  const handleRoleSelect = (selectedRole: string) => {
    setUserInfo({ ...userInfo, role: selectedRole });
    setStep(step + 1);
  };

  const goToNextStep = (updates?: { mainPhotographyTypes?: string[]; activeRegions?: string[] }) => {
    if (updates) {
      setUserInfo((prev) => ({ ...prev, ...updates }));
    }
    setStep((prev) => prev + 1);
  };

  const handleSignUp = () => {
    userInfo.role === "USER" ? submitUserSignUp() : submitPhotographerSignUp();
  };

  const submitUserSignUp = async () => {
    if (userInfo.role === "PHOTOGRAPHER") return;
    try {
      const res = await createUser({
        nickname: userInfo.nickname,
        gender: userInfo.gender as "MALE" | "FEMALE",
        instagramId: userInfo.instagramId,
      });
      setUser({
        id: res.id,
        roles: res.roles,
      });
      navigate("/success/signup", { state: res, replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const submitPhotographerSignUp = async () => {
    if (userInfo.role === "USER") return;
    try {
      const res = await createPhotographer({
        nickname: userInfo.nickname,
        gender: userInfo.gender as "MALE" | "FEMALE",
        instagramId: userInfo.instagramId,
        profileImage: userInfo.profileImage,
        mainPhotographyTypes: userInfo.mainPhotographyTypes,
        activeRegions: userInfo.activeRegions,
      });
      setUser({
        id: res.id,
        roles: res.roles,
      });
      navigate("/success/signup", { state: res, replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-dvh p-4">
      <div className="relative flex flex-1 w-full h-full">
        {step === 0 && <SelectRole onRoleSelect={handleRoleSelect} />}
        {step === 1 && (
          <SetProfile
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onNext={goToNextStep}
          />
        )}
        {step === 2 && userInfo.role === "PHOTOGRAPHER" && (
          <MoreInfo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onNext={goToNextStep}
          />
        )}
        {((step === 2 && userInfo.role === "USER") ||
          (step === 3 && userInfo.role === "PHOTOGRAPHER")) && (
          <Terms onNext={goToNextStep} role={userInfo.role} />
        )}
        {((step === 3 && userInfo.role === "USER") ||
          (step === 4 && userInfo.role === "PHOTOGRAPHER")) && (
          <Route onNext={handleSignUp} />
        )}
      </div>
    </div>
  );
}
