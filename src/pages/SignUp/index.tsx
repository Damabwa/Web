import { useState } from "react";
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
      <div className="relative flex-1 w-full h-full">
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
