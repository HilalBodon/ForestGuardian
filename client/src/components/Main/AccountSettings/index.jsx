import React from 'react';
import styles from "./AccountSettings.css";

const AccountSettings = ({ handleBackClick }) => {
  return (
    <div className={styles.accountSettingsContainer}>
      <div className={styles.settingItem}>
        <label htmlFor="userEmail">User Email</label>
        <input type="text" id="userEmail" name="userEmail" disabled />
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
