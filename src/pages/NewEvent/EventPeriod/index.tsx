import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// 플러그인 등록은 모듈 로드 시 1회만 수행(렌더 본문 호출 안티패턴 제거)
dayjs.extend(customParseFormat);

interface Props {
  onChangeDate: (
    type: string,
    date: React.ChangeEvent<HTMLInputElement>
  ) => void;
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

  const onChange = (type: string, date: any) => {
    if (type === "START") {
      setStartDate(date);
      setEndDate(null);
    } else setEndDate(date);
    // 날짜를 비운 경우(date=null)에도 부모 폼 상태에 전파해 이전 값이 남지 않도록 한다.
    onChangeDate(type, date);
  };

  return (
    <div className="flex flex-col text-sm">
      <div className="font-medium mb-[0.62rem]">
        <span className="text-red mr-[0.12rem]">*</span>
        <span>이벤트 기간</span>
      </div>
      <div className="flex items-center gap-2 mb-[0.31rem]">
        <DatePicker
          className="w-1/2 h-12 px-4 border-none rounded-xl bg-gray50"
          placeholder="시작 날짜"
          value={startDate}
          onChange={(date) => onChange("START", date)}
          disabledDate={(current) =>
            current < dayjs().subtract(1, "day").endOf("day")
          }
        />
        <p>~</p>
        <DatePicker
          className="w-1/2 h-12 px-4 border-none rounded-xl bg-gray50"
          placeholder="종료 날짜"
          value={endDate}
          onChange={(date) => onChange("END", date)}
          disabled={!startDate}
          disabledDate={(current) =>
            current && current.isBefore(startDate, "day")
          }
        />
      </div>
    </div>
  );
}
