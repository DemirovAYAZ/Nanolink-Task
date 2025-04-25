import React, { useState } from 'react';
import styles from './intro.module.css';
import LeftArrow from '/assets/left_arrow.svg';
import Hamburger from '/assets/hamburger.svg';
import Modal from '../shared/Modal';

const Intro = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.intro}>
      <div className={styles.left_arrow}>
        <img src={LeftArrow} alt="left arrow" loading="lazy" />
      </div>

      <div className={styles.intro_info}>
        <div className={styles.intro_info_title}>
          <h2>FIG ARTISTIC GYMNASTICS WORLD CUP</h2>
        </div>
        <div className={styles.intro_info_text}>
          <div>
            <h5>Doha, Qatar</h5>
          </div>
          <div>
            <h5>12/03/2023 - 13/02/2023</h5>
          </div>
        </div>
      </div>

      <div className={styles.hamburger} onClick={() => setIsModalOpen(true)}>
        <img src={Hamburger} alt="menu" loading="lazy" />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Navigation"
      >
        <p>Navigation or content goes here</p>
      </Modal>
    </div>
  );
};

export default React.memo(Intro);
