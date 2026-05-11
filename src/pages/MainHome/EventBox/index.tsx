import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from "../../../constants/validation";
import { usePromotionList } from "../../../hooks/usePromotionList";
import { getPhotoType } from "../../../hooks/getKorean";
import { isMobileDevice } from "../../../utils/device";
import { getDDayText } from "../../../utils/date";
import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_camera from "../../../assets/svgs/icn_camera.svg";
import icn_clock from "../../../assets/svgs/icn_clock.svg";

export default function EventBox() {
  const navigate = useNavigate();

  const { promotions: ongoingEvents } = usePromotionList(
    `page=0&pageSize=${PAGE_SIZE.EVENT}&progressStatus=ONGOING`
  );
  const { promotions: upcomingEvents } = usePromotionList(
    `page=0&pageSize=${PAGE_SIZE.EVENT}&progressStatus=UPCOMING`
  );
  const events = useMemo(
    () => [...ongoingEvents, ...upcomingEvents].slice(0, 5),
    [ongoingEvents, upcomingEvents]
  );

  const openDetailPage = (id: string) => {
    isMobileDevice()
      ? navigate(`/event/${id}`)
      : window.open(`/event/${id}`);
  };

  return (
    <div className="flex flex-col py-5">
      <div
        className="flex flex-col px-4 pb-5 cursor-pointer"
        onClick={() => navigate("/events")}
      >
        <span className="text-lg font-bold">Event로 담아봐!</span>
        <div className="flex items-center justify-between text-sm">
          <span>한 눈에 보는 사진 이벤트 모음</span>
          <div className="flex text-xs">
            <button>전체보기</button>
            <img className="w-4 h-4" alt=">" src={icn_next} />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3 px-4 overflow-x-auto">
        {events.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => openDetailPage(item.id)}
          >
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-gray50 overflow-hidden flex items-center justify-center">
              <img
                className="object-cover min-w-full min-h-full rounded-lg"
                src={item.images[0].url}
                alt="이벤트 썸네일"
              />
            </div>
            <div className="flex flex-col text-xs font-medium text-black02">
              <div className="mb-1 text-sm font-semibold text-black">
                {item.title.length > 9
                  ? `${item.title.slice(0, 8)}...`
                  : item.title}
              </div>
              <div className="flex items-center pb-[0.1rem]">
                <div className="flex items-center justify-center w-4 h-4 ">
                  <img src={icn_camera} alt="" />
                </div>
                <div className="flex gap-1">
                  {item.photographyTypes.map((type: string, index: number) => (
                    <div key={index}>
                      {getPhotoType(type)}
                      {index + 1 !== item.photographyTypes.length && <>,</>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-4 h-4">
                  <img src={icn_clock} alt="" />
                </div>
                {getDDayText(item.endedAt, item.startedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
