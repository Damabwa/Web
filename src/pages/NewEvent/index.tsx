import { useState } from "react";
import { VALIDATION } from "../../constants/validation";
import InputBox from "../../components/InputBox";
import SubHeader from "../../components/SubHeader";
import GetImagesBox from "../../components/GetImagesBox";
import Types from "../../components/Types";
import Location from "../../components/Location";
import InputLongformBox from "../../components/InputLongformBox";
import ButtonActive from "../../components/ButtonActive";
import ModalConfirm from "../../components/ModalConfirm";
import EventType from "./EventType";
import Keywords from "./Keywords";
import EventPeriod from "./EventPeriod";
import { useEventForm } from "./useEventForm";

export default function NewEvent() {
  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const { formData, formSetters, formHandlers, isValid } = useEventForm();
  const {
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
  } = formData;
  const {
    setPhotographyTypes,
    setActiveRegions,
    setPromotionType,
    setImages,
    setHashtags,
    setContent,
  } = formSetters;
  const { handleTitleInput, handleUrlInput, onChangeDate, onClickSubmit } =
    formHandlers;

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
            bottomText="공백 포함 3-30자"
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
          onChangeDate={onChangeDate}
          startedAt={startedAt}
          endedAt={endedAt}
        />
        <InputBox
          isRequired={true}
          title="이벤트 신청 링크"
          description={
            <div className="px-1">
              '신청하기 버튼'으로 바로 연결됩니다
              <br /> (ex. 인스타 게시물, 카카오톡 채널 등)
            </div>
          }
          placeholder="신청 링크를 입력해주세요."
          onChange={handleUrlInput}
          bottomText=""
          value={externalLink}
        />
      </div>
      <div className="py-10">
        <GetImagesBox
          isRequired={true}
          title="배너 사진"
          description="첫 번째 사진이 메인에 보이는 사진입니다"
          maxLength={VALIDATION.EVENT_IMAGES.MAX}
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
          maxLength={VALIDATION.EVENT_CONTENT.MAX}
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
        <ModalConfirm
          content={["대표 키워드는", "최대 3개까지 입력할 수 있어요"]}
          setShowModal={setShowKeywordModal}
        />
      )}
      {showImageModal && (
        <ModalConfirm
          content={["배너 사진은", "최대 10장까지 첨부할 수 있어요"]}
          setShowModal={setShowImageModal}
        />
      )}
    </div>
  );
}
