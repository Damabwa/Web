import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../../components/SubHeader";
import InputBox from "../../components/InputBox";
import InputIDBox from "../../components/InputIDBox";
import InputButtonBox from "../../components/InputButtonBox";
import ButtonActive from "../../components/ButtonActive";
import GetImagesBox from "../../components/GetImagesBox";

export default function EditPhotographerPage() {
  const navigation = useNavigate();

  const [address, setAddress] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [url, setUrl] = useState("");
  const [intro, setIntro] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isChangedName, setIsChangedName] = useState(false);
  const [isChangedInstaId, setIsChangedInstaId] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState("");

  // useEffect(() => {
  //   checkValidFunc();
  // }, [address, isDuplicated, instagramId]);

  const handleInput = (e: any) => {
    if (e.target.id === "url") setUrl(e.target.value);
    else if (e.target.id === "intro") setIntro(e.target.value);
  };

  const handleIdInput = (e: any) => {
    setIsChangedInstaId(true);
    let { value } = e.target;
    value = value.toLowerCase();
    value = value.replace(/[^0-9a-z._]/g, "");
    if (value.length > 30) {
      value = value.slice(0, 30);
    }
    setInstagramId(value);
  };

  // const checkValidFunc = () => {
  //   if (isChangedInstaId || (isChangedName && isDuplicated === "false"))
  //     setIsValid(true);
  //   else setIsValid(false);
  // };

  return (
    <div className="relative flex flex-col min-h-screen">
      <div>
        <div className="px-4">
          <SubHeader title="작가 페이지 수정" />
        </div>
        <div className="px-3 py-[0.63rem] mt-3 mb-6 text-sm font-medium rounded-lg bg-violet50 text-black02 mx-4">
          이 페이지를 완성하시면, <br />
          '작가님을 만나봐' 페이지에 작가 소개 글이 등록됩니다!
        </div>
        <div className="mb-12">
          <GetImagesBox
            isRequired={true}
            title="포트폴리오"
            description=""
            maxLength={10}
          />
        </div>
        <div className="flex flex-col gap-8 px-4">
          <InputButtonBox
            isRequired={false}
            title="상세 주소"
            description="(오프라인 사업장이 있는 경우)"
            placeholder="주소를 검색해주세요."
            onChange={() => {}}
            onClick={() => {}}
            activation={false}
            buttonTitle="주소 검색"
            bottomText=""
            value={address}
          />
          <InputIDBox
            title="인스타그램 아이디"
            placeholder="인스타그램 아이디를 입력해주세요."
            onChange={handleIdInput}
            value={instagramId}
          />
          <InputBox
            isRequired={false}
            title="대표 링크"
            description="(홈페이지, 네이버, 카카오톡 등)"
            placeholder="대표 링크를 입력해주세요."
            onChange={handleInput}
            bottomText=""
          />
          <div className="flex flex-col w-full gap-2 text-sm">
            <div className="pb-1 font-medium">
              <span className="text-red">*</span>
              <span>작가님 소개</span>
            </div>
            <div className="flex flex-col w-full mb-9">
              <textarea
                className="flex-1 min-h-[10.5rem] p-4 border-none outline-none rounded-[0.63rem] bg-lightgray resize-none"
                placeholder="인사말, 작가님 소개, 작업 스타일, 예약 방법, 영업 일시 등을 작성해주세요."
                id="intro"
                onChange={handleInput}
                value={intro}
                maxLength={499}
              />
              <div className="w-full pt-2 text-sm text-end text-black02">
                {intro.length}/500
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <ButtonActive
          activation={isValid}
          onClick={() => {
            if (isValid) navigation(`/mypage`);
          }}
          text="등록"
        />
      </div>
    </div>
  );
}
