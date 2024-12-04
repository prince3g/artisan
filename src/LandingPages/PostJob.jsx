import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import PageServices from '../data/PageServices'; // Import the PageServices data
import './Css/Main.css';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PostJob = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [expandedService, setExpandedService] = useState(null); // Track expanded service
  const [activeIndex, setActiveIndex] = useState(null); // Track active sub-service item
  const [textareaContent, setTextareaContent] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function

  const handleServiceChange = (event) => {
    const selectedName = event.target.value;
    const service = PageServices.find((s) => s.name === selectedName);
    setSelectedService(service);
    setActiveService(null); // Reset active service when a new category is selected
    setExpandedService(null); // Reset expanded service
    setActiveIndex(null); // Reset active sub-service item
  };

  const handleServiceClick = (index) => {
    setActiveService(index);
    // Toggle the expanded service when clicked
    setExpandedService(expandedService === index ? null : index);
  };

  // Helper function to convert plural to singular
  const toSingular = (str) => {
    if (str.endsWith("s")) {
      return str.slice(0, -1); // Remove the "s" at the end
    }
    return str;
  };

  // Handle click on sub-service items
  const handleClick = (index) => {
    setActiveIndex(index); // Update active index
  };

  const handleChange = (event) => {
    setTextareaContent(event.target.value); // Update state when content changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(textareaContent); // Use the content of the textarea
    // You can also add form submission logic here, like sending data to an API
  };

  const handleBackClick = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <div className="Gradnded-page">
                        <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p>Simservicehub <ChevronRightIcon /> Homeowner <ChevronRightIcon /> Post a job </p>
          </div>
          </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Post a job</h2>
              <p>Receive responses from SimserviceHub’s trusted and verified local tradespeople nearby</p>
            </div>
            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">What would you like to have done?</label>
                  <select
                    id="serviceSelect"
                    className="service-dropdown"
                    onChange={handleServiceChange}
                  >
                    <option value="" disabled selected>Select a category</option>
                    {PageServices.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.postName}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedService && (
                  <div className="service-details Gland-Quest-data">
                    <label>
                      What do you need{' '}{/[aeiouAEIOU]/.test(toSingular(selectedService.name)) ? 'an ' : 'a '}{' '}
                      {toSingular(selectedService.name).replace(/&/g, 'an')} for?
                    </label>
                    <ul className="service-list">
                      {selectedService.services.map((service, index) => (
                        <li
                          key={index}
                          className={`service-item ${activeService === index ? 'active-gland-list-Li' : ''}`}
                          onClick={() => handleServiceClick(index)}
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* New div added here */}
                {expandedService !== null && (
                  <div className="Gland-Quest-data gahys-li">
                    <label>Which best describes your issues?</label>
                    <ul>
                      <li
                        className={`sub-service-item ${activeIndex === 0 ? 'active-ooo-lip' : ''}`}
                        onClick={() => handleClick(0)} // Click handler for the 'Simple' item
                      >
                        <p>Simple</p>
                        <span>E.g. {selectedService.simpleDescription}</span>
                      </li>
                      <li
                        className={`sub-service-item ${activeIndex === 1 ? 'active-ooo-lip' : ''}`}
                        onClick={() => handleClick(1)} // Click handler for the 'Complex' item
                      >
                        <p>Complex</p>
                        <span>E.g. {selectedService.complexDescription}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Render the textarea when either "Simple" or "Complex" is selected */}
                {activeIndex !== null && (
                  <div className="Gland-Quest-data">
                   <label>Add a description to your job</label>
                    <textarea
                      id="descriptionTextarea"
                      className="description-textarea"
                      value={textareaContent}
                      onChange={handleChange}
                      placeholder="Describe your issue here..."
                    />
                  </div>
                )}
              </div>

              <div className="Gland-Cnt-Btn">
                <button type="button" className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <button type="submit" className="post-job-btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
