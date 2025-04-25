import React, { useEffect, useState } from "react";
import ResultsTab from "./ResultsTab";
import ResultsTabMobile from "./ResultsTabMobile";

const ResultsTabWrapper = ({ items }) => {
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

  return isMobile ? <ResultsTabMobile items={items} /> : <ResultsTab items={items} />;
};

export default ResultsTabWrapper;
