import { useNavigate } from "react-router-dom";

interface Props {
  savedPromotions: any[];
  savedPhotographers: any[];
  role: string;
}

export default function SavedContent({
  savedPromotions,
  savedPhotographers,
  role,
}: Props) {
  const navigate = useNavigate();
  if (!savedPromotions || !savedPhotographers) return <></>;
  return (
    <div className="bg-white">
      <div
        className={`flex py-6 mx-4 cursor-pointer rounded-xl ${role === "USER" ? "border border-gray100" : ""}`}
      >
        <div
          className="flex flex-col items-center justify-center w-1/2 gap-1"
          onClick={() => {
            // SavedContents가 직접 조회하므로 state 전달 불필요
            if (savedPromotions.length > 0) navigate(`/my/saved/promotion`);
          }}
        >
          <div className="text-sm font-medium">저장한 이벤트</div>
          <div>{savedPromotions.length}</div>
        </div>
        <div className="border border-gray100 h-[3.3125rem]" />
        <div
          className="flex flex-col items-center justify-center w-1/2 gap-1"
          onClick={() => {
            // SavedContents가 직접 조회하므로 state 전달 불필요
            if (savedPhotographers.length > 0)
              navigate(`/my/saved/photographer`);
          }}
        >
          <div className="text-sm font-medium">저장한 작가님</div>
          <div>{savedPhotographers.length}</div>
        </div>
      </div>
    </div>
  );
}
