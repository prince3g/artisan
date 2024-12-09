// import React, { useState } from 'react';
// import './Css/Main.css';
// import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
// import PageServices from '../data/PageServices'; // Assuming this contains your trade data

// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// const LeaveReview = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [error, setError] = useState('');
//   const [selectedTrade, setSelectedTrade] = useState('');
//   const navigate = useNavigate();  // Initialize the navigate function

//   const [activeReliabilityButton, setActiveReliabilityButton] = useState(null);
//   const [activeWorkmanshipButton, setActiveWorkmanshipButton] = useState(null);
//   const [activeTidinessButton, setActiveTidinessButton] = useState(null);
//   const [activeCourtesyButton, setActiveCourtesyButton] = useState(null);

//   const [reliabilityYesNo, setReliabilityYesNo] = useState(null); // Separate state for Yes/No buttons

//   const [isCheckedReliability, setIsCheckedReliability] = useState(false);
//   const [isCheckedWorkmanship, setIsCheckedWorkmanship] = useState(false);
//   const [isCheckedTidiness, setIsCheckedTidiness] = useState(false);
//   const [isCheckedCourtesy, setIsCheckedCourtesy] = useState(false);

//   const handleInputChange = (e) => {
//     const input = e.target.value.trim();
//     setQuery(input);
//     setSelectedTrade(''); // Clear previously selected trade when typing

//     if (input === '') {
//       setSuggestions([]);
//       setError('');
//       // Reset all active states when clearing input
//       resetAllActiveStates();
//     } else {
//       const filteredSuggestions = PageServices.filter((service) =>
//         service.name.toLowerCase().includes(input.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);

//       if (filteredSuggestions.length === 0) {
//         setError('Trade does not exist');
//       } else {
//         setError('');
//       }
//     }
//   };

//   const handleSuggestionClick = (name) => {
//     setQuery(name);
//     setSuggestions([]);
//     setError('');
//     setSelectedTrade(name);
//     // Reset all active states when selecting a new suggestion
//     resetAllActiveStates();
//   };

//   const resetAllActiveStates = () => {
//     setActiveReliabilityButton(null);
//     setActiveWorkmanshipButton(null);
//     setActiveTidinessButton(null);
//     setActiveCourtesyButton(null);
//     setReliabilityYesNo(null);
//     setIsCheckedReliability(false);
//     setIsCheckedWorkmanship(false);
//     setIsCheckedTidiness(false);
//     setIsCheckedCourtesy(false);
//   };

//   const handleCheckboxChangeReliability = () => {
//     setIsCheckedReliability(!isCheckedReliability);
//   };

//   const handleCheckboxChangeWorkmanship = () => {
//     setIsCheckedWorkmanship(!isCheckedWorkmanship);
//   };

//   const handleCheckboxChangeTidiness = () => {
//     setIsCheckedTidiness(!isCheckedTidiness);
//   };

//   const handleCheckboxChangeCourtesy = () => {
//     setIsCheckedCourtesy(!isCheckedCourtesy);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(textareaContent); // Use the content of the textarea
//     // You can also add form submission logic here, like sending data to an API
//   };

//   const handleBackClick = () => {
//     navigate(-1);  // Go back to the previous page
//   };

//   return (
//     <div className="Gradnded-page">
//                     <div className='navigating-ttarvs'>
//         <div className='site-container'>
//             <p>Simservicehub <ChevronRightIcon /> Homeowner <ChevronRightIcon /> Leave a Review </p>
//           </div>
//           </div>
//       <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Leave a Review</h2>
//             </div>
//             <div className="Gradnded-Box-Body">
//               <div className="Gland-Quest">
//                 <div className="Gland-Quest-data">
//                   <label htmlFor="serviceSelect">Which trade would you like to review?</label>
//                   <input
//                     type="text"
//                     placeholder="Start typing the name of the trade..."
//                     value={query}
//                     onChange={handleInputChange}
//                   />
//                   {suggestions.length > 0 && (
//                     <ul className="suggestions-list">
//                       {suggestions.map((service, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleSuggestionClick(service.name)}
//                           className="suggestion-item"
//                         >
//                           {service.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                   {error && <div className="error-message">{error}</div>}
//                 </div>

//                 {selectedTrade && (
//                   <div className="glahs-sec">
//                     <div className="Gland-Quest-data">
//                       <label htmlFor="serviceSelect">Was any work carried out?</label>
//                       <div className="Opticas">
//                         <button
//                           className={reliabilityYesNo === 'yes' ? 'active-dect-btn' : ''}
//                           onClick={() => setReliabilityYesNo('yes')}
//                         >
//                           Yes
//                         </button>
//                         <button
//                           className={reliabilityYesNo === 'no' ? 'active-dect-btn' : ''}
//                           onClick={() => setReliabilityYesNo('no')}
//                         >
//                           No
//                         </button>
//                       </div>
//                     </div>

//                     <div className="Gland-Quest-data">
//                       <label htmlFor="serviceSelect">How would you rate the experience?</label>
//                       <div className="omac-p">
//                         <h6>(1 = Terrible, 10 = Excellent)</h6>
//                         <h4>Reliability & timekeeping</h4>
//                         <div className="omac-p-btns">
//                           {Array.from({ length: 10 }, (_, i) => (
//                             <button
//                               key={i + 1}
//                               className={activeReliabilityButton === i + 1 && !isCheckedReliability ? 'active-dect-btn' : ''}
//                               onClick={() => {
//                                 if (!isCheckedReliability) setActiveReliabilityButton(i + 1);
//                               }}
//                             >
//                               {i + 1}
//                             </button>
//                           ))}
//                         </div>
//                         <div className="not-applicable-section">
//                           <label className="styled-checkbox-label">
//                             <input
//                               type="checkbox"
//                               className="styled-checkbox"
//                               checked={isCheckedReliability}
//                               onChange={handleCheckboxChangeReliability}
//                             />
//                             <h5>Not applicable</h5>
//                           </label>
//                         </div>
//                       </div>

//                       <div className="omac-p">
//                         <h4>Quality of workmanship</h4>
//                         <div className="omac-p-btns">
//                           {Array.from({ length: 10 }, (_, i) => (
//                             <button
//                               key={i + 1}
//                               className={activeWorkmanshipButton === i + 1 && !isCheckedWorkmanship ? 'active-dect-btn' : ''}
//                               onClick={() => {
//                                 if (!isCheckedWorkmanship) setActiveWorkmanshipButton(i + 1);
//                               }}
//                             >
//                               {i + 1}
//                             </button>
//                           ))}
//                         </div>
//                         <div className="not-applicable-section">
//                           <label className="styled-checkbox-label">
//                             <input
//                               type="checkbox"
//                               className="styled-checkbox"
//                               checked={isCheckedWorkmanship}
//                               onChange={handleCheckboxChangeWorkmanship}
//                             />
//                             <h5>Not applicable</h5>
//                           </label>
//                         </div>
//                       </div>

//                       <div className="omac-p">
//                         <h4>Tidiness</h4>
//                         <div className="omac-p-btns">
//                           {Array.from({ length: 10 }, (_, i) => (
//                             <button
//                               key={i + 1}
//                               className={activeTidinessButton === i + 1 && !isCheckedTidiness ? 'active-dect-btn' : ''}
//                               onClick={() => {
//                                 if (!isCheckedTidiness) setActiveTidinessButton(i + 1);
//                               }}
//                             >
//                               {i + 1}
//                             </button>
//                           ))}
//                         </div>
//                         <div className="not-applicable-section">
//                           <label className="styled-checkbox-label">
//                             <input
//                               type="checkbox"
//                               className="styled-checkbox"
//                               checked={isCheckedTidiness}
//                               onChange={handleCheckboxChangeTidiness}
//                             />
//                             <h5>Not applicable</h5>
//                           </label>
//                         </div>
//                       </div>

//                       <div className="omac-p">
//                         <h4>Courtesy</h4>
//                         <div className="omac-p-btns">
//                           {Array.from({ length: 10 }, (_, i) => (
//                             <button
//                               key={i + 1}
//                               className={activeCourtesyButton === i + 1 && !isCheckedCourtesy ? 'active-dect-btn' : ''}
//                               onClick={() => {
//                                 if (!isCheckedCourtesy) setActiveCourtesyButton(i + 1);
//                               }}
//                             >
//                               {i + 1}
//                             </button>
//                           ))}
//                         </div>
//                         <div className="not-applicable-section">
//                           <label className="styled-checkbox-label">
//                             <input
//                               type="checkbox"
//                               className="styled-checkbox"
//                               checked={isCheckedCourtesy}
//                               onChange={handleCheckboxChangeCourtesy}
//                             />
//                             <h5>Not applicable</h5>
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="Gland-Quest-data">
//                         <label>Your brief description</label>
//                         <h6>(This will be used as your review title)</h6>
//                         <input
//                             type="text"
//                             placeholder="E.g. Bathroom fitting..."
//                         />
//                     </div>

//                     <div className="Gland-Quest-data">
//                         <label>Your review</label>
//                         <textarea
//                             type="text"
//                             placeholder="In you words, tell us about your experience.."
//                         ></textarea>
//                     </div>

//                     <div className="Gland-Quest-data">
//                         <label>What services did you require?</label>
//                         <input
//                             type="text"
//                             placeholder="E.g. Bathroom fitting..."
//                         />
//                     </div>

//                     <div className="Gland-Quest-data">
//                         <label>Date of experience</label>
//                         <input
//                             type="date"
//                             placeholder="E.g. Bathroom fitting..."
//                         />
//                     </div>

//                     <div className="Gland-Quest-data">
//                         <label>What was the value of work completed? (Optional)</label>
//                         <h6>In naira (₦)</h6>
//                         <input
//                             type="number"
//                             placeholder="Enter the value in naira (₦)"
//                         />
//                     </div>


//                     <div className="Gland-Quest-data">
//                         <label>Your contact details</label>
//                         <input
//                             type="text"
//                             placeholder="Full name"
//                         />
//                          <input
//                             type="text"
//                             placeholder="Email address"
//                         />
//                     </div>

//                     <div className="Gland-Quest-data">
//                         <label>Your mobile number</label>
//                         <h6>We'll send you an SMS to very your review.</h6>
//                         <input
//                             type="number"
//                             placeholder="Mobile phone number"
//                         />
                        
//                     </div>


//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="Gland-Cnt-Btn">
//                 <button type="button" className="back-btn" onClick={handleBackClick}>
//                   Back
//                 </button>
//                 <button type="submit" className="post-job-btn" onClick={handleSubmit}>
//                   Submit
//                 </button>
//               </div>
    
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveReview;


import React, { useState, useEffect } from 'react';
import './Css/Main.css';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const LeaveReview = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const [reliabilityYesNo, setReliabilityYesNo] = useState('');

  const [activeReliabilityButton, setActiveReliabilityButton] = useState(null);
  const [isCheckedReliability, setIsCheckedReliability] = useState(false);

  const [activeWorkmanshipButton, setActiveWorkmanshipButton] = useState(null);
  const [isCheckedWorkmanship, setIsCheckedWorkmanship] = useState(false);

  const [activeTidinessButton, setActiveTidinessButton] = useState(null);
  const [isCheckedTidiness, setIsCheckedTidiness] = useState(false);

  const [activeCourtesyButton, setActiveCourtesyButton] = useState(null);
  const [isCheckedCourtesy, setIsCheckedCourtesy] = useState(false);

  const [selectedTrade, setSelectedTrade] = useState(''); // store the selected trade name
  const [selectedTradeId, setSelectedTradeId] = useState(null); // store the unique_id of selected trade
  const [serviceCategories, setServiceCategories] = useState([]); // Initialize service categories state
  const [reviewData, setReviewData] = useState({
    service_category_id: '',  // This should use the unique_id when trade is selected
    customer_id: "26d17a45-3c8f-4098-8120-de467abe136f",
    reliability_rating: null,
    workmanship_rating: null,
    tidiness_rating: null,
    courtesy_rating: null,
    overall_rating: null,
    review_title: '',
    comment: '',
    value_of_work: null,
    contact_name: '',
    contact_email: '',
    mobile_number: '',
  });

  // Fetch service categories from the API endpoint
  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/service-categories/`);
        const data = await response.json();
        setServiceCategories(data.results); // Set the service categories state to the 'results' array
      } catch (error) {
        console.error('Error fetching service categories:', error);
      }
    };

    fetchServiceCategories();
  }, []);

  // Handle input change in the trade search
  const handleInputChange = (e) => {
    const input = e.target.value.trim();
    setQuery(input);
    setSelectedTrade('');
    setSuggestions([]);
    setError('');

    if (input) {
      // Ensure you're filtering from the 'results' array
      const filteredSuggestions = serviceCategories.filter((service) =>
        service.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      if (filteredSuggestions.length === 0) setError('Trade does not exist');
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (service) => {
    setQuery(service.name);
    setSelectedTrade(service.name);
    setSelectedTradeId(service.unique_id); // store the unique_id
    setReviewData((prev) => ({ ...prev, service_category_id: service.unique_id })); // update reviewData with unique_id
    setSuggestions([]);
    setError('');
  };

  // Handle rating changes
  const handleRatingChange = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle input change for review fields
  const handleInputChangeReview = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${djangoHostname}/api/tradeReviews/auth/api/trade-reviews/`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        navigate('/thank-you'); // Redirect to a thank-you page
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Failed to submit the review. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while submitting the review.');
    }
  };

  // Handle checkbox changes
  const handleCheckboxChangeReliability = (e) => {
    setIsCheckedReliability(e.target.checked);
  };

  const handleCheckboxChangeWorkmanship = (e) => {
    setIsCheckedWorkmanship(e.target.checked);
  };

  const handleCheckboxChangeTidiness = (e) => {
    setIsCheckedTidiness(e.target.checked);
  };

  const handleCheckboxChangeCourtesy = (e) => {
    setIsCheckedCourtesy(e.target.checked);
  };

  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>Simservicehub <ChevronRightIcon /> Homeowner <ChevronRightIcon /> Leave a Review</p>
        </div>
      </div>
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Leave a Review</h2>
            </div>
            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label htmlFor="serviceSelect">Which trade would you like to review?</label>
                  <input
                    type="text"
                    placeholder="Start typing the name of the trade..."
                    value={query}
                    onChange={handleInputChange}
                  />
                  {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                      {suggestions.map((service) => (
                        <li
                          key={service.id}
                          onClick={() => handleSuggestionClick(service)}
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
                      <label htmlFor="serviceSelect">Was any work carried out?</label>
                      <div className="Opticas">
                        <button
                          className={reliabilityYesNo === 'yes' ? 'active-dect-btn' : ''}
                          onClick={() => setReliabilityYesNo('yes')}
                        >
                          Yes
                        </button>
                        <button
                          className={reliabilityYesNo === 'no' ? 'active-dect-btn' : ''}
                          onClick={() => setReliabilityYesNo('no')}
                        >
                          No
                        </button>

                      </div>
                    </div>

                    <div className="Gland-Quest-data">
                      <label htmlFor="serviceSelect">How would you rate the experience?</label>
                      <div className="omac-p">
                        <h6>(1 = Terrible, 10 = Excellent)</h6>
                        <h4>Reliability & timekeeping</h4>
                        <div className="omac-p-btns">
                          {Array.from({ length: 10 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={activeReliabilityButton === i + 1 && !isCheckedReliability ? 'active-dect-btn' : ''}
                              onClick={() => {
                                if (!isCheckedReliability) setActiveReliabilityButton(i + 1);
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <div className="not-applicable-section">
                          <label className="styled-checkbox-label">
                            <input
                              type="checkbox"
                              className="styled-checkbox"
                              checked={isCheckedReliability}
                              onChange={handleCheckboxChangeReliability}
                            />
                            <h5>Not applicable</h5>
                          </label>
                        </div>
                      </div>

                      <div className="omac-p">
                        <h4>Quality of workmanship</h4>
                        <div className="omac-p-btns">
                          {Array.from({ length: 10 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={activeWorkmanshipButton === i + 1 && !isCheckedWorkmanship ? 'active-dect-btn' : ''}
                              onClick={() => {
                                if (!isCheckedWorkmanship) setActiveWorkmanshipButton(i + 1);
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <div className="not-applicable-section">
                          <label className="styled-checkbox-label">
                            <input
                              type="checkbox"
                              className="styled-checkbox"
                              checked={isCheckedWorkmanship}
                              onChange={handleCheckboxChangeWorkmanship}
                            />
                            <h5>Not applicable</h5>
                          </label>
                        </div>
                      </div>

                      <div className="omac-p">
                        <h4>Tidiness</h4>
                        <div className="omac-p-btns">
                          {Array.from({ length: 10 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={activeTidinessButton === i + 1 && !isCheckedTidiness ? 'active-dect-btn' : ''}
                              onClick={() => {
                                if (!isCheckedTidiness) setActiveTidinessButton(i + 1);
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <div className="not-applicable-section">
                          <label className="styled-checkbox-label">
                            <input
                              type="checkbox"
                              className="styled-checkbox"
                              checked={isCheckedTidiness}
                              onChange={handleCheckboxChangeTidiness}
                            />
                            <h5>Not applicable</h5>
                          </label>
                        </div>
                      </div>

                      <div className="omac-p">
                        <h4>Courtesy</h4>
                        <div className="omac-p-btns">
                          {Array.from({ length: 10 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={activeCourtesyButton === i + 1 && !isCheckedCourtesy ? 'active-dect-btn' : ''}
                              onClick={() => {
                                if (!isCheckedCourtesy) setActiveCourtesyButton(i + 1);
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <div className="not-applicable-section">
                          <label className="styled-checkbox-label">
                            <input
                              type="checkbox"
                              className="styled-checkbox"
                              checked={isCheckedCourtesy}
                              onChange={handleCheckboxChangeCourtesy}
                            />
                            <h5>Not applicable</h5>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Your brief description</label>
                        <h6>(This will be used as your review title)</h6>
                        <input
                            type="text"
                            placeholder="E.g. Bathroom fitting..."
                        />
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Your review</label>
                      <textarea
                        type="text"
                        placeholder="In your words, tell us about your experience.."
                        value={reviewData.comment} // Bind the state here
                        onChange={(e) => handleInputChangeReview('comment', e.target.value)} // Update the state on change
                    ></textarea>

                    </div>



                    <div className="Gland-Quest-data">
                        <label>What services did you require?</label>
                        <input
                            type="text"
                            placeholder="E.g. Bathroom fitting..."
                        />
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Date of experience</label>
                        <input
                            type="date"
                            placeholder="E.g. Bathroom fitting..."
                        />
                    </div>

                    <div className="Gland-Quest-data">
                        <label>What was the value of work completed? (Optional)</label>
                        <h6>In naira (₦)</h6>
                        <input
                            type="number"
                            placeholder="Enter the value in naira (₦)"
                        />
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
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Your mobile number</label>
                        <h6>We'll send you an SMS to very your review.</h6>
                        <input
                            type="number"
                            placeholder="Mobile phone number"
                        />
                        
                    </div>


                  </div>
                )}
              </div>
            </div>

            <div className="Gland-Cnt-Btn">
              <button type="button" className="back-btn" onClick={() => navigate(-1)}>
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

export default LeaveReview;
