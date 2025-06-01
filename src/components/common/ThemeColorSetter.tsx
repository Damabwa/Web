import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const violet300 = ["/", "/login", "/events", "/photographers", "/photographer"];

export default function ThemeColorSetter() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let color = "#ffffff";

    if (violet300.includes(path)) {
      color = "#7B35D3";
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
