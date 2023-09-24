import React, { useState, useEffect } from 'react';
import styles from "./AccountSettings.module.css";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidEditAlt } from "react-icons/bi";
import axios from 'axios';

const AccountSettings = ({ userData, handleBackClick }) => {
  const { _id, email: initialEmail, fullName: initialFullName, password: initialPassword, notifyEmail: initialNotifyEmail, phoneNumber: initialPhoneNumber } = userData.user;

  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState(initialFullName);
  const [password, setPassword] = useState(initialPassword);
  const [notifyEmail, setNotifyEmail] = useState(initialNotifyEmail);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);

  const [isPasswordEditing, setPasswordEditing] = useState(false);
  const [isFullNameEditing, setFullNameEditing] = useState(false);
  const [isNotifyEmailEditing, setNotifyEmailEditing] = useState(false);
  const [isPhoneNumberEditing, setPhoneNumberEditing] = useState(false);

  const handleEditClick = (fieldName) => {
    switch (fieldName) {
      case 'password':
        setPasswordEditing(!isPasswordEditing);
        break;
      case 'fullName':
        setFullNameEditing(!isFullNameEditing);
        break;
      case 'notifyEmail':
        setNotifyEmailEditing(!isNotifyEmailEditing);
        break;
      case 'phoneNumber':
        setPhoneNumberEditing(!isPhoneNumberEditing);
        break;
      default:
        break;
    }
  };

  const handleSaveClick = async () => {
    try {
      const updatedUserData = {
        email,
        fullName,
        password,
        notifyEmail,
        phoneNumber,
      };

      await axios.put(`http://localhost:8080/api/users/${_id}`, updatedUserData);

      setPasswordEditing(false);
      setFullNameEditing(false);
      setNotifyEmailEditing(false);
      setPhoneNumberEditing(false);

      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    setEmail(initialEmail);
    setFullName(initialFullName);
    setPassword(initialPassword);
    setNotifyEmail(initialNotifyEmail);
    setPhoneNumber(initialPhoneNumber);
  }, [initialEmail, initialFullName, initialPassword, initialNotifyEmail, initialPhoneNumber]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.accountSettingsContainer}>
        <div className={styles.iconsDiv}>
          <FaUserAlt className={styles.icon} />
          <RiLockPasswordFill className={styles.icon} />
          <BsFillQuestionSquareFill className={styles.icon} />
          <MdAlternateEmail className={styles.icon} />
          <BsFillTelephoneFill className={styles.icon} />
        </div>

        <div className={styles.labelsDiv}>
          <label htmlFor="userEmail">User Email</label>
          <label htmlFor="password">Password</label>
          <label htmlFor="fullname">Full Name</label>
          <label htmlFor="email">Email</label>
          <label htmlFor="phone">Phone</label>
        </div>

        <div className={styles.inputsDiv}>
          <input type="text" id="userEmail" name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!isPasswordEditing} />
          <input type="text" id="fullname" name="fullname" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={!isFullNameEditing} />
          <input type="email" id="email" name="email" value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)} disabled={!isNotifyEmailEditing} />
          <input type="tel" id="phone" name="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!isPhoneNumberEditing} />
        </div>

        <div className={styles.editDiv}>
          <p></p>
          <BiSolidEditAlt className={styles.editIcon} onClick={() => handleEditClick('password')} />
          <BiSolidEditAlt className={styles.editIcon} onClick={() => handleEditClick('fullName')} />
          <BiSolidEditAlt className={styles.editIcon} onClick={() => handleEditClick('notifyEmail')} />
          <BiSolidEditAlt className={styles.editIcon} onClick={() => handleEditClick('phoneNumber')} />
        </div>

        { isPasswordEditing || isFullNameEditing || isNotifyEmailEditing || isPhoneNumberEditing ? (
          <button className={styles.button} onClick={handleSaveClick}>Save</button>
        ) : null}
      </div>
      <button className={styles.button} onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default AccountSettings;
