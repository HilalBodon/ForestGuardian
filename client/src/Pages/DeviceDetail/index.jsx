import React, { useState, useEffect} from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";
import CustomMap from "../../components/leaflet";
import axios from "axios";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
  let latitude = 0;
  let longitude = 0;
  let error = null;
  const [locationDetails, setLocationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const theme = localStorage.getItem("theme");
  
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    reverseGeocode(device.location);
  }, [device.location]);
  


  async function reverseGeocode(location) {
    if (!location || !/^\d+\.\d+,\s*\d+\.\d+$/.test(location)) {
      return;
    }

    const [latStr, lonStr] = location.split(",").map((str) => str.trim());

    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (isNaN(lat) || isNaN(lon)) {
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );

      if (response.data.address) {
        setLocationDetails(response.data.address);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  }


  if (device.location && /^\d+\.\d+,\s*\d+\.\d+$/.test(device.location)) {
    const [latStr, lonStr] = device.location.split(",").map((str) => str.trim());

    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (!isNaN(lat) && !isNaN(lon)) {
      latitude = lat;
      longitude = lon;
    } else {
      error = "Invalid latitude or longitude values in device.location";
    }
  } else {
    error = "Invalid device.location format";
  }
  
  const [mapVisible, setMapVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [activeButton, setActiveButton] = useState('info'); 
  
  const toggleMap = () => {
    setMapVisible(true);
    setInfoVisible(false);
  };

  const toggleInfo = () => {
    setInfoVisible(true);
    setMapVisible(false);
  };

  const toggleButton = (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === 'info') {
      toggleInfo();
    } else if (buttonName === 'map') {
      toggleMap();
    }
  };
  return (
    <div className="device-detail-container">
      
      <div className="locationDiv">
        <button
          className={activeButton === 'info' ? 'active-button' : ''}
          onClick={() => toggleButton('info')}
        >
          Info
        </button>
        <button
          className={activeButton === 'map' ? 'active-button' : ''}
          onClick={() => toggleButton('map')}
        >
          Map
        </button>
      </div>

      {mapVisible && <CustomMap latitude={latitude} longitude={longitude} />}
     
      {infoVisible && (
        
        <div key={device._id}>
          <div className="imgDiv">
          <img  src={device.picture} alt="Device Image" />
          </div>
          <div className="infoSuperDiv">
            <div className="infoMainDiv">
            <div  className="nameDiv">{device.deviceName}</div>
            <div className="heightTypeDiv">
              <div className="heightDiv">
                <div className="typeLabel">Type: </div>
                <div className="typeValue"> {device.treeType}</div>
                </div>
              <div className="heightDiv">
                <div  className="heightLabel">Height:</div>
              <div className="heightValue">{device.treeHeight} m</div>
              </div>

            </div>
            <div className="locationDiv2">
              <div className="locationLabel">Location:</div>
              <div className={`locationValue ${loading ? 'loading' : 'loaded'}`}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    {locationDetails.road}, {locationDetails.city}
                  </div>
                )}
              </div>
              </div>
            <div className="locationDiv2">
                <div className="detailsLabel" >More Details:</div>
                <div className="detailsValue" >{device.details}</div>
            </div>
            <div>
              <div>
                <AudioClassification userId={userId} deviceId={device._id} />
              </div>
            </div>
          </div>
          </div>

          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;


