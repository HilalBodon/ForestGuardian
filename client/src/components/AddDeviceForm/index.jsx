import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import styles from "./AddDeviceForm.module.css";
import { PiCameraPlusBold } from "react-icons/pi";
import Resizer from "react-image-file-resizer";

const AddDeviceForm = ({ authToken, onDeviceAdded, handleBackClick }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    deviceName: "",
    treeType: "",
    treeHeight: "",
    location: "",
    details: "",
    picture: "",
  });

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude}, ${longitude}`;
          setFormData({ ...formData, location });
        });
      } else {
        console.error("Geolocation is not available in this browser.");
      }
    };

    getUserLocation();
  }, []);



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/devices",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const newDevice = response.data;
      setFormData({
        deviceName: "",
        treeType: "",
        treeHeight: "",
        location: "",
        details: "",
        picture: "",
      });

      onDeviceAdded(newDevice);
      // setShowAddDeviceForm(false);
      handleBackClick();

    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      deviceName: "",
      treeType: "",
      treeHeight: "",
      location: "",
      details: "",
      picture: "",
    });
    handleBackClick();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        200,
        200, 
        "JPEG",
        100, 
        0, 
        (uri) => {
          setFormData({ ...formData, picture: uri });
        },
        "base64" 
      );
    }
  };

  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.formContainer}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {formData.picture ? (
        <img src={formData.picture} alt="Uploaded" className={styles.uploadedImage}         style={{ width: "45vh", height: "30vh" }}/>
      ) : (
        <div className={styles.camIcon}>
          <PiCameraPlusBold onClick={handleCameraIconClick} />
        </div>
      )}

      <form className={styles.formStyle} onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Device Name"
          value={formData.deviceName}
          onChange={(e) =>
            setFormData({ ...formData, deviceName: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Tree Type"
          value={formData.treeType}
          onChange={(e) =>
            setFormData({ ...formData, treeType: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Tree Height"
          value={formData.treeHeight}
          onChange={(e) =>
            setFormData({ ...formData, treeHeight: e.target.value })
          }
        />

        {/* <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        /> */}

        <textarea
          placeholder="Details"
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
        />

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.addButton}>
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeviceForm;
