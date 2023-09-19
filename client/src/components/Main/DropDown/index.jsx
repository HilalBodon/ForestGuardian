// import React from 'react';
// import styles from './DropDown.module.css';
// import  {FaEllipsisV} from 'react-icons/fa';


// const Dropdown = ({ isDropdownOpen, toggleDropdown, closeDropdown }) => {
//   return (
//     <div className={styles.dotesIconDiv}>
//       <FaEllipsisV className={styles.dotesIcon} onClick={toggleDropdown} />
//       {isDropdownOpen && (
//         <div className={styles.dropdownContent}>
//           <a onClick={closeDropdown} className={styles.dropdownItem}>
//             <span className={styles.icon}>🔧</span> Settings
//           </a>
//           <a onClick={closeDropdown} className={styles.dropdownItem}>
//             <span className={styles.icon}>🕒</span> History
//           </a>
//           <a onClick={closeDropdown} className={styles.dropdownItem}>
//             <span className={styles.icon}>📊</span> Analytics
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dropdown;


import React from 'react';
import styles from './DropDown.module.css';
import { FaEllipsisV } from 'react-icons/fa';


const Dropdown = ({
    isDropdownOpen,
    toggleDropdown,
    closeDropdown,
    handleSettingsClick,
    handleHistoryClick,
    handleAnalyticsClick,
    handleBackClick, // Add this line
  }) => {
    return (
      <div className={styles.dotesIconDiv}>
        <FaEllipsisV className={styles.dotesIcon} onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className={styles.dropdownContent}>
            <a onClick={() => { handleSettingsClick(); closeDropdown(); }} className={styles.dropdownItem}>
              <span className={styles.icon}>🔧</span> Settings
            </a>
            <a onClick={() => { handleHistoryClick(); closeDropdown(); }} className={styles.dropdownItem}>
              <span className={styles.icon}>🕒</span> History
            </a>
            <a onClick={() => { handleAnalyticsClick(); closeDropdown(); }} className={styles.dropdownItem}>
              <span className={styles.icon}>📊</span> Analytics
            </a>
          </div>
        )}
      </div>
    );
  };
  
export default Dropdown;
