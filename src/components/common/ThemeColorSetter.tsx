import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const violet300 = ["/login"];
const violet500 = ["/", "/events", "/photographers", "/photographer"];

export default function ThemeColorSetter() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let color = "#ffffff";

    if (violet300.includes(path)) {
      color = "#7B35D3";
    } else if (violet500.includes(path)) {
      color = "#622AA9";
    }

    let themeMeta = document.querySelector("meta[name='theme-color']");
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeMeta);
    }

    themeMeta.setAttribute("content", color);
  }, [location.pathname]);

  return null;
}
