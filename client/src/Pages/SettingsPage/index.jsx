import React, { useState } from 'react';
import styles from "./SettingsStyle.module.css";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';
import { IoMdNotificationsOff } from 'react-icons/io';
import { GiAxeInLog } from 'react-icons/gi';
import { GiSawedOffShotgun } from 'react-icons/gi';

const SettingsPage = ({ handleBackClick }) => {
  const [toggleStates, setToggleStates] = useState([false, false, false, false, false]);

  const toggleIcon = (index) => {
    if (index !== 3 && index !== 4) {
      const newToggleStates = [...toggleStates];
      newToggleStates[index] = !newToggleStates[index];
      setToggleStates(newToggleStates);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.accountSettingsContainer}>
        <div className={styles.iconsDiv}>
          <MdNotificationsActive className={styles.icon} />
          <IoMdNotificationsOff className={styles.icon} />
          <BsFillQuestionSquareFill className={styles.icon} />
          <GiAxeInLog className={styles.icon} />
          <GiSawedOffShotgun className={styles.icon} />
        </div>

        <div className={styles.labelsDiv}>
          <label>Notify similar sounds</label>
          <label>Notify E-mail after 5 min</label>
          <label>Enable live confirmation</label>
          <label disabled>Axe Sound detection</label>
          <label disabled>Gun Sound detection</label>
        </div>

        <div className={styles.toggleDiv}>
          {toggleStates.map((isToggled, index) => (
            isToggled ? (
              <BsToggleOn key={index} className={styles.toggleIcon} onClick={() => toggleIcon(index)} />
            ) : (
              <BsToggleOff
                key={index}
                className={styles.toggleIcon}
                onClick={() => toggleIcon(index)}
                disabled={index === 3 || index === 4} 
              />
            )
          ))}
        </div>
      </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;