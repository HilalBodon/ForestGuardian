import React, { useState } from "react";

const NumberLocalStorageSetter = () => {
  const [number, setNumber] = useState("");

  const handleSetNumber = () => {
    if (number !== "") {
      const numberValue = parseInt(number);

      if (!isNaN(numberValue)) {
        localStorage.setItem("myNumber", numberValue.toString());

        setNumber("");

        alert(`Number ${numberValue} has been saved to local storage.`);
      } else {
        alert("Please enter a valid number.");
      }
    }
  };

  return (
    <div>
      <h2>Number Local Storage Setter</h2>
      <input
        type="text"
        placeholder="Enter a number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={handleSetNumber}>Set Number</button>
    </div>
  );
};

export default NumberLocalStorageSetter;
