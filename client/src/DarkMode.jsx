import React, { useEffect } from "react";
import "./DarkMode.css";

const DarkMode = ({ darkMode, toggleDarkMode }) => {
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    toggleDarkMode(true);
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    toggleDarkMode(false); 
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (storedTheme === null && prefersDark)) {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      setLight();
    } else {
      setDark();
    }
  };

  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        {/* <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          checked={theme === "dark"}
        /> */}
        <input
        type="checkbox"
        id="checkbox"
        onChange={toggleTheme}
        checked={darkMode}
      />

        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default DarkMode;
