import React, { useState } from "react";
import axios from "axios";
import styles from "./AddDeviceForm.module.css";

const AddDeviceForm = ({ authToken, onDeviceAdded, setShowAddDeviceForm }) => {
    const [formData, setFormData] = useState({
      deviceName: "",
      devicePass:"",
      treeType: "",
      treeHeigh: "",
      location:"",
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
        devicename: "",
        devicePass:"",
        treeType: "",
        treeHeigh: "",
        location:"",
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

  return (

    <div className={styles.formContainer}>
      <h2>Add New Device</h2>
      <form onSubmit={handleFormSubmit}>
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
          placeholder="Device Password"
          value={formData.devicePass}
          onChange={(e) =>
            setFormData({ ...formData, devicePass: e.target.value })
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
          value={formData.treeHeigh}
          onChange={(e) =>
            setFormData({ ...formData, treeType: e.target.value })
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

        <button type="submit" className={styles.addButton}>
          Add Device
        </button>
      </form>
    </div>
  );
};

export default AddDeviceForm;
