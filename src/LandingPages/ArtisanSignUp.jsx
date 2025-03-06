import React, { useState, useEffect, useRef} from "react";
import "./Css/Main.css";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps) {
    console.log("Google Maps script already loaded!");
    callback();
    return;
  }

  if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
   // console.log("Google Maps script is already being loaded.");
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.onload = () => {
    console.log("Google Maps script loaded successfully!");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load Google Maps script!");
  };
  document.body.appendChild(script);
};


const ArtisanSignUp = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const inputRef = useRef(null);

    useEffect(() => {
      let isMounted = true;
    
      loadGoogleMapsScript(() => {
        if (!isMounted) return;
    
        if (!window.google || !window.google.maps || !inputRef.current) {
          console.error("Google Maps API or input ref not available.");
          return;
        }
    
        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["geocode"],
        });
    
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log("Selected place:", place);
          if (!place || !place.address_components) {
            console.log("No address components found.");
            return;
          }
    
          const postalCodeComponent = place.address_components.find((component) =>
            component.types.includes("postal_code")
          );
    
          if (postalCodeComponent) {
            console.log("Postcode found:", postalCodeComponent.long_name);
            setFormData((prevState) => ({
              ...prevState,
              postcode: postalCodeComponent.long_name,
            }));
          } else {
            console.log("No postcode found in the selected address.");
          }
        });
      });
    
      return () => {
        isMounted = false; // Cleanup on unmount
      };
    }, [inputRef.current]);

  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    trade: "",
    business_name: "",
    location: "",
    business_location: "",
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
    // service_cost: "",
    skills: [], 
    about_artisan: "", 

    postcode: "" // Added postcode field
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
      name: service,
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

      // Check if the password is at least 8 characters long
  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters long.");
    setLoading(false);
    return;
  }


    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
    }

    const requestPayload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
        email: formData.businessEmail,
        // address: formData.location,
        user_type: "artisan",
        phone: formData.businessPhone,
        mobile_number: formData.mobile_number,
    };

    try {

      // console.log("User requestPayload")
      // console.log(requestPayload)
      // console.log("User requestPayload")

        const response1 = await fetch(`${djangoHostname}/api/accounts/auth/api/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload),
        });

        if (!response1.ok) {
          const errorData = await response1.json();
          
          // Extract errors from all fields dynamically
          const errorMessages = Object.values(errorData).flat().join(", ");
          
          setError(errorMessages || "An error occurred.");
          setLoading(false);
          return;
      }
      
        const response1Data = await response1.json();
        //console.log("First request successful:", response1Data);
        sessionStorage.setItem('unique_user_id', response1Data.unique_id);
        sessionStorage.setItem('artisanID', response1Data.id);
        sessionStorage.setItem('user_type', response1Data.user_type);
        // sessionStorage.setItem('Address', response1Data.address);
        

        if (!selectedTrade || !selectedTrade.unique_id) {
            setError("Please select a valid trade.");
            setLoading(false);
            return;
        }

        const artisanProfilePayload = {
          
            about_artisan: formData.about_artisan,
            service_details_id: unique_id,
            business_name: formData.business_name,
            lookingFor: formData.lookingFor,
            businessType: formData.businessType,
            //service_cost: formData.service_cost,
            employeeCount: formData.employeeCount,
            skills: formData.skills.map((skill) => String(skill)),
            experience: formData.experience || 0,
            postcode: formData.postcode,
            user_id: response1Data.unique_id,
            business_location: formData.business_location,
        };

        
      // console.log("Artisan artisanProfilePayload")
      // console.log(artisanProfilePayload)
      // console.log("Artisan artisanProfilePayload")

        const response2 = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(artisanProfilePayload),
        });

        if (!response2.ok) {
            const errorData = await response2.json();
            const errorMessage = errorData.detail ? errorData.detail : "An error occurred.";
            setError(errorMessage);
        } else {
            const result = await response2.json();
            
            // console.log("Second request successful:", result.unique_id);
             sessionStorage.setItem('Address', result.business_location);
            // sessionStorage.setItem('artisanID', result.id);
            // sessionStorage.setItem('artisan', result.artisan);

            navigate("/vetting-page");
        }
    } catch (error) {
        setError(error.message || "An unexpected error occurred. Please try again later.");
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

  

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills((prevSkills) => {
        const updatedSkills = [...prevSkills, skillInput.trim()];
        setFormData((prevData) => ({
          ...prevData,
          skills: updatedSkills, // Sync skills in formData
        }));
        return updatedSkills;
      });
      setSkillInput(""); // Clear input
    }
  };
  
  
  const removeSkill = (skillToRemove) => {
    setSkills((prevSkills) => {
      const updatedSkills = prevSkills.filter((skill) => skill !== skillToRemove);
      // Update formData.skills
      setFormData((prevData) => ({
        ...prevData,
        skills: updatedSkills, // Sync skills in formData
      }));
      return updatedSkills;
    });
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
        <p><Link to="/">Simservicehub</Link> <ChevronRightIcon /> <Link to="/artisan-sign-up"> Artisan Registration</Link> </p>
          </div>
          </div>
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Artisan Registration</h2>
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
                     name="business_name" 
                     value={formData.business_name}
                     onChange={handleInputChange}
                     placeholder="Enter your business name*" />
                  </div>
            
                  <div className="Gland-Quest-data">
                    <label htmlFor="serviceSelect">State</label>
                    <select name="states" id="states">
    <option value="">Select a State</option>
    <option value="abia">Abia</option>
    <option value="adamawa">Adamawa</option>
    <option value="akwa-ibom">Akwa Ibom</option>
    <option value="anambra">Anambra</option>
    <option value="bauchi">Bauchi</option>
    <option value="bayelsa">Bayelsa</option>
    <option value="benue">Benue</option>
    <option value="borno">Borno</option>
    <option value="cross-river">Cross River</option>
    <option value="delta">Delta</option>
    <option value="ebonyi">Ebonyi</option>
    <option value="edo">Edo</option>
    <option value="ekiti">Ekiti</option>
    <option value="enugu">Enugu</option>
    <option value="gombe">Gombe</option>
    <option value="imo">Imo</option>
    <option value="jigawa">Jigawa</option>
    <option value="kaduna">Kaduna</option>
    <option value="kano">Kano</option>
    <option value="katsina">Katsina</option>
    <option value="kebbi">Kebbi</option>
    <option value="kogi">Kogi</option>
    <option value="kwara">Kwara</option>
    <option value="lagos">Lagos</option>
    <option value="nasarawa">Nasarawa</option>
    <option value="niger">Niger</option>
    <option value="ogun">Ogun</option>
    <option value="ondo">Ondo</option>
    <option value="osun">Osun</option>
    <option value="oyo">Oyo</option>
    <option value="plateau">Plateau</option>
    <option value="rivers">Rivers</option>
    <option value="sokoto">Sokoto</option>
    <option value="taraba">Taraba</option>
    <option value="yobe">Yobe</option>
    <option value="zamfara">Zamfara</option>
    <option value="fct">Federal Capital Territory (FCT)</option>
</select>

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

                  {/* <div className="Gland-Quest-data">
                      <label>Cost of services/skills (Optional)</label>
                      <input
                          type="Number"
                          placeholder="Enter Amount"

                          name="service_cost"
                          value={formData.service_cost}
                          onChange={handleInputChange}
                      />
                  </div> */}
            
            
                  <div className="Gland-Quest-data">
                    
                    <div className="Gland-Quest-data">
                      <label>First Name</label>
                      <input type="text"  name="first_name" placeholder="Your first name" value={formData.first_name}onChange={handleInputChange} />
                    </div>
                    <div className="Gland-Quest-data">
                      <label>Surname</label>
                    <input  type="text" name="last_name"placeholder="Your surname" value={formData.last_name} onChange={handleInputChange}/>
                    </div>
                   

                    <div className="Gland-Quest-data">
                      <label>Address</label>
                    {/* <input type="text"  name="" placeholder="Post code" /> */}

                            {/* Address Search (Postcode will be extracted from selected address) */}
                            <input
                              type="text"
                              placeholder="Search for your address"
                              ref={inputRef} // Ensure this is correctly assigned
                            />

                            </div>

                            <div className="Gland-Quest-data">
                            <label>Post Code</label>

                    {/* Automatically filled postcode field */}
                    <input type="text" name="postcode" placeholder="Post code" value={formData.postcode} readOnly />

                    </div>

                    <div className="Gland-Quest-data">
                    <label>Password</label>
                    <input  type="password" name="password" placeholder="Password should be at least 8 characters long" value={formData.password} onChange={handleInputChange}/>
                    </div>
                    <div className="Gland-Quest-data">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange}/>
                      {error && <div className="error-message">{error}
                        
                    
                    </div>}

                    </div>
                    <div className="Gland-Quest-data">
                    <label>Business Email</label>
                    <input type="email" name="businessEmail" placeholder="Your business email" value={formData.businessEmail} onChange={handleInputChange} />
                    </div>
                    <div className="Gland-Quest-data">
                    <label>Business Phone Number</label>
                    <input type="tel"  name="businessPhone" placeholder="Please enter business phone with country Code (+23491234567678)" value={formData.businessPhone} onChange={handleInputChange} />
                    </div>
                    <div className="Gland-Quest-data">
                    <label>Mobile Number</label>
                    <input type="tel" name="mobile_number" placeholder="Please enter mobile  with country Code (+23491234567678)" value={formData.mobile_number} onChange={handleInputChange}/>
                    </div>
                    <div className="Gland-Quest-data">
                    <label>About Yourself</label>
					          <textarea
                      id="about_artisan" className="description-textarea" name="about_artisan"
                      value={formData.about_artisan} onChange={handleInputChange}
                      placeholder="Tell us about yourself.."
                    />
                    </div>
                  </div>

                </div>

                )}
              </div>
            </div>

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


              <div className="ghha-foot">
                <p>We will contact you by phone, SMS or email to give you more information about how our products and services can help your business. 
                You can opt out at any time by emailing <a href="mailto:info@simservicehub.com">info@simservicehub.com</a></p>       
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
};


export default ArtisanSignUp;

