import React, { useState } from "react";
import styles from "./livetabmobile.module.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const LiveTabMobile = ({ items }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className={styles.mobileWrapper}>
            {items.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                const hasScores = !!item.scores;
                const notInquiry = !item.inquiry;

                return (
                    <div key={idx}>
                        <div className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}>
                            {item.inquiry && (
                                <div className={styles.inquiryBadge}>Inquiry Submitted</div>
                            )}

                            <div className={styles.header}>
                                <img
                                    src={`/assets/${item.apparatus}.svg`}
                                    alt={item.apparatus}
                                    className={styles.apparatusIcon}
                                />

                                <div className={styles.flagName}>
                                    <span>{item.nation}</span>
                                </div>

                                <div className={styles.flagName}>
                                    <span>{item.name}</span>
                                </div>

                                <div className={styles.score}>
                                    {item?.judgeScores?.App?.[0]?.toFixed(3)}
                                </div>

                                {hasScores && notInquiry ? (
                                    <div onClick={() => toggleExpand(idx)} className={styles.iconToggle}>
                                        {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                ) : (!item.inquiry && item.status) ? (
                                    <span className={`${styles.statusBadge} ${item.status === "Wait" ? styles.wait : styles.go}`}>
                                        {item.status}
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        {isExpanded && hasScores && (
                            <div className={`${styles.details} ${isExpanded ? styles.detailsExpanded : ''}`}>
                                <div className={styles.detailScores}>
                                    <span>D: {item.scores.D.toFixed(3)}</span>
                                    <span>E: {item.scores.E.toFixed(3)}</span>
                                    <span>P: {item.scores.P.toFixed(3)}</span>
                                </div>

                                <div className={styles.detailRow}>
                                    <span>App</span>
                                    <div className={styles.judgeScores}>
                                        <span>{item?.judgeScores?.App?.[0]}</span>
                                        <span className={styles.blueBox}>{item?.judgeScores?.App?.[1]}</span>
                                    </div>
                                </div>

                                <div className={styles.detailRow}>
                                    <span>AA</span>
                                    <div className={styles.judgeScores}>
                                        <span>{item?.judgeScores?.AA?.[0]}</span>
                                        <span className={styles.blueBox}>{item?.judgeScores?.AA?.[1]}</span>
                                    </div>
                                </div>

                                <div className={styles.detailRow}>
                                    <span>Team</span>
                                    <div className={styles.judgeScores}>
                                        <span>{item?.judgeScores?.Team?.[0]}</span>
                                        <span className={styles.blueBox}>{item?.judgeScores?.Team?.[1]}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default LiveTabMobile;
