import { useEffect } from "react";
import loading from "../../assets/imgs/loading_damaba.gif";

interface Props {
  isLoading: boolean;
}

export default function Loading({ isLoading }: Props) {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) return <></>;
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white/40">
      <img className="object-cover w-20 h-20" src={loading} />
    </div>
  );
}
