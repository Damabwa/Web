import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back.svg";
import icn_camera from "../../assets/svgs/icn_profile_camera.svg";
import icn_delete from "../../assets/svgs/btn_delete_porfolio_ellipse.svg";
import SubHeader from "../../components/SubHeader";
import InputBox from "../../components/InputBox";
import InputIDBox from "../../components/InputIDBox";
import InputButtonBox from "../../components/InputButtonBox";
import ButtonActive from "../../components/ButtonActive";

export default function EditPhotographerPage() {
  const navigation = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [photos, setPhotos] = useState<string[]>([]);
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

  const handleImageClick = () => {
    if (photos.length === 10) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prevItem) => [reader.result as string, ...prevItem]);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="relative flex flex-col justify-between min-h-screen">
      <div>
        <div className="px-4">
          <SubHeader title="작가 페이지 수정" />
        </div>
        <div className="px-3 py-[0.63rem] mt-3 mb-6 text-sm font-medium rounded-lg bg-violet50 text-black02 mx-4">
          이 페이지를 완성하시면, <br />
          '작가님을 만나봐' 페이지에 작가 소개 글이 등록됩니다!
        </div>
        <div>
          <div className="flex justify-center">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>
          <div className="flex flex-col w-full gap-8 mb-12 text-sm font-medium">
            <div className="flex flex-col w-full">
              <div className="px-4 font-medium">
                <span className="text-red">*</span>
                <span>포트폴리오</span>
              </div>
              <div className="flex gap-3 pt-3 pr-6 overflow-scroll w-fit">
                <div
                  className="cursor-pointer w-[4.75rem] border-black04 rounded-[0.63rem] border flex flex-col text-black03 text-xs ml-4"
                  onClick={handleImageClick}
                >
                  <div className="flex flex-col px-6 py-4">
                    <img className="w-7" src={icn_camera} />
                    <div>{photos.length}/10</div>
                  </div>
                </div>
                {photos.map((item) => (
                  <div className="relative min-w-fit">
                    <img
                      className="absolute right-[-0.75rem] top-[-0.75rem] cursor-pointer z-50"
                      src={icn_delete}
                      onClick={() =>
                        setPhotos((prev) =>
                          prev.filter((photo) => photo !== item)
                        )
                      }
                    />
                    <img
                      className="object-cover w-[4.75rem] h-[4.75rem] border-black04 rounded-[0.63rem] border"
                      src={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
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
