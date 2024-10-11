import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetProfile from "./SetProfile";
import Route from "./Route";
import Complete from "./Complete";

export default function SignUp() {
  const navigation = useNavigate();
  const [step, setStep] = useState(0);

  const getBtnText = () => {
    if (step === 0) return "다음";
    else if (step === 1) return "완료";
    else return "홈으로 이동";
  };

  const onClickBtn = () => {
    if (step === 2) navigation("/");
    else setStep(step + 1);
  };

  return (
    <div className="relative flex flex-col items-center flex-1 w-full min-h-[100vh] p-4 justify-around">
      <div className="flex-1 w-full pt-2">
        {step === 0 && <SetProfile />}
        {step === 1 && <Route setStep={setStep} />}
        {step === 2 && <Complete />}
      </div>
      <div className="flex flex-col items-center mb-12 gap-7">
        {step < 2 && <div>{step + 1} / 2</div>}
        <button
          className="px-16 py-2 text-white outline-none rounded-xl bg-violet400"
          onClick={() => onClickBtn()}
        >
          {getBtnText()}
        </button>
      </div>
    </div>
  );
}
