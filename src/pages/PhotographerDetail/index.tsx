import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";
import { getPhotographerInfo } from "../../api/photographer";

export default function PhotographerDetail() {
  const [photographerData, setPhotographerData] = useState<any>();

  const { id } = useParams();

  useEffect(() => {
    getPhotographerInfoFunc();
  }, []);

  const getPhotographerInfoFunc = async () => {
    try {
      const res = await getPhotographerInfo(Number(id), false);
      setPhotographerData(res);
    } catch (e: any) {
      console.log(e);
    }
  };

  if (!photographerData) return <></>;
  return (
    <div className="relative w-full mb-24">
      <div className="w-full h-40 bg-violet400" />
      <PhotographerInfo isMypage={false} userInfo={photographerData} />
      {photographerData.description && (
        <MorePhotographerInfo userInfo={photographerData} />
      )}
    </div>
  );
}
