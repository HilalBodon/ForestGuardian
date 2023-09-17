import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import DeviceCard from "../DeviceCard";
import AddDeviceForm from "../AddDeviceForm";
import jwt_decode from "jwt-decode";
import styles from "./styles.module.css";
import  {FaBars} from 'react-icons/fa';
import  {FaEllipsisV} from 'react-icons/fa';
import nameLogo from "../../assets/images/nameLogo.svg";
import greenLogo from "../../assets/images/GreenLogo.svg";


const Main = ({ authToken }) => {
  const [userId, setUserId] = useState(null);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(true);
  const [devices, setDevices] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const sideMenuRef = useRef(null);



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
      if (isSideMenuOpen && !sideMenuRef.current.contains(e.target)) {
        closeSideMenu();
      }
    };

    if (isSideMenuOpen) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isSideMenuOpen]);



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
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              Add Device
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              About Us
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              How to Use App
            </a>
            <a href="#" onClick={closeSideMenu} className={styles.sideMenuItem}>
              Account Settings
            </a>
            <a href="#"  onClick={handleLogout}className={styles.sideMenuItem}> 
              Logout
            </a>


            <button
          className={styles.btn}
          onClick={() => {
            setShowAddDeviceForm(!showAddDeviceForm);
          }}
        >
          + Add New Device
          {!showAddDeviceForm && (
          <AddDeviceForm
      authToken={authToken}
      onDeviceAdded={handleDeviceAdded}
      setShowAddDeviceForm={setShowAddDeviceForm}
      />)}
        </button>

        
            

            </div>
            
            <div className={styles.sidenameLogo}><img src={nameLogo} alt="nameLogo" /></div>
          </div>
        </div>
        <div className={styles.logoDot}>
          <div><img className={styles.nameLogo} src={nameLogo} alt="NameLogo" /></div>
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
        </div>
      </nav>


      <div className={styles.devices_container}>
        {devices.map((device) => (
        <DeviceCard 
        key={device._id}
        device={device}
        authToken={authToken}
        userId={userId}
        />
        ))}
      </div>
    </div>
  );
};

export default Main;



        {/* <button
          className={styles.btn}
          onClick={() => {
            setShowAddDeviceForm(!showAddDeviceForm);
          }}
        >
          + Add New Device
        </button> */}

        {/* <button
          className={styles.btn}
          onClick={() => {
            setShowRecommended(!showRecommended);
          }}
        >
          {showRecommended ? "All Devices" : "Recommended Devices"}
        </button> */}

        {/* <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button> */}

{/* 

{showDeviceDiscovery && (
        <div className={styles.search_add}>
          <DeviceDiscovery authToken={authToken}/>
		  
        </div>
      )} */}
	  
      {/* {!showAddDeviceForm && (
				<AddDeviceForm
		authToken={authToken}
		onDeviceAdded={handleDeviceAdded}
		setShowAddDeviceForm={setShowAddDeviceForm}
		/>
      )} */}



