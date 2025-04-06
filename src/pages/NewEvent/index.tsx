import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import { postPromotion, putPromotion } from "../../api/promotion";
import InputBox from "../../components/InputBox";
import SubHeader from "../../components/SubHeader";
import GetImagesBox from "../../components/GetImagesBox";
import Types from "../../components/Types";
import Location from "../../components/Location";
import InputLongformBox from "../../components/InputLongformBox/tndex";
import ButtonActive from "../../components/ButtonActive";
import ModalComfirm from "../../components/ModalComfirm";
import EventType from "./EventType";
import Keywords from "./Keywords";
import EventPeriod from "./EventPeriod";

export default function NewEvent() {
  const navigation = useNavigate();
  const location = useLocation();

  const [tradename, setTradename] = useState("");
  const [title, setTitle] = useState("");
  const [photographyTypes, setPhotographyTypes] = useState<string[]>([]);
  const [activeRegions, setActiveRegions] = useState<string[]>([]);
  const [promotionType, setPromotionType] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isValidDates, setIsValidDates] = useState(false);

  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    getUserInfoFunc();
    if (location.state) {
      setTradename(location.state.author.nickname);
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
    }
  }, []);

  const getUserInfoFunc = async () => {
    try {
      const res = await getUserInfo();
      setTradename(res.nickname);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    setIsValid(
      title.length *
        photographyTypes.length *
        activeRegions.length *
        promotionType.length *
        externalLink.length *
        images.length *
        hashtags.length *
        content.length >
        0 && isValidDates
    );
  }, [
    title,
    photographyTypes,
    activeRegions,
    promotionType,
    externalLink,
    images,
    hashtags,
    content,
    isValidDates,
  ]);

  const handleTitleInput = (e: any) => {
    setTitle(e.target.value);
  };

  const handleUrlInput = (e: any) => {
    setExternalLink(e.target.value);
  };

  const onChangeStart = (e: any) => {
    let { value } = e.target;
    value = value.replace(/[^0-9-]/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setStartedAt(value);
  };

  const onChangeEnd = (e: any) => {
    let { value } = e.target;
    value = value.replace(/[^0-9-]/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setEndedAt(value);
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
    };
    if (location.state) {
      await putPromotion(location.state.id, body);
    } else {
      await postPromotion(body);
    }
    try {
    } catch (e) {
      console.log(e);
    } finally {
      navigation(`/events`, { replace: true });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4">
        <SubHeader title="이벤트 등록" />
      </div>
      <div className="flex flex-col gap-10 px-4 mt-6">
        <div className="-mb-3">
          <InputBox
            isRequired={true}
            title="이벤트 제목"
            description=""
            placeholder="이벤트 제목을 입력해주세요."
            onChange={handleTitleInput}
            bottomText="공백 포함 30자 이내"
            value={title}
          />
        </div>
        <InputBox
          isRequired={true}
          title="상호/활동명"
          description=""
          placeholder="초록 스튜디오"
          onChange={() => {}}
          bottomText=""
          value={tradename}
        />
        <Types
          types={photographyTypes}
          setTypes={setPhotographyTypes}
          maxNum={2}
        />
        <Location locs={activeRegions} setLocs={setActiveRegions} maxNum={3} />
        <EventType eventType={promotionType} setEventType={setPromotionType} />
        <EventPeriod
          onChangeA={onChangeStart}
          onChangeB={onChangeEnd}
          valueA={startedAt}
          valueB={endedAt}
          setIsValidDates={setIsValidDates}
        />
        <InputBox
          isRequired={true}
          title="이벤트 게시물 링크"
          description="신청하기 버튼으로 바로 연결됩니다"
          placeholder="게시물 링크를 입력해주세요."
          onChange={handleUrlInput}
          bottomText=""
          value={externalLink}
        />
      </div>
      <div className="py-10 pl-4">
        <GetImagesBox
          isRequired={true}
          title="배너 사진"
          description="첫 번째 사진이 메인에 보이는 사진입니다"
          maxLength={10}
          images={images}
          fileType="PROMOTION_IMAGE"
          setImages={setImages}
          setShowModal={setShowImageModal}
        />
      </div>
      <div className="flex flex-col gap-10 px-4 mb-12">
        <Keywords
          keywords={hashtags}
          setKeywords={setHashtags}
          setShowModal={setShowKeywordModal}
        />
        <InputLongformBox
          isRequired={true}
          title="상세 소개"
          minHeight="10.5rem"
          maxLength={500}
          setValue={setContent}
          value={content}
        />
      </div>
      <div className="px-4 pb-4">
        <ButtonActive
          activation={isValid}
          onClick={() => onClickSubmit()}
          text="등록"
        />
      </div>
      {showKeywordModal && (
        <ModalComfirm
          content={["대표 키워드는", "최대 3개까지 입력할 수 있어요"]}
          setShowModal={setShowKeywordModal}
        />
      )}
      {showImageModal && (
        <ModalComfirm
          content={["배너 사진은", "최대 10장까지 첨부할 수 있어요"]}
          setShowModal={setShowImageModal}
        />
      )}
    </div>
  );
}
