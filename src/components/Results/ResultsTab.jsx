import React, { useState } from "react";
import styles from "./resultstab.module.css";
import Flag from "react-world-flags";
import Filters from "./Filters";
import { iso3ToIso2 } from "../../utils/helpers";

const getJudgeScoreKey = (type) => {
  if (type === "Apparatus") return "App";
  if (type === "All-around") return "AA";
  return type;
};

const ResultsTab = ({ items }) => {
  const [gender, setGender] = useState(null);
  const [stage, setStage] = useState(null);
  const [type, setType] = useState(null);
  const [ageGroup, setAgeGroup] = useState(null);
  const [selectedApparatus, setSelectedApparatus] = useState(null);

  const filteredItems = items.filter((item) => {
    const scoreKey = getJudgeScoreKey(type);
    return (
      (!gender || item.category === gender) &&
      (!stage || item.stage === stage) &&
      (!type || item.judgeScores?.[scoreKey]) &&
      (!ageGroup || item.ageGroup === ageGroup) &&
      (!selectedApparatus || item.apparatus?.toLowerCase() === selectedApparatus.toLowerCase())
    );
  });

  return (
    <div>
      <Filters
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

      <div className={styles.liveContent}>
        <div className={styles.tableHeader}>
          <div>Rank</div>
          <div>Team</div>
          <div>Bib</div>
          <div>Name</div>
          <div>D</div>
          <div>E</div>
          <div>Pen</div>
          <div>Total</div>
        </div>

        {filteredItems.length === 0 ? (
          <div className={styles.noResults}>No results found.</div>
        ) : (
          filteredItems.map((item, idx) => (
            <div
              key={idx}
              className={idx !== filteredItems.length - 1 ? styles.tableRowWithBorder : ""}
            >
              {item.performances.map((perf, pIdx) => (
                <div key={pIdx} className={styles.tableRow}>
                  <div className={styles.gymnastCell}>
                    {pIdx === 0 && <div className={styles.blueBox}>{item.rank}</div>}
                  </div>

                  <div className={styles.gymnastCell}>
                    {pIdx === 0 && (
                      <span className={styles.flagWrapper}>
                        <Flag
                          code={iso3ToIso2[item.nation] || item.nation}
                          className={styles.flag}
                        />
                        {item.nation}
                      </span>
                    )}
                  </div>

                  <div className={styles.gymnastCell}>
                    {pIdx === 0 && item.bib}
                  </div>

                  <div className={styles.gymnastCell}>
                    {pIdx === 0 && item.name}
                  </div>

                  <div className={styles.gymnastCell}>
                    {perf?.scores?.D?.toFixed(3)}
                  </div>

                  <div className={styles.gymnastCell}>
                    {perf?.scores?.E?.toFixed(3)}
                  </div>

                  <div className={styles.gymnastCell}>
                    {perf?.scores?.P?.toFixed(3)}
                  </div>

                  <div className={styles.gymnastCell}>
                    {perf?.total?.toFixed(3)}
                  </div>
                </div>
              ))}

              <div className={`${styles.tableRow} ${styles.finalTotalRow}`}>
                <div className={styles.gymnastCell}></div>
                <div className={styles.gymnastCell}></div>
                <div className={styles.gymnastCell}></div>
                <div className={styles.gymnastCell}></div>
                <div className={styles.gymnastCell}></div>
                <div className={styles.gymnastCell}></div>
                <div className={styles.gymnastCell}></div>
                <div
                  className={styles.gymnastCell}
                  style={{ color: "#FFA500", fontWeight: "bold" }}
                >
                  {item.final?.total?.toFixed(3)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
