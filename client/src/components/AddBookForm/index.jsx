import React, { useState } from "react";
import axios from "axios";
import styles from "./AddDeviceForm.module.css";

const AddDeviceForm = ({ authToken, onDeviceAdded, setShowAddDeviceForm }) => {
    const [formData, setFormData] = useState({
      devicename: "",
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
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) =>
            setFormData({ ...formData, genre: e.target.value })
          }
        />
        <input
        type="text"
        placeholder="Image URL"
        value={formData.picture}
        onChange={(e) => handlePictureChange(e.target.value)}
        />

        <textarea
          placeholder="Review"
          value={formData.review}
          onChange={(e) =>
            setFormData({ ...formData, review: e.target.value })
          }
        />
        <button type="submit" className={styles.addButton}>
          Add Device
        </button>
      </form>
    </div>
  );
};

export default AddDeviceForm;
