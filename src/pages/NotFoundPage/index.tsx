import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigation = useNavigate();
  useEffect(() => {
    navigation(`/`);
  });

  return <div>Not Found Page</div>;
}
