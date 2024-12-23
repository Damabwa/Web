interface Props {
  setRoleFunc: (name: string) => void;
}

export default function SelectRole({ setRoleFunc }: Props) {
  return (
    <div className="flex-col">
      <div className="cursor-pointer" onClick={() => setRoleFunc("user")}>
        유저로 시작
      </div>
      <div
        className="cursor-pointer"
        onClick={() => setRoleFunc("photographer")}
      >
        작가로 시작
      </div>
    </div>
  );
}
