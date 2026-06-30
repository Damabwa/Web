import { fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import EventPeriod from ".";

describe("EventPeriod", () => {
  it("종료 날짜는 시작 날짜 입력 전까지 비활성화된다", () => {
    render(<EventPeriod onChangeDate={jest.fn()} startedAt="" endedAt="" />);
    expect(screen.getByLabelText("종료 날짜")).toBeDisabled();
  });

  it("시작 날짜 입력 시 onChangeDate가 dayjs로 호출되고 종료가 활성화된다", () => {
    const onChangeDate = jest.fn();
    render(<EventPeriod onChangeDate={onChangeDate} startedAt="" endedAt="" />);

    fireEvent.change(screen.getByLabelText("시작 날짜"), {
      target: { value: "2030-01-01" },
    });

    expect(onChangeDate).toHaveBeenCalledTimes(1);
    const [type, date] = onChangeDate.mock.calls[0];
    expect(type).toBe("START");
    expect(dayjs.isDayjs(date)).toBe(true);
    expect(date.format("YYYY-MM-DD")).toBe("2030-01-01");

    const end = screen.getByLabelText("종료 날짜");
    expect(end).not.toBeDisabled();
    // 종료일 최소값이 시작일로 묶인다
    expect(end).toHaveAttribute("min", "2030-01-01");
  });

  it("시작 날짜를 비우면 onChangeDate가 null로 호출된다", () => {
    const onChangeDate = jest.fn();
    render(<EventPeriod onChangeDate={onChangeDate} startedAt="" endedAt="" />);

    const start = screen.getByLabelText("시작 날짜");
    // 먼저 값을 넣은 뒤 비워야 controlled input의 change가 발화한다
    fireEvent.change(start, { target: { value: "2030-01-01" } });
    onChangeDate.mockClear();
    fireEvent.change(start, { target: { value: "" } });

    expect(onChangeDate).toHaveBeenCalledWith("START", null);
  });

  it("시작 날짜의 최소값은 오늘로 제한된다", () => {
    render(<EventPeriod onChangeDate={jest.fn()} startedAt="" endedAt="" />);
    expect(screen.getByLabelText("시작 날짜")).toHaveAttribute(
      "min",
      dayjs().format("YYYY-MM-DD")
    );
  });

  it("시작 날짜를 변경하면 종료 날짜가 초기화된다", () => {
    render(<EventPeriod onChangeDate={jest.fn()} startedAt="" endedAt="" />);
    const start = screen.getByLabelText("시작 날짜");
    const end = screen.getByLabelText("종료 날짜");

    fireEvent.change(start, { target: { value: "2030-01-01" } });
    fireEvent.change(end, { target: { value: "2030-01-10" } });
    expect(end).toHaveValue("2030-01-10");

    // 시작일을 바꾸면 종료일이 비워진다
    fireEvent.change(start, { target: { value: "2030-02-01" } });
    expect(end).toHaveValue("");
  });

  it("startedAt/endedAt가 주어지면 초기값으로 복원한다", () => {
    render(
      <EventPeriod
        onChangeDate={jest.fn()}
        startedAt="2030-01-01"
        endedAt="2030-01-05"
      />
    );
    expect(screen.getByLabelText("시작 날짜")).toHaveValue("2030-01-01");
    expect(screen.getByLabelText("종료 날짜")).toHaveValue("2030-01-05");
  });
});
