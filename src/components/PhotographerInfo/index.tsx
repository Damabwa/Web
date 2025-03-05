import icn_clip from "../../assets/svgs/icn_clip.svg";
import icn_web from "../../assets/svgs/icn_web.svg";
import icn_loc from "../../assets/svgs/icn_location.svg";
import icn_insta from "../../assets/svgs/icn_instagram.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  isMypage: boolean;
  userInfo: any;
}

export default function PhotographerInfo({ isMypage, userInfo }: Props) {
  const navigation = useNavigate();

  return (
    <div className="relative w-full bg-white border-b-8 border-gray50 pt-[4.25rem] px-4 pb-5">
      <div className="absolute top-[-3rem] left-0 flex items-end justify-between w-full px-4">
        <img
          className="w-[6.5rem] h-[6.5rem] object-cover border-2 rounded-xl border-lineRegular bg-white"
          src={userInfo.profileImage.url}
        />
        {!isMypage && (
          <div className="cursor-pointer flex flex-col items-center justify-center w-12 h-12 rounded-md bg-gray50 text-black03 text-[0.625rem] font-medium">
            <img className="w-5 ml-[-0.725px]" src={icn_clip} />
            <div className="w-5 text-center">0</div>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2 pb-3">
        <div className="text-xl font-bold">{userInfo.nickname}</div>
        <div className="text-sm font-medium text-black04 pb-[0.12rem]">
          스냅, 컨셉
        </div>
      </div>
      <div className="flex flex-col gap-2 pb-1 -ml-1 text-sm font-medium text-black02">
        <div className="flex items-center gap-1">
          <img className="w-6" src={icn_loc} />
          <div className="flex w-full gap-1">
            {userInfo.activeRegions.map((loc: any, index: number) => (
              <div className="flex gap-1" key={index}>
                <p>{loc.category}</p>
                <p>
                  {loc.name}
                  {userInfo.activeRegions.length > index + 1 && <>,</>}
                </p>
              </div>
            ))}
          </div>
        </div>
        {userInfo.instagramId && (
          <div className="flex items-center gap-1">
            <img className="p-[0.35rem]" src={icn_insta} />
            <div
              className="cursor-pointer text-[#0068C3]"
              onClick={() =>
                window.open(`https://www.instagram.com/${userInfo.instagramId}`)
              }
            >
              {userInfo.instagramId}
            </div>
          </div>
        )}
        {userInfo.contactLink && (
          <div className="flex items-center gap-1">
            <img className="" src={icn_web} />
            <div
              className="cursor-pointer text-[#0068C3]"
              onClick={() => window.open(`${userInfo.contactLink}`)}
            >
              {userInfo.contactLink}
            </div>
          </div>
        )}
      </div>
      {isMypage && (
        <div className="flex items-center w-full gap-2 mt-4">
          <button
            className="flex-1 h-10 text-sm font-medium text-white rounded-md outline-none bg-violet300"
            onClick={() =>
              navigation(`/edit/photographer`, { state: userInfo })
            }
          >
            프로필 수정
          </button>
          <button
            className="flex-1 h-10 text-sm font-medium text-white rounded-md outline-none bg-violet300"
            onClick={() => navigation(`/edit/photographer/detail`)}
          >
            작가 페이지 수정
          </button>
        </div>
      )}
    </div>
  );
}
