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
  const [showDetails, setShowDetails] = useState(false);
  const [visible, setVisible] = useState(false);

  // Check if preferences exist in localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (!savedPreferences) {
      setVisible(true); // Show the modal if no preferences are saved
    }
  }, []);

  const handleCheckboxChange = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleAcceptAll = () => {
    const allTruePreferences = Object.fromEntries(
      Object.keys(preferences).map((key) => [key, true])
    );
    setPreferences(allTruePreferences);
    savePreferences(allTruePreferences);
    setVisible(false);
  };

  const handleDeclineAll = () => {
    const allFalsePreferences = Object.fromEntries(
      Object.keys(preferences).map((key) => [key, false])
    );
    allFalsePreferences.strictlyNecessary = true; // Always required
    setPreferences(allFalsePreferences);
    savePreferences(allFalsePreferences);
    setVisible(false);
  };

  const savePreferences = (prefs) => {
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleClose = () => {
    setVisible(false); // Hide the modal without saving preferences
  };

  return visible ? (
    <div className="cookie-modal">
      <div className="cookie-content">
        {/* Close Button */}
        <div className="Conags-Top">
        <button className="close-button" onClick={handleClose}>
          <span className="material-icons"><CloseIcon /></span>
        </button>
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
