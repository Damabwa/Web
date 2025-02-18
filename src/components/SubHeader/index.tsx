import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back.svg";

interface Props {
  title: string;
}

export default function SubHeader({ title }: Props) {
  const navigation = useNavigate();
  return (
    <div className="relative flex items-center justify-center h-12 font-semibold bg-white">
      <img
        className="absolute left-0 w-6 h-6 cursor-pointer"
        src={icn_back}
        onClick={() => navigation(-1)}
      />
      <div>{title}</div>
      <div />
    </div>
  );
}
