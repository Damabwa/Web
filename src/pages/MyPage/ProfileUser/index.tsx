import { useNavigate } from "react-router-dom";
import img_profile from "../../../assets/svgs/icn_profile.svg";

interface Props {
  userInfo: any;
}

export default function ProfileUser({ userInfo }: Props) {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col gap-6 px-4 pt-7">
      <div className="flex items-center gap-4">
        <div className="w-[5.8125rem] h-[5.8125rem] rounded-full border-2 border-lineRegular overflow-hidden">
          <img
            className="object-cover min-w-full min-h-full"
            src={
              userInfo.profileImage ? userInfo.profileImage.url : img_profile
            }
          />
        </div>
        <div className="flex flex-col gap-[0.12rem]">
          <div className="text-lg font-semibold">{userInfo.nickname}</div>
          {userInfo.instagramId && (
            <div className="text-xs text-black04">@{userInfo.instagramId}</div>
          )}
        </div>
      </div>
      <div
        className="w-full h-10 text-sm font-medium items-center flex justify-center bg-gray100 rounded-[0.63rem] cursor-pointer"
        onClick={() =>
          navigation(`/edit/user`, {
            state: userInfo,
            replace: true,
          })
        }
      >
        프로필 수정
      </div>
    </div>
  );
}
