import React, { useState, useEffect } from 'react';
import './Css/Main.css';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import PageServices from '../data/PageServices';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const LeaveReview = () => {

  const [artisanProfiles, setArtisanProfiles] = useState([]);
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [query, setQuery] = useState('');

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const artisan_unique_id = decodeURIComponent(searchParams.get('artisanUniqueID') || '');


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

  
  const [selectedTrade, setSelectedTrade] = useState('');
  const [selectedTradeId, setSelectedTradeId] = useState(null);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const [reviewData, setReviewData] = useState({
    service_category_id: '',
    artisan: artisan_unique_id.trim(),
    customer_id:  localStorage.getItem('unique_user_id'),
    reliability_rating: null,
    workmanship_rating: null,
    tidiness_rating: null,
    courtesy_rating: null,
    overall_rating: null,
    review_title: '',
    comment: '',
    service_required: '',
    date_of_experience: '',
   //  value_of_work: null,
    contact_name: '',
    contact_email: '',
    mobile_number: '',
  });

  useEffect(() => {
    if (!query) {
      setArtisanProfiles([]);
      return;
    }

    const fetchArtisanProfiles = debounce(async (query) => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/`);
        const data = await response.json();
        if (data.length === 0) {
          setError('No artisans found');
        }
        setArtisanProfiles(data);
      } catch {
        setError('Error fetching artisan profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 300);

    fetchArtisanProfiles(query);

    return () => {
      fetchArtisanProfiles.cancel();
    };
  }, [query, djangoHostname]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleArtisanSelect = (artisan) => {
    setSelectedArtisan(artisan);
    setQuery(`${artisan.user.first_name} ${artisan.user.last_name}`);
    setArtisanProfiles([]);
  };


  // Handle input change for review fields
  const handleInputChangeReview = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };


  const handleRatingChange = (field, value) => {
    if (!isCheckedReliability && !isCheckedWorkmanship && !isCheckedTidiness && !isCheckedCourtesy) {
      setReviewData((prev) => ({
        ...prev,
        [`${field}_rating`]: value,  // Dynamically update the rating field
      }));
    }
  };
  

  const handleRatingWorkmanshipChange = (value) => {
    setActiveWorkmanshipButton(value);
    handleRatingChange('workmanship', value);
  };

  const handleRatingTidinessChange = (value) => {
    setActiveTidinessButton(value);
    handleRatingChange('tidiness', value);
  };

  const handleRatingCourtesyChange = (value) => {
    setActiveCourtesyButton(value);
    handleRatingChange('courtesy', value);
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    const error = validateReviewData();
    if (error) {
      console.log(error);
      alert(error);
      return;
    }
  
    // Ensure that if a rating is set to null due to 'Not applicable' checkbox, it's handled properly
    const reviewPayload = {
      // service_category: reviewData.service_category_id,
      artisan: reviewData.artisan,
      reviewer_name: reviewData.customer_id || null,
      // customer_id: reviewData.customer_id,
      rating: reviewData.reliability_rating || null,
      reliability_rating: reviewData.reliability_rating || null,
      workmanship_rating: reviewData.workmanship_rating || null,
      tidiness_rating: reviewData.tidiness_rating || null,
      date_of_experience: reviewData.date_of_experience || null,
      courtesy_rating: reviewData.courtesy_rating || null,
      review_title: reviewData.review_title,
      review_text: reviewData.comment,
      // value_of_work: reviewData.value_of_work,
      contact_name: reviewData.contact_name,
      contact_email: reviewData.contact_email,
      mobile_number: reviewData.mobile_number,
    };
  
    // Make the POST request
    const url = `${djangoHostname}/api/artisanReview/auth/api/artisan-reviews/`;
    //const url = `${djangoHostname}/api/tradeReviews/auth/api/trade-reviews/`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewPayload),
      });
  
      if (response.ok) {
        alert('Review submitted successfully!');
        navigate('/thank-you');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Failed to submit the review. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while submitting the review.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const validateReviewData = () => {
    // if (!reviewData.service_category_id) return "Please select a trade.";
    if (!reviewData.reliability_rating) return "Please rate reliability.";
    if (!reviewData.workmanship_rating) return "Please rate workmanship.";
    if (!reviewData.tidiness_rating) return "Please rate tidiness.";
    if (!reviewData.courtesy_rating) return "Please rate courtesy.";
    if (!reviewData.review_title) return "Please provide a review title.";
    if (!reviewData.comment) return "Please provide your review.";
    if (!reviewData.contact_name) return "Please provide your contact name.";
    if (!reviewData.contact_email) return "Please provide your contact email.";
    if (!reviewData.mobile_number) return "Please provide your mobile number.";
    if (!reviewData.customer_id) return "Please login to continue.";

    // console.log("reviewData")
    // console.log(reviewData)
    // console.log("reviewData")
    return null;
  };
   
  const debounceFetchArtisans = debounce(async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/?search=${query}`);
      const data = await response.json();
      setArtisanProfiles(data);
    } catch (error) {
      setError('Error fetching artisan profiles.');
    } finally {
      setLoading(false);
    }
  }, 500);



  const handleSuggestionClick = (service) => {
    setSelectedTrade(service.name);
    setSelectedTradeId(service.unique_id);
    setReviewData((prev) => ({ ...prev, service_category_id: service.unique_id }));
    setSuggestions([]);
};


  const handleCheckboxChangeReliability = () => {
    setIsCheckedReliability(!isCheckedReliability);
    if (!isCheckedReliability) {
      setActiveReliabilityButton(null);  // Reset rating
      setReviewData((prev) => ({
        ...prev,
        reliability_rating: null,  // Set rating to null
      }));
    }
  };
  

  const handleCheckboxChangeWorkmanship = () => {
    setIsCheckedWorkmanship(!isCheckedWorkmanship);
    if (!isCheckedWorkmanship) {
      setActiveWorkmanshipButton(null);  // Reset rating
      setReviewData((prev) => ({
        ...prev,
        workmanship_rating: null,  // Reset the rating value
      }));
    }
  };
  
  const handleCheckboxChangeTidiness = () => {
    setIsCheckedTidiness(!isCheckedTidiness);
    if (!isCheckedTidiness) {
      setActiveTidinessButton(null);
      setReviewData((prev) => ({
        ...prev,
        tidiness_rating: null,  // Reset the rating value
      }));
    }
  };
  
  const handleCheckboxChangeCourtesy = () => {
    setIsCheckedCourtesy(!isCheckedCourtesy);
    if (!isCheckedCourtesy) {
      setActiveCourtesyButton(null);
      setReviewData((prev) => ({
        ...prev,
        courtesy_rating: null,  // Reset the rating value
      }));
    }
  };
  

  const handleReliabilityChange = (value) => {
    setReliabilityYesNo(value);
    setReviewData((prevData) => ({
      ...prevData,
      reliability_answer: value,  // add this to review data
    }));
  };
  

  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p><Link to="/">Simservicehub</Link> <ChevronRightIcon /> <Link to="/leave-review"> Leave a Review</Link> </p>
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
                <label htmlFor="artisanSelect">Which artisan would you like to review?</label>
                <input
                  type="text"
                  placeholder="Start typing the name of the artisan..."
                  value={query}
                  onChange={handleInputChange}
                  disabled={loading}
                />

                {loading && <div className="loading-spinner">Loading...</div>}
                      {!loading && artisanProfiles.length > 0 && (
                        <ul className="suggestions-list">
                          {artisanProfiles.map((artisan) => (
                            <li key={artisan.id} onClick={() => handleArtisanSelect(artisan)}>
                              {artisan.user.first_name} {artisan.user.last_name}
                            </li>
                          ))}
                        </ul>
                      )}
                    {error && <div className="error-message">{error}</div>}
                  </div>

                  {selectedArtisan && (
                <div className="artisan-details">
                  <h3>Selected Artisan: {selectedArtisan.user.first_name} {selectedArtisan.user.last_name}</h3>
                  <p>{selectedArtisan.service_details.simpleDescription}</p>
                  <p>{selectedArtisan.location}</p>
                </div>
              )}

                {selectedArtisan  && (
                  <div className="glahs-sec">
                    <div className="Gland-Quest-data">
                      <label htmlFor="serviceSelect">Was any work carried out?</label>
                      <div className="Opticas">
                        <button
                          className={reliabilityYesNo === 'yes' ? 'active-dect-btn' : ''}
                          onClick={() => handleReliabilityChange('yes')}
                        >
                          Yes
                        </button>
                        <button
                          className={reliabilityYesNo === 'no' ? 'active-dect-btn' : ''}
                          onClick={() => handleReliabilityChange('no')}
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
                                if (!isCheckedReliability) {
                                  setActiveReliabilityButton(i + 1);
                                  handleRatingChange('reliability', i + 1);  // Update reviewData
                                }
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
                              onClick={() => handleRatingWorkmanshipChange(i + 1)} // Set the rating
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="omac-p">
                        <h4>Tidiness</h4>
                        <div className="omac-p-btns">
                          {Array.from({ length: 10 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={activeTidinessButton === i + 1 && !isCheckedTidiness ? 'active-dect-btn' : ''}
                              onClick={() => handleRatingTidinessChange(i + 1)} // Set the rating
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="omac-p">
                        <h4>Courtesy</h4>
                        <div className="omac-p-btns">
                          {Array.from({ length: 10 }, (_, i) => (
                            <button
                              key={i + 1}
                              className={activeCourtesyButton === i + 1 && !isCheckedCourtesy ? 'active-dect-btn' : ''}
                              onClick={() => handleRatingCourtesyChange(i + 1)} // Set the rating
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="Gland-Quest-data">
                        <label>Your brief description</label>
                        <h6>(This will be used as your review title)</h6>
                        <input
                          type="text"
                          placeholder="E.g. Bathroom fitting..."
                          value={reviewData.review_title} // Bind state
                          onChange={(e) => handleInputChangeReview('review_title', e.target.value)} // Update state
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
                            value={reviewData.service_required} // Bind state
                            onChange={(e) => handleInputChangeReview('service_required', e.target.value)} // Update state
                            

                        />
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Date of experience</label>
                        <input
                            type="date"
                            placeholder="E.g. Bathroom fitting..."
                            value={reviewData.date_of_experience} // Bind state
                            onChange={(e) => handleInputChangeReview('date_of_experience', e.target.value)} // Update state
                        />
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Your contact details</label>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={reviewData.contact_name} // Bind state
                            onChange={(e) => handleInputChangeReview('contact_name', e.target.value)} // Update state
                        />
                         <input
                            type="text"
                            placeholder="Email address"
                            value={reviewData.contact_email} // Bind state
                            onChange={(e) => handleInputChangeReview('contact_email', e.target.value)} // Update state
                        />
                    </div>

                    <div className="Gland-Quest-data">
                        <label>Your mobile number</label>
                        <h6>We'll send you an SMS to verify your review.</h6>
                        <input
                            type="number"
                            placeholder="Mobile phone number"
                            value={reviewData.mobile_number} // Bind state
                            onChange={(e) => handleInputChangeReview('mobile_number', e.target.value)} // Update state
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

              <button
                  type="submit"  className="post-job-btn" onClick={handleSubmit}  disabled={isSubmitting} >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveReview;


