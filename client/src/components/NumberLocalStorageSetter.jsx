import React, { useState } from "react";

const NumberLocalStorageSetter = () => {
  // State to manage the number input
  const [number, setNumber] = useState("");

  // Function to handle the button click and set the number in local storage
  const handleSetNumber = () => {
    if (number !== "") {
      // Convert the input to a number
      const numberValue = parseInt(number);

      // Check if the input is a valid number
      if (!isNaN(numberValue)) {
        // Set the number in local storage
        localStorage.setItem("myNumber", numberValue.toString());

        // Clear the input field
        setNumber("");

        // Optionally, you can display a success message or perform other actions
        alert(`Number ${numberValue} has been saved to local storage.`);
      } else {
        // Handle invalid input (e.g., non-numeric input)
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
