import React, { useEffect, useState } from 'react';
import './Css/Comments.css';
import Star from '@mui/icons-material/Star';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PortfolioSlider from './PortfolioSlider';
import MessageIcon from '@mui/icons-material/Message';

const Comments = ({ artisanUniqueId }) => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState('0.0');
  const [ratingCounts, setRatingCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [subRatings, setSubRatings] = useState({
    reliability: '0.0',
    workmanship: '0.0',
    tidiness: '0.0',
    courtesy: '0.0',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!artisanUniqueId) return;


        const response = await axios.get(
          `${djangoHostname}/api/artisanReview/auth/api/artisan-reviews/artisan/${artisanUniqueId}/`
        );
        const data = response.data;

        setReviews(data);
        // Calculate average rating
        const totalRatings = data.reduce((sum, review) => sum + (review.rating || 0), 0);
        const avgRating = data.length > 0 ? (totalRatings / data.length).toFixed(1) : '0.0';
        setAverageRating(avgRating);



        // Count reviews by star rating and calculate sub-ratings
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let reliabilitySum = 0,
          workmanshipSum = 0,
          tidinessSum = 0,
          courtesySum = 0;

        data.forEach((review) => {
          const validRating = Math.min(Math.max(review.rating || 0, 1), 5);
          counts[validRating]++;
          reliabilitySum += review.reliability_rating || 0;
          workmanshipSum += review.workmanship_rating || 0;
          tidinessSum += review.tidiness_rating || 0;
          courtesySum += review.courtesy_rating || 0;
        });

        setRatingCounts(counts);

        const numReviews = data.length;
        setSubRatings({
          reliability: numReviews > 0 ? (reliabilitySum / numReviews).toFixed(1) : '0.0',
          workmanship: numReviews > 0 ? (workmanshipSum / numReviews).toFixed(1) : '0.0',
          tidiness: numReviews > 0 ? (tidinessSum / numReviews).toFixed(1) : '0.0',
          courtesy: numReviews > 0 ? (courtesySum / numReviews).toFixed(1) : '0.0',
        });
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      }
    };

    fetchReviews();
  }, [artisanUniqueId]);

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} style={{ color: index < roundedRating ? '#ffc107' : '#e4e5e9' }} />
    ));
  };

  const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);

  // console.log("totalReviews")
  // console.log(totalReviews)
  // console.log("totalReviews")


  return (
    <div className='comment-sec'>
      <div className='rating-secc'>
        <div className='rating-secc-box'>
          <p>
            <Star /> Artisan Rating 
          </p>
          <div className='cart-pro-rating-sec'>
            <div className='t-cart-pro-rating'>
              <h2>
                {averageRating} <span>out of 10</span>
              </h2>
              <h5>{renderStars(averageRating)}</h5>
              <h6>{totalReviews} Reviews</h6>
            </div>

            <div className='s-cart-pro-rating'>
              {Object.keys(ratingCounts)
                .reverse()
                .map((star) => {
                  const count = ratingCounts[star];
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={star} className='rating-barSec Onprogress'>
                      <span>{star} Star</span>
                      <div className='progress'>
                        <div className='progress-main' style={{ width: `${percentage}%` }}></div>
                      </div>
                      <span>{count}</span>
                    </div>
                  );
                })}

              {Object.entries(subRatings).map(([key, value]) => (
                <div key={key} className='rating-barSec Onprogress'>
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <div className='progress'>
                    <div className='progress-main' style={{ width: `${value * 10}%` }}></div>
                  </div>
                  <span>{value}</span>
                </div>
              ))}

              <div className='Gland-Btns'>
                <Link to={`/leave-reviews?artisanUniqueID=${artisanUniqueId}`}>
                  <Star /> Leave a Review
                </Link>
                <Link
                  to={`/chat-with-artisan?artisanUniqueID=${artisanUniqueId}&service=${artisanUniqueId}`}
                  className='Chhah-btns'
                >
                  <MessageIcon /> Chat with Artisan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='comments-sec'>
          <PortfolioSlider artisanUniqueID={artisanUniqueId} />
          <div className='comments-sec-head'>
            <h3>Customer reviews</h3>
          </div>
          <div className='comments-sec-main'>
            {error && <p className='error'>{error}</p>}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className='comments-sec-box'>
                  <div className='s-comment'>
                    <div className='s-comment-1'>
                      <div className='s-comment-1-flex'>
                        <div className='s-comment-10'>
                          <span>{review.reviewer_name_display.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className='s-comment-11'>
                          <span>{review.reviewer_name_display}</span>
                          <p>{new Date(review.created_at).toLocaleDateString()}</p>

                          {/* <span>{renderStars(review.rating)}</span> */}
                          {/* <p>{review.review_text}</p> */}
                          {/* <p>{review.review_text.split(" ").slice(0, 20).join(" ")}{review.review_text.split(" ").length > 10 ? "..." : ""}</p> */}

                        </div>
                      </div>
                    </div>


                    <div className='s-comment-2'>
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
