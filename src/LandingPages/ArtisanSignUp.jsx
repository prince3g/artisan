import React, { useState } from 'react';
import './Css/Main.css';
import { useNavigate } from 'react-router-dom'; 
import PageServices from '../data/PageServices'; 

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";


import { Link } from 'react-router-dom';

const ArtisanSignUp = () => {
  
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function



  const handleInputChange = (e) => {
    const input = e.target.value.trim();
    setQuery(input);
    setSelectedTrade(''); // Clear previously selected trade when typing

    if (input === '') {
      setSuggestions([]);
      setError('');
      // Reset all active states when clearing input
      resetAllActiveStates();
    } else {
      const filteredSuggestions = PageServices.filter((service) =>
        service.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);

      if (filteredSuggestions.length === 0) {
        setError('Trade does not exist');
      } else {
        setError('');
      }
    }
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
    setError('');
    setSelectedTrade(name);
    // Reset all active states when selecting a new suggestion
    resetAllActiveStates();
  };

  const resetAllActiveStates = () => {
    setActiveReliabilityButton(null);
    setActiveWorkmanshipButton(null);
    setActiveTidinessButton(null);
    setActiveCourtesyButton(null);
    setReliabilityYesNo(null);
    setIsCheckedReliability(false);
    setIsCheckedWorkmanship(false);
    setIsCheckedTidiness(false);
    setIsCheckedCourtesy(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(textareaContent); // Use the content of the textarea
    // You can also add form submission logic here, like sending data to an API
  };

  const handleBackClick = () => {
    navigate(-1);  // Go back to the previous page
  };


  const [activeIndex, setActiveIndex] = useState({});

  const handleItemClick = (ulIndex, liIndex) => {
    setActiveIndex((prevState) => ({
      ...prevState,
      [ulIndex]: liIndex,
    }));
  };

  const renderList = (items, ulIndex) => {
    return (
      <ul className="service-list">
        {items.map((item, liIndex) => (
          <li
            key={liIndex}
            className={`service-item ${
              activeIndex[ulIndex] === liIndex ? "active-gland-list-Li" : ""
            }`}
            onClick={() => handleItemClick(ulIndex, liIndex)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };






  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput(""); // Clear the input after adding
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };





  return (
    <div className="Gradnded-page">
                    <div className='navigating-ttarvs'>
        <div className='site-container'>
        <p><Link to="/">Simservicehub</Link> <ChevronRightIcon /> <Link to="/artisan-sign-up"> Artisan Registeration</Link> </p>
          </div>
          </div>
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Artisan Registeration</h2>
            </div>
            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">What type of work do you do?</label>
                  <input
                    type="text"
                    placeholder="Search category"
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
                    <label htmlFor="serviceSelect">What is your business called?</label>
                    <input type="text" name="" placeholder="Enter your business name*" />
                  </div>
            
                  <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">Where is your business located?</label>
                    <input type="text" name="" placeholder="Enter your business address*" />
                  </div>
            
                  <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">What are you looking for?</label>
                    {renderList(
                      [
                        "I'm looking to fill the gaps in my diary",
                        "I need a steady flow of leads",
                        "I need as many leads as possible",
                        "I just want a Simservicehub profile",
                        "I'm not sure",
                      ],
                      0
                    )}
                  </div>
            
                  <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">Tell us more about your business</label>
                    <h5>Business type</h5>
                    {renderList(
                      ["Self Employed", "Limited company", "Looking to start a business"],
                      1
                    )}
                  </div>
            
                  <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Tell us more about your business</label>
                  <ul className="service-list GG-UL-Flex">
                    {[
                      { count: "1", label: "Employee" },
                      { count: "2-5", label: "Employees" },
                      { count: "6-9", label: "Employees" },
                      { count: "10+", label: "Employees" },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className={`service-item ${
                          activeIndex[2] === index ? "active-gland-list-Li" : ""
                        }`}
                        onClick={() => handleItemClick(2, index)}
                      >
                        <span>
                          {item.count} <br />
                          <span>{item.label}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">What are your skills</label>
                    <div className="flangSec">
                      <input
                        type="text"
                        placeholder="Enter a skill*"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={handleKeyPress} // Add skill on Enter
                      />
                      <button onClick={addSkill}>
                        <AddIcon /> Add Skill
                      </button>
                    </div>
                    <div className="skills-container">
                      {skills.map((skill, index) => (
                        <div className="skill-box" key={index}>
                          {skill}
                          <button
                            className="remove-skill-btn"
                            onClick={() => removeSkill(skill)}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
            
                  <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">Final details</label>
                    <input type="text" name="" placeholder="Your first name*" />
                    <input type="text" name="" placeholder="Your surname*" />
                    <input type="text" name="" placeholder="Your business email*" />
                    <input type="text" name="" placeholder="Your business phone*" />
                    <input type="text" name="" placeholder="Your mobile phone - optional" />

                    <textarea
                      id="descriptionTextarea"
                      className="description-textarea"
                      value=""
                      placeholder="Tell us about yourself.."
                    />
                  </div>
                </div>
                )}
              </div>
            </div>

            <div className="Gland-Cnt-Btn">
                <button type="submit" className="post-job-btn" onClick={handleSubmit}>
                  Continue
                </button>
              </div>

                   <div className="ghha-foot">
                     <p>We will contact you by phone, SMS or email to give you more information about how our products and services can help your business. 
                      You can opt out at any time by emailing <a href="#">newjoiners@simservicehub.com</a></p>       
                  </div>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanSignUp;
