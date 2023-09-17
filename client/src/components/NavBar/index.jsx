// import React, { useState} from 'react';
// import SideMenu from '../SideMenu';
// import { FaBars } from 'react-icons/fa';
// import styles from "./styles.module.css";
// import  {FaEllipsisV} from 'react-icons/fa';
// import nameLogo from "../../assets/images/nameLogo.svg";

// const Navbar = ({ toggleSideMenu, isSideMenuOpen, authToken, handleLogout }) => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);

//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };


//   return (
//     <nav className={styles.navbar}>
//       <p className={styles.menuIcon}><FaBars onClick={toggleSideMenu} /></p>
//       {isSideMenuOpen && (
//         <div className={styles.overlay}></div>
//       )}
//            <div className={styles.logoDot}>
//            <div><img className={styles.nameLogo} src={nameLogo} alt="NameLogo" /></div>
//            <div className={styles.dotesIconDiv}>
//              <FaEllipsisV className={styles.dotesIcon} onClick={toggleDropdown} />
//              {isDropdownOpen && (
//               <div className={styles.dropdownContent}>
//                 <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
//                   <span className={styles.icon}>🔧</span> Settings
//                 </a>
//                 <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
//                   <span className={styles.icon}>🕒</span> History
//                 </a>
//                 <a href="#" onClick={closeDropdown} className={styles.dropdownItem}>
//                   <span className={styles.icon}>📊</span> Analytics
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>

// {/*       
//       <SideMenu
//         authToken={authToken}
//         isSideMenuOpen={isSideMenuOpen}
//         handleLogout={handleLogout}
//       /> */}
//     </nav>
//   );
// };

// export default Navbar;

