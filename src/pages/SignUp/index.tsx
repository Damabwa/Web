import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../atom/atom";
import { userRegistration } from "../../api/user";
import { photographerRegistration } from "../../api/photographer";
import SelectRole from "./SelectRole";
import SetProfile from "./SetProfile";
import Route from "./Route";
import MoreInfo from "./MoreInfo";

export default function SignUp() {
  const navigation = useNavigate();
  const setUser = useSetRecoilState(userState);

  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    role: "",
    nickname: "",
    gender: "",
    instagramId: null,
    profileImage: { name: "", url: "" },
    mainPhotographyTypes: [""],
    activeRegions: [],
  });

  const setRoleFunc = (selectedRole: string) => {
    setUserInfo({ ...userInfo, role: selectedRole });
    setStep(step + 1);
  };

  const setNextFunc = () => {
    setStep(step + 1);
  };

  const signUpFunc = () => {
    userInfo.role === "USER" ? userSignUpFunc() : photographerSignUpFunc();
  };

  const userSignUpFunc = async () => {
    if (userInfo.role === "PHOTOGRAPHER") return;
    try {
      const res = await userRegistration({
        nickname: userInfo.nickname,
        gender: userInfo.gender,
        instagramId: userInfo.instagramId,
      });
      setUser({
        id: -1,
        roles: res.roles,
      });
      navigation("/success/signup", { state: res, replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const photographerSignUpFunc = async () => {
    if (userInfo.role === "USER") return;
    try {
      const res = await photographerRegistration({
        nickname: userInfo.nickname,
        gender: userInfo.gender,
        instagramId: userInfo.instagramId,
        profileImage: userInfo.profileImage,
        mainPhotographyTypes: userInfo.mainPhotographyTypes,
        activeRegions: userInfo.activeRegions,
      });
      setUser({
        id: -1,
        roles: res.roles,
      });
      navigation("/success/signup", { state: res, replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen p-4">
      <div className="relative flex flex-1 w-full h-full">
        {step === 0 && <SelectRole setRoleFunc={setRoleFunc} />}
        {step === 1 && (
          <SetProfile
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setNextFunc={setNextFunc}
          />
        )}
        {step === 2 && userInfo.role === "PHOTOGRAPHER" && (
          <MoreInfo
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onClickFunc={setNextFunc}
          />
        )}
        {((step === 2 && userInfo.role === "USER") ||
          (step === 3 && userInfo.role === "PHOTOGRAPHER")) && (
          <Route setNextFunc={signUpFunc} />
        )}
      </div>
    </div>
  );
}
