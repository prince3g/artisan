import React, { useEffect, useState } from "react";
import "./Css/CookieConsent.css";
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';

const CookieConsent = () => {
  const [preferences, setPreferences] = useState({
    strictlyNecessary: true,
    performance: false,
    targeting: false,
    functionality: false,
    unclassified: false,
  });
  const [visible, setVisible] = useState(false);

  // Check if preferences exist in localStorage or cookies
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (!savedPreferences) {
      const cookies = document.cookie.split('; ');
      const cookieConsent = cookies.some(cookie => cookie.includes('cookiePreferences=true'));
      if (!cookieConsent) {
        setVisible(true); // Show the modal if no preferences or consent cookie is found
      }
    }
  }, []);

  // Helper function to set cookies
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Handle checkbox change
  const handleCheckboxChange = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  // Accept all cookies and save preferences
  const handleAcceptAll = () => {
    const allTruePreferences = Object.fromEntries(
      Object.keys(preferences).map((key) => [key, true])
    );
    setPreferences(allTruePreferences);
    savePreferences(allTruePreferences);
    Object.keys(allTruePreferences).forEach(key => {
      setCookie(key, "true", 365); // Set cookie for each preference
    });
    setVisible(false);
  };

  // Decline all cookies and save preferences
  const handleDeclineAll = () => {
    const allFalsePreferences = Object.fromEntries(
      Object.keys(preferences).map((key) => [key, false])
    );
    allFalsePreferences.strictlyNecessary = true; // Always required
    setPreferences(allFalsePreferences);
    savePreferences(allFalsePreferences);
    Object.keys(allFalsePreferences).forEach(key => {
      setCookie(key, "false", 365); // Set cookie for each preference
    });
    setVisible(false);
  };

  // Save preferences to localStorage
  const savePreferences = (prefs) => {
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
  };

  // Close the modal without saving preferences
  const handleClose = () => {
    setVisible(false);
  };

  return visible ? (
    <div className="cookie-modal">
      <div className="cookie-content">
        {/* Close Button */}
        <div className="Conags-Top">
          {/* <button className="close-button" onClick={handleClose}>
            <span className="material-icons"><CloseIcon /></span>
          </button> */}
        </div>
        <h2>This website uses cookies</h2>
        <p>
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Cookie
          Policy. <Link to="/cookies">Read more</Link>
        </p>
        <div className="cookie-options">
          <label>
            <input
              type="checkbox"
              checked={preferences.strictlyNecessary}
              disabled
            />
            Strictly Necessary
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.performance}
              onChange={() => handleCheckboxChange("performance")}
            />
            Performance
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.targeting}
              onChange={() => handleCheckboxChange("targeting")}
            />
            Targeting
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.functionality}
              onChange={() => handleCheckboxChange("functionality")}
            />
            Functionality
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.unclassified}
              onChange={() => handleCheckboxChange("unclassified")}
            />
            Unclassified
          </label>
        </div>
        <div className="cookie-actions">
          <button onClick={handleAcceptAll}>Accept All</button>
          <button onClick={handleDeclineAll}>Decline All</button>
        </div>
        <div className="cookie-details-toggle">
          <Link to="/cookies"><SettingsIcon /> Show details</Link>
        </div>
      </div>
    </div>
  ) : null;
};

export default CookieConsent;
