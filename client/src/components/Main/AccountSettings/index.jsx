import React from 'react';
import styles from "./AccountSettings.module.css";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {BsFillQuestionSquareFill} from "react-icons/bs"; 
import {MdAlternateEmail} from "react-icons/md"; 
import {BsFillTelephoneFill} from "react-icons/bs"; 

const AccountSettings = ({ handleBackClick }) => {
  return (
    <div className={styles.accountSettingsContainer}>

      <div className={styles.settingItem}>
      <FaUserAlt className={styles.icon}/>
        <label htmlFor="userId">User ID</label>
        <input type="text" id="userId" name="userId" />
      </div>
      <div className={styles.settingItem}>
      <RiLockPasswordFill className={styles.icon}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className={styles.settingItem}>
      <BsFillQuestionSquareFill className={styles.icon}/>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" name="fullname" />
      </div>
      <div className={styles.settingItem}>
      <MdAlternateEmail className={styles.icon}/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className={styles.settingItem}>
      <BsFillTelephoneFill className={styles.icon}/>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default AccountSettings;
