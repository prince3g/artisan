import React, { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";


const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps) {
    //console.log("Google Maps script already loaded!");
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
    // console.log("Google Maps script loaded successfully!");
    callback();
  };
  script.onerror = () => {
    console.error("Failed to load Google Maps script!");
  };
  document.body.appendChild(script);
};


const ProfileSettings = () => {

  const [profilePhoto, setProfilePhoto] = useState(null);
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const artisan_unique_id = sessionStorage.getItem('unique_user_id');
  const inputRef = useRef(null);
  
  const [qualificationsFiles, setQualificationsFiles] = useState([]);
  const [previousJobsFiles, setPreviousJobsFiles] = useState([]);

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
          // console.log("Selected place:", place);
          if (!place || !place.address_components) {
            console.log("No address components found.");
            return;
          }
    
          const postalCodeComponent = place.address_components.find((component) =>
            component.types.includes("postal_code")
          );
    
          if (postalCodeComponent) {
            // console.log("Postcode found:", postalCodeComponent.long_name);
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
  const [service_name, setService_name] = useState("");
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
    artisan_state: "",
    qualifications: "",
    previous_jobs: "",
    lookingFor: "",
    businessType: "",
    employeeCount: "",
    first_name: "",
    last_name: "",
    businessEmail: "",
    businessPhone: "",
    mobile_number: "",
    skills: [],
    about_artisan: "",
    postcode: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userResponse = await fetch(
          `${djangoHostname}/api/accounts/auth/api/users/${artisan_unique_id}/`
        );
        const userData = await userResponse.json();
  
        // Fetch artisan profile data
        const artisanResponse = await fetch(
          `${djangoHostname}/api/profiles/auth/single-artisan-profile/?unique_id=${artisan_unique_id}`
        );
        const artisanData = await artisanResponse.json();
  
       // console.log("artisanData", artisanData);
  
        // Handle skills field
        let parsedSkills = [];
        if (typeof artisanData.skills === "string") {
          try {
            // Try parsing as JSON
            parsedSkills = JSON.parse(artisanData.skills);
          } catch (error) {
            // If parsing fails, assume it's a comma-separated string
            parsedSkills = artisanData.skills.split(",").map((skill) => skill.trim());
          }
        } else if (Array.isArray(artisanData.skills)) {
          // If it's already an array, use it directly
          parsedSkills = artisanData.skills;
        }
        
        // Prepopulate qualifications and previous_jobs
        const prepopulateFiles = async (filePaths, setFiles) => {
          const files = [];
          for (const path of filePaths) {
            try {
              // Ensure the path starts with /media/
              const fullPath = path.startsWith("/media/") ? path : `/media/${path}`;
              console.log("Fetching file:", `${djangoHostname}${fullPath}`); // Debugging
              const response = await fetch(`${djangoHostname}${fullPath}`);
              if (!response.ok) {
                console.warn(`File not found: ${path}`);
                continue; // Skip missing files
              }
              const blob = await response.blob();
              const file = new File([blob], path.split("/").pop(), { type: blob.type });
              files.push(file);
            } catch (error) {
              console.error(`Error fetching file ${path}:`, error);
            }
          }
          setFiles(files);
        };
        if (artisanData.qualifications && artisanData.qualifications.length > 0) {
          await prepopulateFiles(artisanData.qualifications, setQualificationsFiles);
        }
  
        if (artisanData.previous_jobs && artisanData.previous_jobs.length > 0) {
          await prepopulateFiles(artisanData.previous_jobs, setPreviousJobsFiles);
        }
  
        // Update formData and skills state with fetched data
        setFormData((prevData) => ({
          ...prevData,
          first_name: userData.first_name,
          last_name: userData.last_name,
          businessEmail: userData.email,
          businessPhone: userData.phone,
          mobile_number: userData.mobile_number,
          about_artisan: artisanData.about_artisan,
          business_name: artisanData.business_name,
          artisan_state: artisanData.artisan_state,
          lookingFor: artisanData.lookingFor,
          businessType: artisanData.businessType,
          employeeCount: artisanData.employeeCount,
          postcode: artisanData.postcode,
          skills: parsedSkills, // Use parsed skills
        }));
  
        // Update the skills state
        setSkills(parsedSkills);
  
        // Set selected trade if available
        if (artisanData.service_details_id) {
          setSelectedTrade({
            name: artisanData.service_details_id.name,
            unique_id: artisanData.service_details_id.unique_id,
          });
          setQuery(artisanData.service_details_id.name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [artisan_unique_id, djangoHostname]);

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
      unique_id: unique_id, 
    });
    setQuery(service.name); 
    setUnique_id(unique_id); 
    setFormData((prevData) => ({
      ...prevData,
      trade: service.name, 
    }));
    setSuggestions([]); 
    setError(""); 
  };
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    const requestPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      password: formData.password,
      email: formData.businessEmail,
      phone: formData.businessPhone,
      mobile_number: formData.mobile_number,
    };
  
    try {
      const response1 = await fetch(`${djangoHostname}/api/accounts/auth/api/users/${artisan_unique_id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
  
      if (!response1.ok) {
        const errorData = await response1.json();
        const errorMessage = errorData.email ? errorData.email[0] : "An error occurred.";
        setError(errorMessage);
        setLoading(false);
        return;
      }
  
      const response1Data = await response1.json();
      sessionStorage.setItem('unique_user_id', response1Data.unique_id);
      sessionStorage.setItem('artisanID', response1Data.id);
      sessionStorage.setItem('user_type', response1Data.user_type);
  
      if (!selectedTrade || !selectedTrade.unique_id) {
        setError("Please select a valid trade.");
        alert("Please select a valid trade.");
        setLoading(false);
        return;
      }
  
      const formDataPayload = new FormData();
      formDataPayload.append("service_details_id", unique_id);
      formDataPayload.append("business_name", formData.business_name);
      formDataPayload.append("location", formData.location);
      formDataPayload.append("lookingFor", formData.lookingFor);
      formDataPayload.append("businessType", formData.businessType);
      formDataPayload.append("employeeCount", formData.employeeCount);
      formDataPayload.append("skills", JSON.stringify(formData.skills.map((skill) => String(skill))));
      formDataPayload.append("experience", formData.experience || 0);
      formDataPayload.append("artisan_state", formData.artisan_state);
      formDataPayload.append("postcode", formData.postcode);
      formDataPayload.append("user_id", response1Data.unique_id);
      formDataPayload.append("about_artisan", formData.about_artisan);
  
      // Append profile photo if it exists
      if (profilePhoto) {
        formDataPayload.append("user_image", profilePhoto);
      }
  
      // Append qualifications files
      qualificationsFiles.forEach((file, index) => {
        if (file instanceof File) {
          formDataPayload.append("qualifications", file);
        } else {
          console.error("Invalid file detected:", file);
        }
      });
  
      // Append previousJobsFiles files
      previousJobsFiles.forEach((file, index) => {
        if (file instanceof File) {
          formDataPayload.append("previous_jobs", file);
        } else {
          console.error("Invalid file detected:", file);
        }
      });
  
      const response2 = await fetch(`${djangoHostname}/api/profiles/auth/single-artisan-profile/?unique_id=${artisan_unique_id}`, {
        method: "PATCH",
        body: formDataPayload, // Don't set Content-Type manually
      });
  
      if (!response2.ok) {
        const errorData = await response2.json();
        const errorMessage = errorData.detail ? errorData.detail : "An error occurred.";
        setError(errorMessage);
      } else {
        const result = await response2.json();
        sessionStorage.setItem('artisanCategoryName', result.data.service_details.name);
        sessionStorage.setItem('artisanCategory', result.data.service_details.unique_id);
        navigate("/artisan-dashboard");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  
  //   const requestPayload = {
  //     first_name: formData.first_name,
  //     last_name: formData.last_name,
  //     password: formData.password,
  //     email: formData.businessEmail,
  //     phone: formData.businessPhone,
  //     mobile_number: formData.mobile_number,
  //   };
  
  //   try {
  //     const response1 = await fetch(`${djangoHostname}/api/accounts/auth/api/users/${artisan_unique_id}/`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestPayload),
  //     });
  
  //     if (!response1.ok) {
  //       const errorData = await response1.json();
  //       const errorMessage = errorData.email ? errorData.email[0] : "An error occurred.";
  //       setError(errorMessage);
  //       setLoading(false);
  //       return;
  //     }
  
  //     const response1Data = await response1.json();
  //     sessionStorage.setItem('unique_user_id', response1Data.unique_id);
  //     sessionStorage.setItem('artisanID', response1Data.id);
  //     sessionStorage.setItem('user_type', response1Data.user_type);
  
  //     if (!selectedTrade || !selectedTrade.unique_id) {
  //       setError("Please select a valid trade.");
  //       alert("Please select a valid trade.");
  //       setLoading(false);
  //       return;
  //     }
  
  //     const formDataPayload = new FormData();
  //     formDataPayload.append("service_details_id", unique_id);
  //     formDataPayload.append("business_name", formData.business_name);
  //     formDataPayload.append("location", formData.location);
  //     formDataPayload.append("lookingFor", formData.lookingFor);
  //     formDataPayload.append("businessType", formData.businessType);
  //     formDataPayload.append("employeeCount", formData.employeeCount);
  //     formDataPayload.append("skills", JSON.stringify(formData.skills.map((skill) => String(skill))));
  //     formDataPayload.append("experience", formData.experience || 0);
  //     formDataPayload.append("artisan_state", formData.artisan_state);
  //     formDataPayload.append("postcode", formData.postcode);
  //     formDataPayload.append("user_id", response1Data.unique_id);
  //     formDataPayload.append("about_artisan", formData.about_artisan);

  //     if (profilePhoto) formDataPayload.append("user_image", profilePhoto);
  
  //     // Append qualifications files
  //     qualificationsFiles.forEach((file, index) => {
  //       if (file instanceof File) {
  //         formDataPayload.append("qualifications", file);
  //       } else {
  //         console.error("Invalid file detected:", file);
  //       }
  //     });
  
  //     // Append previousJobsFiles files
  //     previousJobsFiles.forEach((file, index) => {
  //       if (file instanceof File) {
  //         formDataPayload.append("previous_jobs", file);
  //       } else {
  //         console.error("Invalid file detected:", file);
  //       }
  //     });
  
  //     const response2 = await fetch(`${djangoHostname}/api/profiles/auth/single-artisan-profile/?unique_id=${artisan_unique_id}`, {
  //       method: "PATCH",
  //       body: formDataPayload, // Don't set Content-Type manually
  //     });
  
  //     if (!response2.ok) {
  //       const errorData = await response2.json();
  //       const errorMessage = errorData.detail ? errorData.detail : "An error occurred.";
  //       setError(errorMessage);
  //     } else {
  //       const result = await response2.json();
  //       sessionStorage.setItem('artisanCategoryName', result.data.service_details.name);
  //       sessionStorage.setItem('artisanCategory', result.data.service_details.unique_id);
  //       navigate("/artisan-dashboard");
  //     }
  //   } catch (error) {
  //     setError(error.message || "An unexpected error occurred. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleInputClick = () => {
    if (!query || !query.trim()) {
      setSuggestions(services);
    }
    setError('');
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


  
  const OOhandleFileChange = (e) => {
    const newFiles = [...e.target.files];
    setQualificationsFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  
  const SShandleFileChange = (e) => {
    const newFiles = [...e.target.files];
    setPreviousJobsFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const OOhandleRemoveFile = (index) => {
    setQualificationsFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  
  const SShandleRemoveFile = (index) => {
    setPreviousJobsFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="Gradnded-page">
                
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Profile Settings</h2>
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
                    <label htmlFor="serviceSelect">Where is your business located?</label>
                    <input 
                     type="text"
                     name="artisan_state"
                     value={formData.artisan_state}
                     onChange={handleInputChange}
                     placeholder="Enter your business address*" />
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
                            <input
                              type="text"
                              placeholder={formData.business_location}
                              
                              ref={inputRef} // Ensure this is correctly assigned
                            />

                            </div>

                            <div className="Gland-Quest-data">
                            <label>Post Code</label>

                    <input type="text" name="postcode" placeholder="Post code" value={formData.postcode} readOnly />

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

                    <div className="Gland-Quest-data all-prolFilw">
                    <label>Upload Profile Photo</label>
                    <input
                      type="file"
                      onChange={handleProfilePhotoChange}
                      accept="image/*"
                    />
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

              </div>
            </div>
            <div className="Gland-Quest-data all-prolFilw">
            <label>Upload Qualifications</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              multiple
              onChange={OOhandleFileChange}
              className="file-input"
            />
              <div className="thumbnail-container">
                {qualificationsFiles.map((file, index) => (
                  <div key={index} className="thumbnail">
                    {file.type.startsWith("image") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="thumbnail"
                        className="thumbnail-image"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className="thumbnail-video"
                        controls
                      ></video>
                    )}
                    <button
                      onClick={() => OOhandleRemoveFile(index)}
                      className="remove-button"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="Gland-Quest-data all-prolFilw">
              <label>Upload Your Previous Jobs</label>
              <input
                type="file"
                accept="image/*, video/*"
                multiple
                onChange={SShandleFileChange}
                className="file-input"
              />
              <div className="thumbnail-container">
                {previousJobsFiles.map((file, index) => (
                  <div key={index} className="thumbnail">
                    {file.type.startsWith("image") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="thumbnail"
                        className="thumbnail-image"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className="thumbnail-video"
                        controls
                      ></video>
                    )}
                    <button
                      onClick={() => SShandleRemoveFile(index)}
                      className="remove-button"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="Gland-Cnt-Btn">
            <button
                  type="submit"
                  className="post-job-btn"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader">Submitting ...</span>
                  ) : (
                    "Continue"
                  )}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfileSettings;

