import React from "react";
import styles from "./live.module.css";
import Flag from "react-world-flags";
import { formatNumber, iso3ToIso2, getStatusBadgeClass } from "../../utils/helpers";

const LiveTab = ({ items }) => {
  return (
    <div className={styles.liveContent}>
      <div className={styles.tableHeader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>App</div>
        <div>AA</div>
        <div>Team</div>
      </div>

      {items.map((item, idx) => (
        <div key={item.id || idx} className={`${styles.tableRow} ${idx !== items.length - 1 ? styles.tableRowWithBorder : ""}`}>
          <div className={`${styles.gymnastCell} ${styles.gymnastRow}`}>
            <div className={styles.gymnastCell}>
              <div className={styles.inquiryWrapper}>
                {item.inquiry && (
                  <span className={styles.inquiryBadge}>
                    Inquiry Submitted
                  </span>
                )}
              </div>
            </div>
            <img
              src={`/assets/${item.apparatus}.svg`}
              alt={item.apparatus}
              className={styles.apparatusIcon}
              loading="lazy"
            />
          </div>

          <div className={styles.gymnastCell}>
            <span className={styles.flagWrapper}>
              <Flag
                code={iso3ToIso2[item.nation] || item.nation}
                className={styles.flag}
              />
              {item.nation}
            </span>
          </div>

          <div className={styles.gymnastCell}>
            <span>{item.bib}</span>
          </div>

          <div className={styles.gymnastCell}>
            <span>{item.name}</span>
          </div>

          <div>
            {item.scores ? (
              <div style={{ display: "flex", gap: "20px" }}>
                <span>D: {formatNumber(item.scores.D)}</span>
                <span>E: {formatNumber(item.scores.E)}</span>
                <span>P: {formatNumber(item.scores.P)}</span>
              </div>
            ) : item.status ? (
              <span
                className={`${styles.statusBadge} ${styles[getStatusBadgeClass(item.status)]}`}
              >
                {item.status}
              </span>
            ) : null}
          </div>

          <div className={styles.gymnastCell}>
            <span>{item?.judgeScores?.AA?.[0]}</span>
            {item?.judgeScores?.AA?.[1] != null && (
              <span className={styles.blueBox}>{item.judgeScores.AA[1]}</span>
            )}
          </div>

          <div className={styles.gymnastCell}>
            <span>{item?.judgeScores?.Team?.[0]}</span>
            {item?.judgeScores?.Team?.[1] != null && (
              <span className={styles.blueBox}>{item.judgeScores.Team[1]}</span>
            )}
          </div>

          <div className={styles.gymnastCell}>
            <span>{item?.judgeScores?.App?.[0]}</span>
            {item?.judgeScores?.App?.[1] != null && (
              <span className={styles.blueBox}>{item.judgeScores.App[1]}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(LiveTab);
