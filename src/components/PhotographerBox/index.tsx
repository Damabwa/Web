import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  createSavedPhotographer,
  deleteSavedPhotographer,
} from "../../api/photographer";
import { getPhotoType } from "../../hooks/getKorean";
import { useLoginGuard } from "../../hooks/useLoginGuard";
import { useOpenInternalLink } from "../../hooks/useOpenInternalLink";
import icn_clipOff from "../../assets/svgs/icn_clip.svg";
import icn_clipOn from "../../assets/svgs/icn_clipOn.svg";
import icn_noPhotographer from "../../assets/svgs/icn_no_photogrpher.svg";
import ModalCheck from "../ModalCheck";

interface postData {
  id: number;
  profileImage: { name: string; url: string };
  nickname: string;
  mainPhotographyTypes: string[];
  isSaved: boolean;
}

interface Props {
  data: postData;
}

function PhotographerBox({ data }: Props) {
  const openInternalLink = useOpenInternalLink();
  const queryClient = useQueryClient();
  const [isClipped, setIsClipped] = useState(false);
  const { showLoginModal, setShowLoginModal, requireLogin, loginModalProps } =
    useLoginGuard();

  useEffect(() => {
    setIsClipped(data.isSaved);
  }, [data.isSaved]);

  const nickname = useMemo(
    () =>
      data.nickname.length < 8
        ? data.nickname
        : `${data.nickname.slice(0, 8)}...`,
    [data.nickname],
  );

  const onClickPhotographer = useCallback(() => {
    openInternalLink(`/photographer/${data.id}`);
  }, [data.id, openInternalLink]);

  const savePhotographerFunc = useCallback(
    async (clipped: boolean) => {
      try {
        setIsClipped(!clipped);
        clipped
          ? await deleteSavedPhotographer(data.id)
          : await createSavedPhotographer(data.id);
        // 저장 상태 변경을 다른 캐시 화면(목록/상세/저장목록)에도 반영
        queryClient.invalidateQueries({ queryKey: ["photographers"] });
        queryClient.invalidateQueries({ queryKey: ["photographer", data.id] });
        queryClient.invalidateQueries({ queryKey: ["savedPhotographers"] });
      } catch (e) {
        setIsClipped(clipped);
        setShowLoginModal(true);
        console.log(e);
      }
    },
    [data.id, setShowLoginModal, queryClient],
  );

  const onClickSave = useCallback(() => {
    requireLogin(() => savePhotographerFunc(isClipped));
  }, [requireLogin, savePhotographerFunc, isClipped]);

  if (!data) return <></>;
  return (
    <div>
      <div className="relative flex flex-col justify-between w-full text-white cursor-pointer h-44 bg-gray rounded-xl">
        <div
          className="absolute top-0 left-0 z-0 w-full h-full"
          onClick={onClickPhotographer}
        >
          <div className="relative inline-block w-full h-full overflow-hidden rounded-xl">
            <img
              src={data.profileImage.url}
              alt={data.profileImage.name}
              className="block object-cover min-w-full min-h-full"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = icn_noPhotographer;
              }}
            />
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-card-overlay pointer-events-none" />
          </div>
        </div>
        <div className="z-10 flex items-center justify-end p-2">
          <div className="bg-white rounded-full p-[0.375rem]">
            <img
              alt="clip"
              src={isClipped ? icn_clipOn : icn_clipOff}
              onClick={onClickSave}
            />
          </div>
        </div>
        <div className="z-10 p-3" onClick={onClickPhotographer}>
          <div className="font-semibold">{nickname}</div>
          <div className="flex items-center gap-1 text-xs">
            {data.mainPhotographyTypes.map((type, index) => (
              <div key={index}>
                {getPhotoType(type)}
                {index + 1 !== data.mainPhotographyTypes.length && <>,</>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <div className="absolute -left-4">
          <ModalCheck {...loginModalProps} />
        </div>
      )}
    </div>
  );
}

// 부모(목록) 재렌더 시 data 참조가 같으면 카드 재렌더를 건너뛴다.
export default memo(PhotographerBox);
