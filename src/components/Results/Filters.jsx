import React from "react";
import styles from "./filters.module.css";
import vault from "/assets/vault.svg";
import floor from "/assets/floor.svg";
import pommel from "/assets/pommel.svg";
import rings from "/assets/rings.svg";
import parallel from "/assets/parallel.svg";
import highbar from "/assets/highbar.svg";

const apparatusIcons = [
  { name: "Floor", src: floor },
  { name: "Pommel", src: pommel },
  { name: "Rings", src: rings },
  { name: "Vault", src: vault },
  { name: "Parallel", src: parallel },
  { name: "Highbar", src: highbar },
];

export default function Filters({
  gender,
  setGender,
  stage,
  setStage,
  type,
  setType,
  ageGroup,
  setAgeGroup,
  selectedApparatus,
  setSelectedApparatus,
}) {
  const renderButtons = (options, selectedValue, setSelected) =>
    options.map((label) => (
      <button
        key={label}
        className={`${styles.filterBtn} ${selectedValue === label ? styles.active : ""}`}
        onClick={() => setSelected(selectedValue === label ? null : label)}
      >
        {label}
      </button>
    ));

  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <div className={styles.filterGroupBox}>
          {renderButtons(["MAG", "WAG"], gender, setGender)}
        </div>
        <div className={styles.filterGroupBox}>
          {renderButtons(["Qualification", "Final"], stage, setStage)}
        </div>
        <div className={styles.filterGroupBox}>
          {renderButtons(["Apparatus", "Team", "All-around"], type, setType)}
        </div>
        <div className={styles.filterGroupBox}>
          {renderButtons(["Seniors", "Juniors"], ageGroup, setAgeGroup)}
        </div>
      </div>

      {type === "Apparatus" && (
        <div className={styles.apparatusContainer}>
          {apparatusIcons.map((app) => (
            <div
              key={app.name}
              className={`${styles.iconWrapper} ${
                selectedApparatus === app.name ? styles.selected : ""
              }`}
              onClick={() =>
                setSelectedApparatus(
                  selectedApparatus === app.name ? null : app.name
                )
              }
            >
              <img src={app.src} alt={app.name} className={styles.icon} />
              {selectedApparatus === app.name && (
                <div className={styles.label}>{app.name}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
