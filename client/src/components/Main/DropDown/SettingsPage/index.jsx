import React from "react";

const SettingsPage = ({ handleBackClick }) => {
  return (
    <div>
      <h2>Settings</h2>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default SettingsPage;
