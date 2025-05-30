import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SubHeader from "../../components/SubHeader";
import PromotionBox from "../../components/PromotionBox";
import PhotographerBox from "../../components/PhotographerBox";

export default function SavedContents() {
  const location = useLocation();
  const { type } = useParams();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(location.state);
  }, []);

  if (data.length === 0) return <></>;
  return (
    <div className="relative w-full ">
      <div className="h-12 px-4">
        <SubHeader
          title={`저장한 ${type === "promotion" ? "이벤트" : "작가님"}`}
        />
      </div>
      {type === "promotion" ? (
        <div className="flex flex-col gap-1 pt-2 bg-gray50">
          {data.map((item) => (
            <div key={item.id} className="bg-white">
              <PromotionBox data={item} />
            </div>
          ))}
          <div className="w-full h-20 bg-white" />
        </div>
      ) : (
        <div className="relative grid grid-cols-2 gap-5 m-4 border-t-8 border-t-gray50">
          {data.map((item: any) => (
            <PhotographerBox key={item.id} data={item} />
          ))}
          <div className="w-full h-20 bg-white" />
        </div>
      )}
    </div>
  );
}
