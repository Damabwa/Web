import icn_time from "../../../assets/svgs/icn_time.svg";
import icn_loc from "../../../assets/svgs/icn_location.svg";
import icn_insta from "../../../assets/svgs/icn_instagram.svg";

interface Props {
  promotionData: any;
}

export default function TopInfo({ promotionData }: Props) {
  const getKorean = (item: string) => {
    switch (item) {
      case "SNAP":
        return "스냅";
      case "PROFILE":
        return "프로필";
      case "CONCEPT":
        return "컨셉";
      case "ID_PHOTO":
        return "증명";
      case "SELF":
        return "셀프";
      default:
        return item;
    }
  };
  return (
    <div className="flex flex-col w-full py-5 bg-white border-b-8 border-gray50">
      <div className="px-4 text-sm font-medium text-black04 pb-[2px] flex gap-1">
        {promotionData.photographyTypes.map((type: string, index: number) => (
          <div className="flex gap-1" key={index}>
            {getKorean(type)}
            {promotionData.photographyTypes.length > index + 1 && <>,</>}
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 text-xl font-bold ">{promotionData.title}</div>
      <div className="flex flex-col gap-2 px-3 text-sm font-medium text-black02">
        {promotionData.startedAt && promotionData.endedAt && (
          <div className="flex items-center gap-1">
            <img className="p-[0.35rem]" src={icn_time} />
            <div>
              {promotionData.startedAt.replace(/-/g, ".")}
              {" ~ "}
              {promotionData.endedAt.replace(/-/g, ".")}
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <img className="w-6" src={icn_loc} />
          <div className="flex w-full gap-1">
            {promotionData.activeRegions.map((loc: any, index: number) => (
              <div className="flex gap-1" key={index}>
                <p>{loc.category}</p>
                <p>
                  {loc.name}
                  {promotionData.activeRegions.length > index + 1 && <>,</>}
                </p>
              </div>
            ))}
          </div>
        </div>
        {promotionData.author.instagramId && (
          <div className="flex items-center gap-1">
            <img className="p-[0.35rem]" src={icn_insta} />
            <div
              className="cursor-pointer text-[#0068C3]"
              onClick={() =>
                window.open(
                  `https://www.instagram.com/${promotionData.author.instagramId}`
                )
              }
            >
              {promotionData.author.instagramId}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
