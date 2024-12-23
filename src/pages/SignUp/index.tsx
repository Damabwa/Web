import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_damaba from "../../assets/imgs/logo_damaba.png";
import SelectRole from "./SelectRole";
import SetProfile from "./SetProfile";
import Route from "./Route";
import Complete from "./Complete";
import MoreInfo from "./MoreInfo";

export default function SignUp() {
  const [step, setStep] = useState(0);
  const [userinfo, setUserInfo] = useState({
    role: "",
    username: "",
    gender: "",
    instagramId: "",
  });

  const setRoleFunc = (selectedRole: string) => {
    setUserInfo({ ...userinfo, role: selectedRole });
    setStep(step + 1);
  };

  const setInfoFunc = (
    username: string,
    gender: string,
    instagramId: string
  ) => {
    setUserInfo({ ...userinfo, username, gender, instagramId });
  };

  const setNextFunc = () => {
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen p-4">
      <div className="w-full pb-7 h-fit">
        <img className="w-28" src={logo_damaba} />
      </div>
      <div className="relative flex-1 w-full pt-2">
        {step === 0 && <SelectRole setRoleFunc={setRoleFunc} />}
        {step === 1 && (
          <SetProfile
            role={userinfo.role}
            setNextFunc={setNextFunc}
            setInfoFunc={setInfoFunc}
          />
        )}
        {step === 2 && userinfo.role === "photographer" && (
          <MoreInfo setNextFunc={setNextFunc} />
        )}
        {((step === 2 && userinfo.role === "user") ||
          (step === 3 && userinfo.role === "photographer")) && (
          <Route setNextFunc={setNextFunc} />
        )}
        {((step === 3 && userinfo.role === "user") ||
          (step === 4 && userinfo.role === "photographer")) && (
          <Complete username={userinfo.username} />
        )}
      </div>
    </div>
  );
}
