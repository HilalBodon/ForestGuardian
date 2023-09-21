
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

const SettingsPage = ({ handleBackClick }) => {

  return (
    <div className={styles.mainDiv}>
    <div className={styles.accountSettingsContainer}>

    <div className={styles.iconsDiv}>
      <MdNotificationsActive className={styles.icon}/>
      <IoMdNotificationsOff className={styles.icon}/>
      <BsFillQuestionSquareFill className={styles.icon}/>
      <MdAlternateEmail className={styles.icon}/>
      <BsFillTelephoneFill className={styles.icon}/>
    </div>


    <div className={styles.labelsDiv}>
      <label htmlFor="userEmail">User Email</label>
      <label htmlFor="password">Password</label>
      <label htmlFor="fullname">Full Name</label>
      <label htmlFor="email">Email</label>
      <label htmlFor="phone">Phone</label>
    </div>


    <div className={styles.inputsDiv}>
      <input type="text" id="userEmail" name="userEmail" />
      <input type="password" id="password" name="password" />
      <input type="text" id="fullname" name="fullname" />
      <input type="email" id="email" name="email" />
      <input type="tel" id="phone" name="phone" />
    </div>


    <div className={styles.editDiv}>
      <p></p>
      <BsToggleOn className={styles.editIcon}/>
      <BsToggleOn className={styles.editIcon}/>
      <BsToggleOn className={styles.editIcon}/>
      <BsToggleOn className={styles.editIcon}/>
    </div>

    </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;