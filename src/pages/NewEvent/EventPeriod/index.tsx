import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface Props {
  onChangeDate: (type: string, date: dayjs.Dayjs | null) => void;
  startedAt: string;
  endedAt: string;
}

export default function EventPeriod({
  onChangeDate,
  startedAt,
  endedAt,
}: Props) {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    if (startedAt && endedAt && !startDate && !endDate) {
      setStartDate(dayjs(startedAt));
      setEndDate(dayjs(endedAt));
    }
  }, [startedAt, endedAt, startDate, endDate]);

  const onChange = (type: string, value: string) => {
    // 네이티브 date 입력값("YYYY-MM-DD" 또는 빈 문자열)을 dayjs|null로 변환해
    // 기존 부모 계약(date.format / null 초기화)을 그대로 유지한다.
    const date = value ? dayjs(value) : null;
    if (type === "START") {
      setStartDate(date);
      // 시작일이 바뀌면 종료일을 초기화(종료일 min이 시작일에 묶이므로 일관성 유지)
      setEndDate(null);
    } else setEndDate(date);
    onChangeDate(type, date);
  };

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="flex flex-col text-sm">
      <div className="font-medium mb-[0.62rem]">
        <span className="text-red mr-[0.12rem]">*</span>
        <span>이벤트 기간</span>
      </div>
      <div className="flex items-center gap-2 mb-[0.31rem]">
        <input
          type="date"
          aria-label="시작 날짜"
          className="w-1/2 h-12 px-4 border-none rounded-xl bg-gray50 outline-none"
          value={startDate ? startDate.format("YYYY-MM-DD") : ""}
          min={today}
          onChange={(e) => onChange("START", e.target.value)}
        />
        <p>~</p>
        <input
          type="date"
          aria-label="종료 날짜"
          className="w-1/2 h-12 px-4 border-none rounded-xl bg-gray50 outline-none disabled:opacity-50"
          value={endDate ? endDate.format("YYYY-MM-DD") : ""}
          min={startDate ? startDate.format("YYYY-MM-DD") : today}
          disabled={!startDate}
          onChange={(e) => onChange("END", e.target.value)}
        />
      </div>
    </div>
  );
}
