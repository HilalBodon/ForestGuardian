import React from 'react';
import styles from "./AccountSettings.module.css";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";

const AccountSettings = ({ handleBackClick }) => {
  return (
    <div className={styles.accountSettingsContainer}>
      <div className={styles.iconDiv}>
      <FaUserAlt className={styles.icon}/>
      <RiLockPasswordFill className={styles.icon}/>
      </div>
      <div className={styles.settingItem}>
        <label htmlFor="userId">User ID</label>
        <input type="text" id="userId" name="userId" />
      </div>
      <div className={styles.settingItem}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className={styles.settingItem}>
        <label htmlFor="fullname">Full Name</label>
        <input type="text" id="fullname" name="fullname" />
      </div>
      <div className={styles.settingItem}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className={styles.settingItem}>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default AccountSettings;
