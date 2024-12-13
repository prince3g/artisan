import React, { useEffect, useState } from 'react';
import './Css/Comments.css';
import Star from '@mui/icons-material/Star';
import axios from 'axios';

import PortfolioSlider from './PortfolioSlider';

const Comments = ({ artisanUniqueId }) => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });



  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const sanitizedId = artisanUniqueId.trim();
        const response = await axios.get(
          `${djangoHostname}/api/artisanReview/auth/api/artisan-reviews/artisan/${sanitizedId}/`
        );
        setReviews(response.data);

        // Calculate average rating
        const totalRatings = response.data.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = response.data.length > 0 ? totalRatings / response.data.length : 0;
        setAverageRating(avgRating.toFixed(1)); // Round to 1 decimal place

        // Count reviews by star rating
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        response.data.forEach((review) => {
          counts[review.rating]++;
        });
        setRatingCounts(counts);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      }
    };

    if (artisanUniqueId) {
      fetchReviews();
    }
  }, [artisanUniqueId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} style={{ color: index < rating ? '#ffc107' : '#e4e5e9' }} />
    ));
  };

  const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);

  return (
   <div className='comment-sec'>
    <div className='rating-secc'>
    <div className='rating-secc-box'>
    <p><Star />Artisan Rating</p>


    <div className="cart-pro-rating-sec">


            <div className="t-cart-pro-rating">
                <h2>
                  {averageRating} <span>out of 5</span>
                </h2>

                

                <h5>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
                
                </h5>
                <h6>{reviews.length} Reviews</h6>
                
            </div>
            {/* <div className="s-cart-pro-rating">
                <div className="rating-barSec Onprogress">
                    <span>5 Star</span>
                    <div className="progress">
                        <div className="progress-main progress-main-80"></div>
                    </div>
                    <span>45</span>
                </div>
                <div className="rating-barSec Onprogress">
                    <span>4 Star</span>
                    <div className="progress">
                        <div className="progress-main progress-main-30"></div>
                    </div>
                    <span>13</span>
                </div>
                <div className="rating-barSec Onprogress">
                    <span>3 Star</span>
                    <div className="progress">
                        <div className="progress-main progress-main-10"></div>
                    </div>
                    <span>13</span>
                </div>
                <div className="rating-barSec">
                    <span>2 Star</span>
                    <div className="progress">
                        <div className="progress-main progress-main-0"></div>
                    </div>
                    <span>0</span>
                </div>
                <div className="rating-barSec">
                    <span>1 Star</span>
                    <div className="progress">
                        <div className="progress-main progress-main-0"></div>
                    </div>
                    <span>0</span>
                </div>
            </div> */}

            <div className="s-cart-pro-rating">
              {Object.keys(ratingCounts)
                .reverse()
                .map((star) => {
                  const count = ratingCounts[star];
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className="rating-barSec Onprogress">
                      <span>{star} Star</span>
                      <div className="progress">
                        <div
                          className="progress-main"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}
            </div>
        </div>
    </div>
    </div>
    <div>
    <div className="comments-sec">
      
      <PortfolioSlider />
      <div className="comments-sec-head">
        <h3>Reviews</h3>
      </div>
      {/* <div className="comments-sec-main">
        <div className="comments-sec-box">
          <div className="s-comment">
            <div className="s-comment-1">
              <div className="s-comment-1-flex">
                <div className="s-comment-10">
                  <span>o</span>
                </div>
                <div className="s-comment-11">
                  <span>Olamide</span>
                  <p>September 10, 2021</p>
                </div>
              </div>
            </div>
            <div className="s-comment-2">
              <span>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              </span>
              <p>Awesome</p>
            </div>
          </div>
        </div>

        <div className="comments-sec-box">
          <div className="s-comment">
            <div className="s-comment-1">
              <div className="s-comment-1-flex">
                <div className="s-comment-10">
                  <span>p</span>
                </div>
                <div className="s-comment-11">
                  <span>Peter</span>
                  <p>December 1, 2021</p>
                </div>
              </div>
            </div>
            <div className="s-comment-2">
              <span>
              <Star />
              <Star />
              <Star />
              <Star />
              </span>
              <p>as described</p>
            </div>
          </div>
        </div>


        <div className="comments-sec-box">
          <div className="s-comment">
            <div className="s-comment-1">
              <div className="s-comment-1-flex">
                <div className="s-comment-10">
                  <span>e</span>
                </div>
                <div className="s-comment-11">
                  <span>Evelyn</span>
                  <p>October 11, 2021</p>
                </div>
              </div>
            </div>
            <div className="s-comment-2">
              <span>
              <Star />
              <Star />
              <Star />
              </span>
              <p>I love the know Maggi chicken</p>
            </div>
          </div>
        </div>


        <div className="comments-sec-box">
          <div className="s-comment">
            <div className="s-comment-1">
              <div className="s-comment-1-flex">
                <div className="s-comment-10">
                  <span>m</span>
                </div>
                <div className="s-comment-11">
                  <span>Maryam</span>
                  <p>December 15, 2022</p>
                </div>
              </div>
            </div>
            <div className="s-comment-2">
              <span>
              <Star />
              </span>
              <p>Always giving less for more, thank you Unilever</p>
            </div>
          </div>
        </div>
      </div> */}


    <div className="comments-sec-main">
          {error && <p className="error">{error}</p>}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="comments-sec-box">
                <div className="s-comment">
                  <div className="s-comment-1">
                    <div className="s-comment-1-flex">
                      <div className="s-comment-10">
                        <span>{review.reviewer_name_display.charAt(0).toLowerCase()}</span>
                      </div>
                      <div className="s-comment-11">
                        <span>{review.reviewer_name_display}</span>
                        <p>{new Date(review.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="s-comment-2">
                    <span>{renderStars(review.rating)}</span>
                    <p>{review.review_text}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
    </div>

    </div>
   </div>
  );
};

export default Comments;
