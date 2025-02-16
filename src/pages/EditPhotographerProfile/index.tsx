import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back.svg";
import SetPhotographerProfile from "../../components/SetPhotographerProfile";

export default function EditPhotographerProfile() {
  const navigation = useNavigate();

  const onClickFunc = () => {
    navigation(`/mypage`);
  };

  return (
    <div className="relative flex flex-col px-4">
      <div className="relative flex items-center justify-center h-12 mb-6 font-semibold bg-white">
        <img
          className="absolute left-0 w-6 h-6 cursor-pointer"
          src={icn_back}
          onClick={() => navigation(-1)}
        />
        <div>프로필 수정</div>
        <div />
      </div>
      <SetPhotographerProfile isEdit={true} onClickFunc={onClickFunc} />
    </div>
  );
}
