import { useNavigate } from "react-router-dom";
import SetPhotographerProfile from "../../components/SetPhotographerProfile";
import SubHeader from "../../components/SubHeader";

export default function EditPhotographerProfile() {
  const navigation = useNavigate();

  const onClickFunc = () => {
    navigation(`/mypage`);
  };

  return (
    <div className="relative flex flex-col gap-6 px-4">
      <SubHeader title="프로필 수정" />
      <SetPhotographerProfile isEdit={true} onClickFunc={onClickFunc} />
    </div>
  );
}
