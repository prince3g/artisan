import React, { useState } from 'react';
import './Css/Main.css';
import { useNavigate } from 'react-router-dom'; 
import PageServices from '../data/PageServices'; 

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";


import { Link } from 'react-router-dom';

const ArtisanSignUp = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    trade: "",
    businessName: "",
    businessLocation: "",
    lookingFor: "",
    businessType: "",
    employeeCount: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
    businessEmail: "",
    businessPhone: "",
    mobile_number: "",
    skills: ["Plumbing", "Electrical", "Carpentry"], // Add default skills here
  });

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${djangoHostname}/api/jobs/auth/service-categories/`
        );
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [djangoHostname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    if (name === "trade") {
      const input = value.trim();
      setQuery(input);
  
      if (input === "") {
        setSuggestions([]);
        setError("");
      } else {
        const filteredSuggestions = services.filter((service) =>
          service.name.toLowerCase().includes(input.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
  
        if (filteredSuggestions.length === 0) {
          setError("Trade does not exist");
        } else {
          setError("");
        }
      }
    }
  };
  
  const handleSuggestionClick = (service, unique_id) => {
    setSelectedTrade({
      name: service.name,
      unique_id: unique_id, // Save the unique_id of the selected trade
    });
    setQuery(service.name); // Populate the input with the selected trade name
    setUnique_id(unique_id); // Populate the unique_id state
    setFormData((prevData) => ({
      ...prevData,
      trade: service.name, // Set the selected trade in formData
    }));
    setSuggestions([]); // Clear the suggestions after selection
    setError(""); // Clear any existing error message
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false); // Stop loading if there is an error
      return;
    }

    const requestPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      email: formData.businessEmail,
      user_type: "artisan",
      phone: formData.businessPhone,
      mobile_number: formData.mobile_number,
    };

    try {
      const response1 = await fetch(`${djangoHostname}/api/accounts/auth/api/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response1.ok) {
        const errorData = await response1.json();
        console.error("Error during first request:", errorData);
        setError("An error occurred during the registration. Please try again.");
        setLoading(false);
        return;
      }

      const response1Data = await response1.json();
      console.log("First request successful:", response1Data);

      if (!selectedTrade || !selectedTrade.unique_id) {
        setError("Please select a valid trade.");
        setLoading(false);
        return;
      }

      const artisanProfilePayload = {
        service_details_id: unique_id,
        businessName: formData.businessName,
        businessLocation: formData.businessLocation,
        lookingFor: formData.lookingFor,
        businessType: formData.businessType,
        employeeCount: formData.employeeCount,
        skills: formData.skills && formData.skills.length > 0 ? formData.skills.join(", ") : "Plumbing, Electrical, Carpentry",
        experience: formData.experience || 0,
        location: formData.businessLocation,
        user_id: response1Data.unique_id,
      };

      const response2 = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artisanProfilePayload),
      });

      if (response2.ok) {
        const result = await response2.json();
        console.log("Second request successful:", result);
        navigate("/success-page");
      } else {
        const errorData = await response2.json();
        console.error("Error during second request:", errorData);
        setError("An error occurred during registration. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputClick = () => {
    if (!query || !query.trim()) {
      setSuggestions(services);
    }
    setError('');
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
                    value={selectedTrade.name || query} // Use selectedTrade.name when it's set, otherwise fallback to query
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                  />

                  {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((service, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(service.name, service.unique_id)}
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
                    <input type="text"
                     name="businessName" 
                     value={formData.businessName}
                     onChange={handleInputChange}
                     placeholder="Enter your business name*" />
                  </div>
            
                  <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">Where is your business located?</label>
                    <input 
                     type="text"
                     name="businessLocation"
                     value={formData.businessLocation}
                     onChange={handleInputChange}
                     placeholder="Enter your business address*" />
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
            <div className="Gland-Cnt-Btn">
            <button
                  type="submit"
                  className="post-job-btn"
                  onClick={handleSubmit}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? (
                    <span className="loader">Submitting ...</span> // Add a loader icon or animation here
                  ) : (
                    "Continue"
                  )}
                </button>
            </div>

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

