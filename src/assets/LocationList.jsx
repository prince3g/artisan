import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Close from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'; 

import PageServices from '../data/PageServices';

import locations from '../data/Locations';




const LocationList = () => {
  const [isVisible, setIsVisible] = useState(false); // Controls visibility of the location list
  const [showPopup, setShowPopup] = useState(false); // Controls visibility of the popup
  const [selectedLocation, setSelectedLocation] = useState(''); // Tracks the selected location
  const [selectedTrade, setSelectedTrade] = useState(null); // Tracks the selected trade

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setShowPopup(true);
  };

  const handleTradeClick = (trade) => {
    setSelectedTrade(trade);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedTrade(null); // Reset trade selection when popup is closed
  };

  return (
    <div className="Locate_Ssef_sec">
      <div className="site-container">
        <div className='Locate_Ssef_Main'>
          <div className="Locate_Ssef_Header" onClick={toggleVisibility}>
            <h2 className="mid-text">Find Local Artisan in Your Area</h2>
            <span>{isVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
          </div>
          <div className={`location-Sec ${isVisible ? 'show' : 'hide'}`}>
            <ul>
              {locations.map((location, index) => (
                <li key={index}>
                  <span onClick={() => handleLocationClick(location)}>
                    {location}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="Services-PopUp-Sec">
          <div className="Services-PopUp-Box">
            <div className="Services-PopUp-Box-Header">
              <h3>
                {selectedTrade
                  ? `What do you need ${selectedTrade.name} for?`
                  : `What are you looking for in ${selectedLocation}?`}
              </h3>
              <button className="Close-Service-PopUp" onClick={handleClosePopup}>
                <Close />
              </button>
            </div>
            <div className="Services-PopUp-Box-Main">
              <ul>
                {selectedTrade
                  ? selectedTrade.services.map((service, index) => (
                      <li key={index}>
                        {/* Link to search result with query parameters */}
                        <Link to={`/search-results?trade=${selectedTrade.name}&service=${service}&services=${encodeURIComponent(
                          JSON.stringify(selectedTrade.services)
                        )}`}>
                          {service} <ArrowForward />
                        </Link>
                      </li>
                    ))
                  : PageServices.map((trade, index) => (
                      <li key={index}>
                        <a onClick={() => handleTradeClick(trade)}>
                          {trade.name} <ArrowForward />
                        </a>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationList;
