import React, { useState } from "react";
import styles from "./filtersmobile.module.css";
import vault from "/assets/vault.svg";
import floor from "/assets/floor.svg";
import pommel from "/assets/pommel.svg";
import rings from "/assets/rings.svg";
import parallel from "/assets/parallel.svg";
import highbar from "/assets/highbar.svg";
import { LuFilter } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const apparatusIcons = [
  { name: "Floor", src: floor },
  { name: "Pommel", src: pommel },
  { name: "Rings", src: rings },
  { name: "Vault", src: vault },
  { name: "Parallel", src: parallel },
  { name: "Highbar", src: highbar },
];

export default function FiltersMobile({
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
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

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

  const selectedFilters = [
    gender,
    stage,
    type,
    type === "Apparatus" && selectedApparatus,
    ageGroup,
  ].filter(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.filterToggleBtn} onClick={togglePanel}>
          <LuFilter size={20} style={{ marginRight: "8px" }} />
          Filter
        </button>
      </div>

      {selectedFilters.length > 0 && (
        <div className={styles.selectedFilters}>
          {selectedFilters.map((filter, idx) => {
            const handleRemove = () => {
              if (filter === gender) setGender(null);
              else if (filter === stage) setStage(null);
              else if (filter === type) setType(null);
              else if (filter === ageGroup) setAgeGroup(null);
              else if (filter === selectedApparatus) setSelectedApparatus(null);
            };

            return (
              <div key={idx} className={styles.selectedFilterTag} onClick={handleRemove}>
                <IoClose className={styles.cancel} /> {filter}
              </div>
            );
          })}
        </div>
      )}
      {isOpen && (
        <div className={styles.filterPanel}>
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
      )}
    </div>
  );
}
