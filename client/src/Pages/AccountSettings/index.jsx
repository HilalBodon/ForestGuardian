import React from 'react';
import styles from "./AccountSettings.module.css";
import {FaUserAlt} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {BsFillQuestionSquareFill} from "react-icons/bs"; 
import {MdAlternateEmail} from "react-icons/md"; 
import {BsFillTelephoneFill} from "react-icons/bs"; 
import {BiSolidEditAlt} from "react-icons/bi"; 

const AccountSettings = ({  userData ,handleBackClick}) => {
console.log(userData);
const { email, fullName, password ,notifyEmail,phoneNumber} = userData.user;

  return (
    <div className={styles.mainDiv}>
    <div className={styles.accountSettingsContainer}>
    <div className={styles.iconsDiv}>
      <FaUserAlt className={styles.icon}/>
      <RiLockPasswordFill className={styles.icon}/>
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
          <input type="text" id="userEmail" name="userEmail" defaultValue={email} disabled />
          <input type="password" id="password" name="password" defaultValue={password} />
          <input type="text" id="fullname" name="fullname" defaultValue={fullName} />
          <input type="email" id="email" name="email" defaultValue={notifyEmail} />
          <input type="tel" id="phone" name="phone" defaultValue={phoneNumber} />
    </div>


    <div className={styles.editDiv}>
      <p></p>
      <BiSolidEditAlt className={styles.editIcon}/>
      <BiSolidEditAlt className={styles.editIcon}/>
      <BiSolidEditAlt className={styles.editIcon}/>
      <BiSolidEditAlt className={styles.editIcon}/>
    </div>

    </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default AccountSettings;