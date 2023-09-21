
import React, { useState } from 'react';
import styles from "./SettingsStyle.module.css";
import {BsFillQuestionSquareFill} from "react-icons/bs"; 
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import {MdNotificationsActive} from 'react-icons/md';
import {IoMdNotificationsOff} from 'react-icons/io';
import {GiAxeInLog} from 'react-icons/gi';
import {GiSawedOffShotgun} from 'react-icons/gi';

const SettingsPage = ({ handleBackClick }) => {

  const [isToggled, setIsToggled] = useState(false);

  const toggleIcon = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={styles.mainDiv}>
    <div className={styles.accountSettingsContainer}>

    <div className={styles.iconsDiv}>
      <MdNotificationsActive className={styles.icon}/>
      <IoMdNotificationsOff className={styles.icon}/>
      <BsFillQuestionSquareFill className={styles.icon}/>
      <GiAxeInLog className={styles.icon}/>
      <GiSawedOffShotgun className={styles.icon}/>
    </div>


    <div className={styles.labelsDiv}>
      <label>Notify similar sounds</label>
      <label>Notify E-mail after 5 min </label>
      <label >Enable live confirmation</label>
      <label disabled>Axe Sound detection</label>
      <label>Gun Sound detection</label>
    </div>


    <div className={styles.toggleDiv}>
      {isToggled ? (
        <BsToggleOn className={styles.toggleIcon} onClick={toggleIcon} />
      ) : (
        <BsToggleOff className={styles.toggleIcon} onClick={toggleIcon} />
      )}
      {isToggled ? (
        <BsToggleOn className={styles.toggleIcon} onClick={toggleIcon} />
      ) : (
        <BsToggleOff className={styles.toggleIcon} onClick={toggleIcon} />
      )}
      {isToggled ? (
        <BsToggleOn className={styles.toggleIcon} onClick={toggleIcon} />
      ) : (
        <BsToggleOff className={styles.toggleIcon} onClick={toggleIcon} />
      )}
      {isToggled ? (
        <BsToggleOn className={styles.toggleIcon} onClick={toggleIcon} />
      ) : (
        <BsToggleOff className={styles.toggleIcon} onClick={toggleIcon} />
      )}
      {isToggled ? (
        <BsToggleOn className={styles.toggleIcon} onClick={toggleIcon} />
      ) : (
        <BsToggleOff className={styles.toggleIcon} onClick={toggleIcon} />
      )}
    </div>

    </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;