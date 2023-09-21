
import React from 'react';
import styles from "./SettingsStyle.module.css";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {BsFillQuestionSquareFill} from "react-icons/bs"; 
import {MdAlternateEmail} from "react-icons/md"; 
import {BsFillTelephoneFill} from "react-icons/bs"; 
import {BiSolidEditAlt} from "react-icons/bi"; 
import { BsToggleOn } from 'react-icons/bs';
import { BsToggleOff } from 'react-icons/bs';
import {MdNotificationsActive} from 'react-icons/md';
import {IoMdNotificationsOff} from 'react-icons/io';
import {GiAxeInLog} from 'react-icons/gi';
import {GiSawedOffShotgun} from 'react-icons/gi';

const SettingsPage = ({ handleBackClick }) => {

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
      <BsToggleOn className={styles.toggleIcon}/>
      <BsToggleOn className={styles.toggleIcon}/>
      <BsToggleOn className={styles.toggleIcon}/>
      <BsToggleOn className={styles.toggleIcon}/>
      <BsToggleOn className={styles.toggleIcon}/>
    </div>

    </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;