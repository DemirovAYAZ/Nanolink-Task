import React, { useState } from "react";
import styles from "./resultstabmobile.module.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import FiltersMobile from "./FiltersMobile";

const ResultsTabMobile = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [gender, setGender] = useState(null);
  const [stage, setStage] = useState(null);
  const [type, setType] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [selectedApparatus, setSelectedApparatus] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const getJudgeScoreKey = (type) => {
    if (type === "Apparatus") return "App";
    if (type === "All-around") return "AA";
    return type;
  };

  const scoreKey = getJudgeScoreKey(type);

  const filteredItems = items.filter((item) => {
    return (
      (!gender || item.category === gender) &&
      (!stage || item.stage === stage) &&
      (!type || item.judgeScores?.[scoreKey]) &&
      (!ageGroup || item.ageGroup === ageGroup) &&
      (!selectedApparatus ||
        item.apparatus?.toLowerCase() === selectedApparatus.toLowerCase())
    );
  });

  return (
    <div>
      {/* Filters */}
      <FiltersMobile
        gender={gender}
        setGender={setGender}
        stage={stage}
        setStage={setStage}
        type={type}
        setType={setType}
        ageGroup={ageGroup}
        setAgeGroup={setAgeGroup}
        selectedApparatus={selectedApparatus}
        setSelectedApparatus={setSelectedApparatus}
      />

      <div className={styles.mobileWrapper}>
        {filteredItems.length === 0 ? (
          <div className={styles.noResults}>No results found.</div>
        ) : (
          filteredItems.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div key={idx}>
                <div
                  className={`${styles.card} ${
                    isExpanded ? styles.cardExpanded : ""
                  }`}
                >
                  <div className={styles.header}>
                    <div className={styles.blueBox}>{item.rank}</div>

                    <div className={styles.flagName}>
                      <span>{item.nation}</span>
                    </div>

                    <div className={styles.flagName}>
                      <span>{item.name}</span>
                    </div>

                    <div className={styles.score}>
                      {item.final?.total?.toFixed(3)}
                    </div>

                    <div
                      onClick={() => toggleExpand(idx)}
                      className={styles.iconToggle}
                    >
                      {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div
                    className={`${styles.details} ${
                      isExpanded ? styles.detailsExpanded : ""
                    }`}
                  >
                    <div className={styles.detailScores}>
                      <span>
                        D: {item.performances[0]?.scores.D.toFixed(3)}
                      </span>
                      <span>
                        E: {item.performances[0]?.scores.E.toFixed(3)}
                      </span>
                      <span>
                        P: {item.performances[0]?.scores.P.toFixed(3)}
                      </span>
                    </div>

                    <div className={styles.detailRow}>
                      <span>App</span>
                      <div className={styles.judgeScores}>
                        <span>{item?.judgeScores?.App?.[0]}</span>
                      </div>
                    </div>

                    <div className={styles.detailRow}>
                      <span>AA</span>
                      <div className={styles.judgeScores}>
                        <span>{item?.judgeScores?.AA?.[0]}</span>
                      </div>
                    </div>

                    <div className={styles.detailRow}>
                      <span>Team</span>
                      <div className={styles.judgeScores}>
                        <span>{item?.judgeScores?.Team?.[0]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ResultsTabMobile;
