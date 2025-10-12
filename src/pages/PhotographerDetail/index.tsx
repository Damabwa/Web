import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getPhotographerInfo } from "../../api/photographer";
import icn_share from "../../assets/svgs/icn_share.svg";
import icn_back from "../../assets/svgs/icn_back.svg";
import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";
import "react-toastify/dist/ReactToastify.css";

export default function PhotographerDetail() {
  const isMobile = sessionStorage.getItem("isMobile") === "true";
  const navigation = useNavigate();
  const [photographerData, setPhotographerData] = useState<any>();

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

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL이 복사되었어요!");
    } catch (err) {
      toast.error("복사에 실패했어요 😢");
    }
  };

  if (!photographerData) return <></>;
  return (
    <div className="relative w-full mb-24">
      <div className="relative w-full h-40 bg-violet400">
        {isMobile && (
          <img
            className="absolute z-10 w-6 h-6 cursor-pointer top-3 left-4"
            onClick={() => navigation(-1)}
            src={icn_back}
          />
        )}
        <img
          className="absolute cursor-pointer top-3 right-4"
          src={icn_share}
          onClick={handleCopyUrl}
        />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
        />
      </div>
      <div className="flex flex-col gap-2 bg-gray50">
        <PhotographerInfo isMypage={false} userInfo={photographerData} />
        {photographerData.description && (
          <MorePhotographerInfo userInfo={photographerData} />
        )}
      </div>
    </div>
  );
}
