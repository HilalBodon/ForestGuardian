import React, { forwardRef } from 'react';
import styles from './DropDown.module.css';
import { FaEllipsisV } from 'react-icons/fa';

const Dropdown = ({
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleSettingsClick,
    handleHistoryClick,
    handleAnalyticsClick
  }, ref) => { 
    return (
      <div className={styles.dotesIconDiv}>
        <FaEllipsisV className={styles.dotesIcon} onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>

            <a onClick={() => { handleHistoryClick(); closeDropdown(); }} className={styles.dropdownItem}>
              <span className={styles.icon}>🕒</span> History
            </a>

          </div>
        )}
      </div>
    );
  };
  
export default forwardRef(Dropdown);
