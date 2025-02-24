import React, { useState, useEffect } from 'react';
import './Css/Main.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FlashMessage from "../FlashMessage/FlashMessage.jsx";


const LeaveReview1 = () => {

  const [flash, setFlash] = useState(null);    
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };


  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const artisan_unique_id = decodeURIComponent(searchParams.get('artisanUniqueID') || '');
  

  const [reliabilityYesNo, setReliabilityYesNo] = useState('');
  const [activeReliabilityButton, setActiveReliabilityButton] = useState(null);
  const [isCheckedReliability, setIsCheckedReliability] = useState(false);
  const [activeWorkmanshipButton, setActiveWorkmanshipButton] = useState(null);
  const [isCheckedWorkmanship, setIsCheckedWorkmanship] = useState(false);
  const [activeTidinessButton, setActiveTidinessButton] = useState(null);
  const [isCheckedTidiness, setIsCheckedTidiness] = useState(false);
  const [activeCourtesyButton, setActiveCourtesyButton] = useState(null);
  const [isCheckedCourtesy, setIsCheckedCourtesy] = useState(false);


  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const [reviewData, setReviewData] = useState({
    service_category_id: '',
    artisan: artisan_unique_id.trim(),
    customer_id:  sessionStorage.getItem('unique_user_id'),
    reliability_rating: null,
    workmanship_rating: null,
    tidiness_rating: null,
    courtesy_rating: null,
    overall_rating: null,
    review_title: '',
    comment: '',
    service_required: '',
    date_of_experience: '',
    contact_name: '',
    contact_email: '',
    mobile_number: '',
  });

  
  const handleInputChangeReview = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };


  const handleRatingChange = (field, value) => {
    if (!isCheckedReliability && !isCheckedWorkmanship && !isCheckedTidiness && !isCheckedCourtesy) {
      setReviewData((prev) => ({
        ...prev,
        [`${field}_rating`]: value,  
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
    showMessage(error, "error");
    return;
  }

  const reviewPayload = {
    artisan: artisan_unique_id,
    reviewer_name: reviewData.customer_id || null,
    rating: reviewData.reliability_rating || null,
    reliability_rating: reviewData.reliability_rating || null,
    workmanship_rating: reviewData.workmanship_rating || null,
    tidiness_rating: reviewData.tidiness_rating || null,
    date_of_experience: reviewData.date_of_experience || null,
    courtesy_rating: reviewData.courtesy_rating || null,
    review_title: reviewData.review_title,
    review_text: reviewData.comment,
    contact_name: reviewData.contact_name,
    contact_email: reviewData.contact_email,
    mobile_number: reviewData.mobile_number,
  };

  const url = `${djangoHostname}/api/artisanReview/auth/api/artisan-reviews/`;

//   console.log("artisan")
//   console.log(artisan_unique_id)
//   console.log("artisan")

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewPayload),
    });

    if (response.ok) {
      showMessage("Review submitted successfully!", "success");
      navigate('/');
    } else {
      const errorData = await response.json();
      if (errorData) {
        let errorMessage = "Failed to submit the review due to the following errors:";
        Object.entries(errorData).forEach(([field, messages]) => {
          errorMessage += `\n- ${field}: ${messages.map(msg => msg).join(", ")}`;
        });
        showMessage(errorMessage, "failure");
      } else {
        showMessage("Failed to submit the review. Please try again.", "failure");
      }
    }
  } catch (err) {
    showMessage("An error occurred while submitting the review.", "failure");
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

 
    return null;
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
            {flash && (
            <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash(null)}
            />
            )}
              <h2 className="big-text">Leave a Review</h2>
            </div>
            <div className="Gradnded-Box-Body">
              <div className="Gland-Quest">


                {artisan_unique_id  && (
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
                            type="text"
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

export default LeaveReview1;


