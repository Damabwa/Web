import { useEffect, useState } from "react";

interface Props {
  onChangeA: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeB: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueA: string;
  valueB: string;
  setIsValidDates: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventPeriod({
  onChangeA,
  onChangeB,
  valueA,
  valueB,
  setIsValidDates,
}: Props) {
  const [wrondMsg, setWrongMsg] = useState("");

  useEffect(() => {
    if (
      (valueA && !isValidDateFormat(valueA)) ||
      (valueB && !isValidDateFormat(valueB))
    ) {
      setIsValidDates(false);
      setWrongMsg("잘못된 형식입니다.");
    } else checkIsValidDates(valueA, valueB);
  }, [valueA, valueB]);

  const getDate = () => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const koreaTime = new Date(utcTime + 9 * 60 * 60000);

    const year = koreaTime.getFullYear();
    const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
    const day = String(koreaTime.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isValidDateFormat = (dateStr: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return false;

    const [year, month, day] = dateStr.split("-").map(Number);
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() + 1 !== month ||
      date.getUTCDate() !== day
    ) {
      return false;
    }
    return true;
  };

  const checkIsValidDates = (startDateStr: string, endDateStr: string) => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const today = new Date(utcTime + 9 * 60 * 60000);
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(startDateStr);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(endDateStr);
    endDate.setHours(0, 0, 0, 0);

    // if (startDate < today) {
    //   setWrongMsg("시작 날짜는 오늘 이후여야 합니다.");
    //   setIsValidDates(false);
    //   return;
    // }
    if (endDate < today) {
      setWrongMsg("종료 날짜는 오늘 이후여야 합니다.");
      setIsValidDates(false);
      return;
    }
    if (endDate < startDate) {
      setWrongMsg("종료 날짜는 시작 날짜보다 이전일 수 없습니다.");
      setIsValidDates(false);
      return;
    }
    setWrongMsg("");
    setIsValidDates(true);
  };

  return (
    <div className="flex flex-col text-sm">
      <div className="font-medium mb-[0.62rem]">
        <span className="text-red mr-[0.12rem]">*</span>
        <span>이벤트 기간</span>
      </div>
      <div className="flex items-center gap-2 mb-[0.31rem]">
        <input
          className="w-1/2 h-12 px-4 border-none outline-none rounded-xl bg-gray50"
          placeholder={getDate()}
          onChange={onChangeA}
          value={valueA}
        />
        ~
        <input
          className="w-1/2 h-12 px-4 border-none outline-none rounded-xl bg-gray50"
          placeholder={getDate()}
          onChange={onChangeB}
          value={valueB}
        />
      </div>
      {wrondMsg !== "" && <div className="text-xs text-red">{wrondMsg}</div>}
    </div>
  );
}
