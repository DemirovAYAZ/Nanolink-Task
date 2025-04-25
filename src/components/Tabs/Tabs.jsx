import React, { useEffect, useRef, useState } from "react";
import styles from "./tabs.module.css";
import liveData from "/public/data/live.json";
import resultsData from "/public/data/results.json";
import LiveTabWrapper from "../Live/LiveTabWrapper";
import ResultsTabWrapper from "../Results/ResultsTabWrapper";

const Tabs = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const indicatorRef = useRef(null);
    const tabsRef = useRef([]);
    const liveItems = liveData[0]?.live || [];
    const resultsItems = resultsData[0]?.results || [];

    const tabItems = ["Live", "Startlist", "Schedule", "Results", "Medals"];

    useEffect(() => {
        const currentTab = tabsRef.current[activeIndex];
        if (currentTab && indicatorRef.current) {
            const tabRect = currentTab.getBoundingClientRect();
            const parentRect = currentTab.parentElement.getBoundingClientRect();
            indicatorRef.current.style.width = `${tabRect.width}px`;
            indicatorRef.current.style.left = `${tabRect.left - parentRect.left}px`;
        }
    }, [activeIndex]);

    return (
        <div className={styles["tabs-wrapper"]}>
            <div className={styles["tabs-container"]}>
                <div className={styles.tabs}>
                    {tabItems.map((item, index) => (
                        <button
                            key={item}
                            className={`${styles.tab} ${activeIndex === index ? styles.active : ""}`}
                            onClick={() => setActiveIndex(index)}
                            ref={(el) => (tabsRef.current[index] = el)}
                        >
                            {item === "Live" && <span className={styles.dot} />}
                            {item}
                        </button>
                    ))}
                    <div className={styles["tab-indicator"]} ref={indicatorRef} />
                    <div className={styles["tab-indicator-track"]} />
                </div>
            </div>

            {activeIndex === 0 && <LiveTabWrapper items={liveItems} />}
            {activeIndex === 3 && <ResultsTabWrapper items={resultsItems} />} 
        </div>
    );
};

export default Tabs;
