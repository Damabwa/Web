import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";
import { useEffect, useState } from "react";
import { getPhotographerInfo } from "../../api/photographer";
import { useParams } from "react-router-dom";

export default function PhotographerDetail() {
  const [photographerData, setPhotographerData] = useState();

  const { id } = useParams();

  useEffect(() => {
    getPhotographerInfoFunc();
  }, []);

  const getPhotographerInfoFunc = async () => {
    try {
      const res = await getPhotographerInfo(Number(id));
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
      <MorePhotographerInfo userInfo={photographerData} />
    </div>
  );
}
