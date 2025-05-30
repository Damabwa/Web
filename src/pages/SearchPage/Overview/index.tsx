import icn_noList from "../../../assets/svgs/icn_search_noList.svg";
import icn_event from "../../../assets/svgs/icn_search_event.svg";
import icn_photographer from "../../../assets/svgs/icn_search_photographer.svg";
import icn_next from "../../../assets/svgs/icn_next.svg";
import PromotionBox from "../../../components/PromotionBox";
import ListNotFound from "../../../components/ListNotFound";
import PhotographerBox from "../../../components/PhotographerBox";
import SubHeader from "./SubHeader";

interface Props {
  promotionList: any[];
  photographerList: any[];
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Overview({
  promotionList,
  photographerList,
  setState,
}: Props) {
  return (
    <div className="flex flex-col">
      <div>
        <SubHeader
          icn={<img className="w-3 h-[0.875rem]" src={icn_event} />}
          text="Event로 담아봐"
        />
        {promotionList.length > 0 ? (
          <div className="flex flex-col">
            <div className="bg-white">
              <PromotionBox data={promotionList[0]} />
            </div>
            <div className="flex justify-end px-4 pb-3 text-xs font-bold bg-white border-b-4 border-gray50 text-violet400">
              <div
                className="flex items-center gap-1 cursor-pointer w-fit"
                onClick={() => setState("PROMOTION")}
              >
                <div>더보기</div>
                <img className="w-3" src={icn_next} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center pb-8 h-44">
            <ListNotFound
              icon={icn_noList}
              title="앗! 조건에 맞는 이벤트가 없어요."
              content="곧 더 다양한 이벤트 소식을 준비해올게요!"
            />
          </div>
        )}
      </div>
      <div>
        <SubHeader
          icn={
            <img className="w-[0.875rem] h-[0.875rem]" src={icn_photographer} />
          }
          text="작가님을 만나봐"
        />
        {photographerList.length > 0 ? (
          <div className="flex flex-col">
            <div className="relative grid grid-cols-2 gap-5 m-4">
              {photographerList.slice(0, 2).map((item: any) => (
                <PhotographerBox key={item.id} data={item} />
              ))}
            </div>
            <div className="flex justify-end px-4 pb-3 text-xs font-bold bg-white border-b-4 border-gray50 text-violet400">
              <div
                className="flex items-center gap-1 cursor-pointer w-fit"
                onClick={() => setState("PHOTOGRAPHER")}
              >
                <div>더보기</div>
                <img className="w-3" src={icn_next} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center pb-8 h-44">
            <ListNotFound
              icon={icn_noList}
              title="앗! 조건에 맞는 작가님이 없어요."
              content="곧 더 다양한 작가님들을 모셔올게요!"
            />
          </div>
        )}
      </div>
    </div>
  );
}
