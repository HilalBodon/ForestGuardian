import React, { useState } from "react";
import axios from "axios";
import styles from "./AddDeviceForm.module.css";
import { PiCameraPlusBold } from "react-icons/pi";

const AddDeviceForm = ({ authToken, onDeviceAdded, setShowAddDeviceForm, handleBackClick }) => {
  const [formData, setFormData] = useState({
    deviceName: "",
    // devicePass: "",
    treeType: "",
    treeHeight: "",
    location: "",
    details: "",
    picture: "",
  });

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
        // devicePass: "",
        treeType: "",
        treeHeight: "",
        location: "",
        details: "",
        picture: "",
      });

      onDeviceAdded(newDevice);
      setShowAddDeviceForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePictureChange = (url) => {
    setFormData({ ...formData, picture: url });
  };

  const handleCancel = () => {
    setFormData({
      deviceName: "",
      // devicePass: "",
      treeType: "",
      treeHeight: "",
      location: "",
      details: "",
      picture: "",
    });
    setShowAddDeviceForm(false);
    handleBackClick();
  };
  

  const handleCameraIconClick = () => {
console.log("camera")
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.camIcon}><PiCameraPlusBold onClick={handleCameraIconClick}/></div>
      <form className={styles.formStyle} onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Device Name"
          value={formData.deviceName}
          onChange={(e) =>
            setFormData({ ...formData, deviceName: e.target.value })
          }
        />
        {/* <input
          type="text"
          placeholder="Device Password"
          value={formData.devicePass}
          onChange={(e) =>
            setFormData({ ...formData, devicePass: e.target.value })
          }
        /> */}
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

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        <textarea
          placeholder="Details"
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={formData.picture}
          onChange={(e) => handlePictureChange(e.target.value)}
        />

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.addButton}>
            Add Device
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDeviceForm;
