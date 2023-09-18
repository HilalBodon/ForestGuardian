import React from 'react';
import styles from './DropDown.module.css';
import  {FaEllipsisV} from 'react-icons/fa';


const Dropdown = ({ isDropdownOpen, toggleDropdown, closeDropdown }) => {
  return (
    <div className={styles.dotesIconDiv}>
      <FaEllipsisV className={styles.dotesIcon} onClick={toggleDropdown} />
      {isDropdownOpen && (
        <div className={styles.dropdownContent}>
          <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
            <span className={styles.icon}>🔧</span> Settings
          </a>
          <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
            <span className={styles.icon}>🕒</span> History
          </a>
          <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
            <span className={styles.icon}>📊</span> Analytics
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
