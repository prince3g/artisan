import React from 'react';
import './Css/Comments.css';
import Star from '@mui/icons-material/Star';


const Comments = () => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  
  return (
   <div className='comment-sec'>
    <div className='rating-secc'>
    <div className='rating-secc-box'>
    <p><Star />Artisan Rating</p>
    <div className="cart-pro-rating-sec">
            <div className="t-cart-pro-rating">
                <h2>
                    3.7 <span>out of 5</span>
                </h2>
                <h5>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
                </h5>
                <h6>61 Reviews</h6>
            </div>
            <div className="s-cart-pro-rating">
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
            </div>
        </div>
    </div>
    </div>
    <div>
    <div className="comments-sec">
      <div className="comments-sec-head">
        <h3>Reviews</h3>
      </div>
      <div className="comments-sec-main">
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
      </div>

    </div>

    </div>
   </div>
  );
};

export default Comments;
