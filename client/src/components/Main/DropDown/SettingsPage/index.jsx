import React from "react";

const SettingsPage = ({ handlePageChange }) => {
  return (
    <div>
      <h2>Settings</h2>
      <button onClick={() => handlePageChange('devices')}>Back</button>
    </div>
  );
};

export default SettingsPage;
