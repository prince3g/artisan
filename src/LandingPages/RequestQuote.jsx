import React, { useState } from 'react';
import './Css/Main.css';
import { useNavigate } from 'react-router-dom';
import PageServices from '../data/PageServices';

import { Link } from 'react-router-dom';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';



const RequestQuote = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('');
  const [activeService, setActiveService] = useState(null);

  const navigate = useNavigate();

  // Handle job description input and word count
  const handleChange = (event) => {
    const text = event.target.value;
    const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
    setJobDescription(text);
    setWordCount(words.length);
  };

  const isWordCountValid = wordCount >= 50 && wordCount <= 500;

  // Handle service search input change
  const handleInputChange = (e) => {
    const input = e.target.value.trim();
    setQuery(input);
    setSelectedTrade(''); // Clear previously selected trade
    setActiveService(null); // Clear active service selection

    if (input === '') {
      setSuggestions([]);
      setError('');
    } else {
      const filteredSuggestions = PageServices.filter((service) =>
        service.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);

      setError(filteredSuggestions.length === 0 ? 'Trade does not exist' : '');
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
    setError('');
    setSelectedTrade(name);
    setActiveService(null); // Clear active service selection
  };

  // Handle service item click
  const handleServiceClick = (index) => {
    setActiveService(index);
  };

  // Handle back button
  const handleBackClick = () => {
    navigate(-1);
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(jobDescription);
  };

  return (
    <div className="Gradnded-page">
                        <div className='navigating-ttarvs'>
        <div className='site-container'>
            <p>Simservicehub <ChevronRightIcon /> Homeowner <ChevronRightIcon /> Request a quote </p>
          </div>
          </div>
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Request a quote</h2>
              <p>Give us the details of your job and we'll send it to specialist trades for you.</p>
            </div>
            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label>Describe your job</label>
                  <textarea
                    placeholder="Tell us a bit about your job! Remember, do not include personal details like your name, phone number, address, or email at this stage."
                    value={jobDescription}
                    onChange={handleChange}
                  />
                  <p className={`word-counter ${isWordCountValid ? 'valid' : 'invalid'}`}>
                    <span>Min character: 50</span>
                    <span>{wordCount} / 500</span>
                  </p>
                </div>

                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">What service do you need?</label>
                  <input
                    type="text"
                    placeholder="Search for a service..."
                    value={query}
                    onChange={handleInputChange}
                  />
                  {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((service, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(service.name)}
                          className="suggestion-item"
                        >
                          {service.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {error && <div className="error-message">{error}</div>}
                </div>

                {selectedTrade && (
                  <div className="glahs-sec">
                    <div className="Gland-Quest-data">
                      <label>When would you like the job to start?</label>
                      <ul className="service-list">
                      {[
                            "I'm flexible on the start date",
                            "It's urgent (within 48 hours)",
                            "Within 2 weeks",
                            "Within 1 month",
                            "I'm budgeting / researching",
                            ].map((service, index) => (
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
                    <div className="Gland-Quest-data">
                    <label>Your contact details</label>
                    <input
                            type="text"
                            placeholder="Full name"
                        />
                         <input
                            type="text"
                            placeholder="Email address"
                        />
                         <input
                            type="number"
                            placeholder="Phone number"
                        />
                         <input
                            type="Address"
                            placeholder="Enter address"
                        />
                         <div className="not-applicable-section">
                          <label className="styled-checkbox-label">
                            <input
                              type="checkbox"
                              className="styled-checkbox"
                            />
                            <h5>I would like to update my profile with these details</h5>
                          </label>
                        </div>
                    </div>
                    <div className="ghha-foot">
                        <p>If you're new to SimserviceHub, we'll set up an account for you with your email above. 
                            This will make it easier to access your conversation with trades and manage your jobs.
                            Read our <Link to="terms-of-use">Terms of use</Link> and <Link to="/privacy-policy">Privacy notice</Link></p>
                  </div>

                  </div>
                )}
              </div>
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
  );
};

export default RequestQuote;
