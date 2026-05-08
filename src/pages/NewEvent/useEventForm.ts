import { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atom/atom";
import { getUserInfo } from "../../api/user";
import { postPromotion, putPromotion } from "../../api/promotion";
import { ImageFile } from "../../types/common";

export function useEventForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorHidden = useRecoilValue(userState).roles.includes("ADMIN");

  const [tradename, setTradename] = useState("");
  const [title, setTitle] = useState("");
  const [photographyTypes, setPhotographyTypes] = useState<string[]>([]);
  const [activeRegions, setActiveRegions] = useState<string[]>([]);
  const [promotionType, setPromotionType] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (location.state) {
      setTradename(location.state.author?.nickname ?? "");
      setTitle(location.state.title);
      setPhotographyTypes(location.state.photographyTypes);
      setActiveRegions(location.state.activeRegions);
      setPromotionType(location.state.promotionType);
      setStartedAt(location.state.startedAt);
      setEndedAt(location.state.endedAt);
      setExternalLink(location.state.externalLink);
      setImages(location.state.images);
      setHashtags(location.state.hashtags);
      setContent(location.state.content);
      return;
    }
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setTradename(res.nickname);
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchUserInfo();
    // 마운트 시 location.state에서 수정할 초기값을 1회 설정
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = useMemo(
    () =>
      title.length >= 3 &&
      photographyTypes.length > 0 &&
      activeRegions.length > 0 &&
      promotionType.length > 0 &&
      externalLink.length > 0 &&
      images.length > 0 &&
      hashtags.length > 0 &&
      content.length > 0 &&
      startedAt.length > 0 &&
      endedAt.length > 0,
    [
      title,
      photographyTypes,
      activeRegions,
      promotionType,
      externalLink,
      images,
      hashtags,
      content,
      startedAt,
      endedAt,
    ]
  );

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) setTitle(e.target.value);
  };

  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExternalLink(e.target.value);
  };

  const onChangeDate = (type: string, date: any) => {
    const formatted = date.format("YYYY-MM-DD");
    if (type === "START") {
      setStartedAt(formatted);
    } else {
      setEndedAt(formatted);
    }
  };

  const onClickSubmit = async () => {
    const body = {
      promotionType,
      title,
      content,
      externalLink,
      startedAt,
      endedAt,
      photographyTypes,
      images,
      activeRegions,
      hashtags,
      isAuthorHidden,
    };
    try {
      if (location.state) {
        await putPromotion(location.state.id, body);
      } else {
        await postPromotion(body);
      }
      navigate(`/events`, { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    formData: {
      tradename,
      title,
      photographyTypes,
      activeRegions,
      promotionType,
      startedAt,
      endedAt,
      externalLink,
      images,
      hashtags,
      content,
    },
    formSetters: {
      setPhotographyTypes,
      setActiveRegions,
      setPromotionType,
      setImages,
      setHashtags,
      setContent,
    },
    formHandlers: {
      handleTitleInput,
      handleUrlInput,
      onChangeDate,
      onClickSubmit,
    },
    isValid,
  };
}
