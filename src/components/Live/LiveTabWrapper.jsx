import React, { useEffect, useState } from "react";
import LiveTab from "./LiveTab";
import LiveTabMobile from "./LiveTabMobile";

const LiveTabWrapper = ({ items }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? <LiveTabMobile items={items} /> : <LiveTab items={items} />;
};

export default LiveTabWrapper;
