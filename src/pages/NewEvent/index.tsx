import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function NewEvent() {
  const navigation = useNavigate();

  const [title, setTitle] = useState("");
  const [tradename, setTradename] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [locs, setLocs] = useState<string[]>([]);
  const [eventType, setEventType] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [detail, setDetail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [showKeywordModal, setShowKeywordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    setIsValid(
      title.length *
        tradename.length *
        types.length *
        locs.length *
        eventType.length *
        url.length *
        images.length *
        keywords.length *
        detail.length >
        0
    );
  }, [title, tradename, types, locs, eventType, url, images, keywords, detail]);

  const handleTitleInput = (e: any) => {
    setTitle(e.target.value);
  };

  const handleNameInput = (e: any) => {
    setTradename(e.target.value);
  };

  const handleUrlInput = (e: any) => {
    setUrl(e.target.value);
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
          onChange={handleNameInput}
          bottomText=""
          value={tradename}
        />
        <Types types={types} setTypes={setTypes} maxNum={2} />
        <Location locs={locs} setLocs={setLocs} maxNum={3} />
        <EventType eventType={eventType} setEventType={setEventType} />
        <InputBox
          isRequired={true}
          title="이벤트 게시물 링크"
          description="신청하기 버튼으로 바로 연결됩니다"
          placeholder="게시물 링크를 입력해주세요."
          onChange={handleUrlInput}
          bottomText=""
          value={url}
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
          keywords={keywords}
          setKeywords={setKeywords}
          setShowModal={setShowKeywordModal}
        />
        <InputLongformBox
          isRequired={true}
          title="상세 소개"
          minHeight="10.5rem"
          maxLength={500}
          setValue={setDetail}
          value={detail}
        />
      </div>
      <div className="px-4 pb-4">
        <ButtonActive
          activation={isValid}
          onClick={() => {
            navigation(`/events`);
          }}
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
