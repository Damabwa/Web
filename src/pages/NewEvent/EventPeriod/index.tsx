import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

  dayjs.extend(customParseFormat);

  useEffect(() => {
    if (startedAt && endedAt && !startDate && !endDate) {
      setStartDate(dayjs(startedAt));
      setEndDate(dayjs(endedAt));
    }
  }, [startedAt, endedAt]);

  const onChange = (type: string, date: any) => {
    if (type === "START") {
      setStartDate(date);
      setEndDate(null);
    } else setEndDate(date);
    if (!date) return;
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
