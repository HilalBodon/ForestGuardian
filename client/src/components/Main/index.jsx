import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DeviceCard from "../DeviceCard";
import AddDeviceForm from "../AddDeviceForm";
import AboutUs from "./AboutUs";
import HowToUse from './HowToUse';
import AccountSettings from "./AccountSettings";
import Dropdown from './DropDown';
import History from './DropDown/History';
import SettingsPage from './DropDown/SettingsPage';
import Analytics from './DropDown/Analytics';
import jwt_decode from "jwt-decode";
import styles from "./main.module.css";
import  {FaBars} from 'react-icons/fa';
import nameLogo from "../../assets/images/nameLogo.svg";
import greenLogo from "../../assets/images/GreenLogo.svg";


const Main = ({ authToken }) => {
  const [userId, setUserId] = useState(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false); 
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);



  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowAddDeviceForm(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
    setShowHistory(false); 
    setShowAnalytics(false)

  };
  
  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
    setShowSettings(false); 
    setShowAddDeviceForm(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
    setShowAnalytics(false)

  };
  
  const handleAnalyticsClick = () => {
    setShowAnalytics(!showAnalytics);
    setShowHistory(false);
    setShowSettings(false); 
    setShowAddDeviceForm(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
  };
  

  const handleAddDeviceClick = () => {
    setShowAddDeviceForm(!showAddDeviceForm);
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 

  };

  const handleAboutUsClick = () => {
    setShowAboutUs(true);
    setShowAddDeviceForm(false);
    setShowHowToUse(false);
    setShowAccountSettings(false); 
  };

  const handleBackClick = () => {
    setShowAboutUs(false);
    setShowHowToUse(false);
    setShowAccountSettings(false); 
    setShowSettings(false)
    setShowHistory(false)
    setShowAnalytics(false);
  };


   const handleHowToUseClick = () => {
    setShowHowToUse(true);
    setShowAboutUs(false);
    setShowAddDeviceForm(false);
    setShowAccountSettings(false); 
  };

  const handleAccountSettingsClick = () => {
    setShowAccountSettings(true);
    setShowAboutUs(false);
    setShowAddDeviceForm(false);
    setShowHowToUse(false);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const decodedToken = jwt_decode(authToken);
    const fetchedUserId = decodedToken._id;
    setUserId(fetchedUserId);

    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/devices", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setDevices(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDevices();
  }, [authToken]);

  const handleDeviceAdded = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
    setIsDropdownOpen(false);  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
    setIsDropdownOpen(false);    
  };


    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          (isSideMenuOpen && !sideMenuRef.current?.contains(e.target)) ||
          (isDropdownOpen && !dropdownRef.current?.contains(e.target))
        ) {
          closeSideMenu();
          closeDropdown();
        }
      };

      if (isSideMenuOpen || isDropdownOpen) {
        window.addEventListener('click', handleOutsideClick);
      } else {
        window.removeEventListener('click', handleOutsideClick);
      }

      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, [isSideMenuOpen, isDropdownOpen]);

  



  const renderContent = () => {
    if (showAddDeviceForm) {
      return (
      <AddDeviceForm
        authToken={authToken}
        onDeviceAdded={handleDeviceAdded}
        setShowAddDeviceForm={setShowAddDeviceForm}
        handleBackClick={handleBackClick} // Pass the handleBackClick prop
      />
      );
    } else if (showAboutUs) {
      return <AboutUs handleBackClick={handleBackClick} />;
    } else if (showHowToUse) {
      return <HowToUse handleBackClick={handleBackClick} />;
    } else if (showAccountSettings) {
      return <AccountSettings handleBackClick={handleBackClick} />;
    } else if (showSettings) {
      return <SettingsPage handleBackClick={handleBackClick}/>;
    } else if (showHistory) {
      return <History handleBackClick={handleBackClick} />;
    } else if (showAnalytics) {
      return <Analytics handleBackClick={handleBackClick}/>;
    } else {
      return devices.map((device) => (
        <DeviceCard
          key={device._id}
          device={device}
          authToken={authToken}
          userId={userId}
        />
      ));
    }
  };
  


  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <p className={styles.menuIcon}><FaBars onClick={toggleSideMenu} /></p>
        {isSideMenuOpen && (
          <div className={styles.overlay}></div>
        )}
        <div
          ref={sideMenuRef}
          className={`${styles.sideMenu} ${isSideMenuOpen ? styles.open : ''}`}
        >
        <div className={styles.greenLogo}>
          <img  src={greenLogo} alt="Green Guardian Logo" /> 
        </div>
        <div className={styles.sideMenuMain}>
          <div className={styles.sideMenuContent}>
            
            <a onClick={() => {setShowAddDeviceForm(true) }} 
          className={styles.sideMenuItem}>
              Add Device
            </a>

            <a onClick={handleAboutUsClick} className={styles.sideMenuItem}>
            About Us
          </a>
            <a  onClick={handleHowToUseClick} className={styles.sideMenuItem}>
              How to Use App
            </a>
            <a  onClick={handleAccountSettingsClick} className={styles.sideMenuItem}>
              Account Settings
            </a>
            <a   onClick={handleLogout}className={styles.sideMenuItem}> 
              Logout
            </a>

            </div>

            <div className={styles.sidenameLogo}><img src={nameLogo} alt="nameLogo" /></div>
          </div>
        </div>
        <div className={styles.logoDot}>
         
        <div className={styles.devices_container}>
  {showAddDeviceForm ? (
    <h1 className={styles.navbarHead}>Add New Device</h1>
  ) : showAboutUs ? (
    <h1 className={styles.navbarHead}>About Us</h1>
  ) : showHowToUse ? (
    <h1 className={styles.navbarHead}>How to Use</h1>
  ) : (
    <div><img className={styles.nameLogo} src={nameLogo} alt="NameLogo" /></div>
  )}
</div>


      <Dropdown
        ref={dropdownRef}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
        handleSettingsClick={handleSettingsClick}
        handleHistoryClick={handleHistoryClick}
        handleAnalyticsClick={handleAnalyticsClick}
        handleBackClick={handleBackClick}
      />

        </div>
      </nav>

      <div className={styles.devices_container}>
        {renderContent()}
      </div>

    </div>
  );
};

export default Main;




// import React, { useState, useEffect, useRef } from 'react';
// import axios from "axios";
// import DeviceCard from "../DeviceCard";
// import AddDeviceForm from "../AddDeviceForm";
// import AboutUs from "./AboutUs";
// import HowToUse from "./HowToUse"; // Import your HowToUse component
// import AccountSettings from "./AccountSettings"; // Import your AccountSettings component
// import jwt_decode from "jwt-decode";
// import styles from "./styles.module.css";
// import { FaBars } from 'react-icons/fa';
// import { FaEllipsisV } from 'react-icons/fa';
// import nameLogo from "../../assets/images/nameLogo.svg";
// import greenLogo from "../../assets/images/GreenLogo.svg";

// import SideMenu from '../SideMenu';
// import Navbar from '../NavBar';

// const Main = ({ authToken }) => {
//   const [userId, setUserId] = useState(null);
//   const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
//   const [devices, setDevices] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
//   const [currentContent, setCurrentContent] = useState("devices"); // Manage current content state
//   const sideMenuRef = useRef(null);

//   const handleAddDeviceClick = () => {
//     setCurrentContent("addDevice"); // Set the current content to "addDevice"
//     setShowAddDeviceForm(true);
//   };

//   const handleAboutUsClick = () => {
//     setCurrentContent("aboutUs"); // Set the current content to "aboutUs"
//     setShowAddDeviceForm(false);
//   };

//   const handleHowToUseClick = () => {
//     setCurrentContent("howToUse"); // Set the current content to "howToUse"
//     setShowAddDeviceForm(false);
//   };

//   const handleAccountSettingsClick = () => {
//     setCurrentContent("accountSettings"); // Set the current content to "accountSettings"
//     setShowAddDeviceForm(false);
//   };

//   // Rest of your code...

//   return (
//     <div className={styles.main_container}>
//       <Navbar
//         toggleSideMenu={toggleSideMenu}
//         isSideMenuOpen={isSideMenuOpen}
//         authToken={authToken}
//         handleLogout={handleLogout}
//       />
//       <div className={styles.devices_container}>
//         {currentContent === "devices" && (
//           // Render your Devices content here
//           devices.map((device) => (
//             <DeviceCard
//               key={device._id}
//               device={device}
//               authToken={authToken}
//               userId={userId}
//             />
//           ))
//         )}
//         {currentContent === "addDevice" && (
//           // Render your AddDeviceForm component here
//           <AddDeviceForm
//             authToken={authToken}
//             onDeviceAdded={handleDeviceAdded}
//             setShowAddDeviceForm={setShowAddDeviceForm}
//           />
//         )}
//         {currentContent === "aboutUs" && (
//           // Render your AboutUs component here
//           <AboutUs handleBackClick={handleBackClick} />
//         )}
//         {currentContent === "howToUse" && (
//           // Render your HowToUse component here
//           <HowToUse handleBackClick={handleBackClick} />
//         )}
//         {currentContent === "accountSettings" && (
//           // Render your AccountSettings component here
//           <AccountSettings />
//         )}
//       </div>
//       <SideMenu
//         sideMenuRef={sideMenuRef}
//         setShowAddDeviceForm={setShowAddDeviceForm}
//         handleAboutUsClick={handleAboutUsClick}
//         handleHowToUseClick={handleHowToUseClick}
//         handleAccountSettingsClick={handleAccountSettingsClick}
//         closeSideMenu={closeSideMenu}
//         handleLogout={handleLogout}
//       />
//     </div>
//   );
// };

// export default Main;
