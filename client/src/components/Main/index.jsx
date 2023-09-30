import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DeviceCard from "../DeviceCard";
import AddDeviceForm from "../AddDeviceForm";
import AboutUs from "../../Pages/AboutUs";
import HowToUse from '../../Pages/HowToUse';
import AccountSettings from "../../Pages/AccountSettings";
import Dropdown from '../DropDown';
import History from '../../Pages/History';
import SettingsPage from '../../Pages/SettingsPage';
import Analytics from '../../Pages/Analytics';
import DeviceDetail from '../../Pages/DeviceDetail';
import jwt_decode from "jwt-decode";
import styles from "./main.module.css";
import  {FaBars} from 'react-icons/fa';
import {FaHistory} from 'react-icons/fa';
import {RiUserSettingsFill} from 'react-icons/ri';
import nameLogo from "../../assets/images/nameLogo.svg";
import greenLogo from "../../assets/images/GreenLogo.svg";
import DarkMode from '../../DarkMode';

const Main = ({ authToken }) => {
  const [userId, setUserId] = useState(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false); 
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showStartDetecting, setShowStartDetecting] = useState(false); 
  const [devices, setDevices] = useState([]);
  const [userData, setUserData] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);


  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  


  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowAddDeviceForm(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
    setShowHistory(false); 
    setShowAnalytics(false)
    setSelectedDevice(false);


  };

  const handleAddDeviceClick = () => {
    setShowAddDeviceForm(true); 
    setShowHistory(false);
    setShowSettings(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
    setShowAnalytics(false)
    setSelectedDevice(false);
  };
  
  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
    setShowSettings(false); 
    setShowAddDeviceForm(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
    setShowAnalytics(false)
    setSelectedDevice(false);
  };
  
  const handleAnalyticsClick = () => {
    setShowAnalytics(!showAnalytics);
    setShowHistory(false);
    setShowSettings(false); 
    setShowAddDeviceForm(false); 
    setShowAboutUs(false); 
    setShowHowToUse(false); 
    setShowAccountSettings(false); 
    setShowStartDetecting(false);
    setSelectedDevice(false);

  };
  


  const handleAboutUsClick = () => {
    setShowAboutUs(true);
    setShowAddDeviceForm(false);
    setShowHowToUse(false);
    setShowAccountSettings(false); 
    setShowStartDetecting(false);
    setSelectedDevice(false);

  };

  const handleBackClick = () => {
    setShowAddDeviceForm(false)
    setShowAboutUs(false);
    setShowHowToUse(false);
    setShowAccountSettings(false); 
    setShowSettings(false)
    setShowHistory(false)
    setShowAnalytics(false);
    setShowStartDetecting(false);
    setSelectedDevice(false);



 
};
   

   const handleHowToUseClick = () => {
    setShowHowToUse(true);
    setShowAboutUs(false);
    setShowAddDeviceForm(false);
    setShowAccountSettings(false); 
    setShowStartDetecting(false);
    setSelectedDevice(false);

  };

  const handleAccountSettingsClick = () => {
    setShowAccountSettings(true);
    setShowAboutUs(false);
    setShowAddDeviceForm(false);
    setShowHowToUse(false);
    setShowStartDetecting(false);
    setSelectedDevice(false);

  };

  // const handleStartDetectingClick= () => {
  //   setShowStartDetecting(true)
  //   setShowAccountSettings(false);
  //   setShowAboutUs(false);
  //   setShowAddDeviceForm(false);
  //   setShowHowToUse(false);
  //   setSelectedDevice(false);

  // };



  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };



useEffect(() => {
  const decodedToken = jwt_decode(authToken);
  const fetchedUserId = decodedToken._id;
  setUserId(fetchedUserId);

  const fetchData = async () => {
    try {
      const userDataResponse = await axios.get(`http://localhost:8080/api/users/${fetchedUserId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserData(userDataResponse.data);

      const devicesResponse = await axios.get("http://localhost:8080/api/devices", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setDevices(devicesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
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
    if (selectedDevice) {
      return (
        <DeviceDetail
          device={selectedDevice}
          userId={userId}
          handleBackClick={handleBackClick}
        />
      );
    } else if (showAddDeviceForm) {
      return (
        <AddDeviceForm
          authToken={authToken}
          onDeviceAdded={handleDeviceAdded}
          // setShowAddDeviceForm={setShowAddDeviceForm}
          handleAddDeviceClick = {handleAddDeviceClick}
          handleBackClick={handleBackClick}
        />
      );
    } else if (showAboutUs) {
      return <AboutUs handleBackClick={handleBackClick} />;
    } else if (showHowToUse) {
      return <HowToUse handleBackClick={handleBackClick} />;
    } else if (showAccountSettings) {
      return <AccountSettings userData={userData} handleBackClick={handleBackClick} />;
    // } else if (showStartDetecting) {
    //   return <AudioClassification handleBackClick={handleBackClick} />;
    } else if (showSettings) {
      return <SettingsPage handleBackClick={handleBackClick} />;
    } else if (showHistory) {
      return <History handleBackClick={handleBackClick} userId={userId} />
    } else if (showAnalytics) {
      return <Analytics handleBackClick={handleBackClick} />;
    } else {
      return devices.map((device) => (
        <DeviceCard
          key={device._id}
          device={device}
          authToken={authToken}
          userId={userId}
          onDeviceClick={handleDeviceClick} 
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
            
            <a onClick= {handleAddDeviceClick } 
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
            {/* <a   onClick={handleStartDetectingClick}className={styles.sideMenuItem}> 
              ChainSaw Detect
            </a> */}
            <a   onClick={handleLogout}className={styles.sideMenuItem}> 
              Logout
            </a>
            <DarkMode/>
            </div>

            <div className={styles.sidenameLogo}><img src={nameLogo} alt="nameLogo" /></div>
          </div>
        </div>
        <div className={styles.logoDot}>
         
        <div className={styles.logoCenter}>
  {showAddDeviceForm ? (
    <h1 className={styles.navbarHead}>Add New Device</h1>
  ) : showAboutUs ? (
    <h1 className={styles.navbarHead}>About Us</h1>
  ) : showHowToUse ? (
    <h1 className={styles.navbarHead}>How to Use</h1>
  ): showAccountSettings ? (
    <h1 className={styles.navbarHead}> Account Settings<RiUserSettingsFill className={styles.navbarHead}/></h1>
  ) : showHistory ? (
    <h1 className={styles.navbarHead}> History < FaHistory className={styles.navbarHead}/></h1>
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

