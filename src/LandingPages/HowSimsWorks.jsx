import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material';

import './Css/HowSimsWorks.css';

import HowSimBanner from './Img/HowSimBanner.png';

import Un1 from './Img/UnImg/un1.svg';
import Un2 from './Img/UnImg/un2.svg';
import Un3 from './Img/UnImg/un3.svg';
import Un4 from './Img/UnImg/un4.svg';
import Un5 from './Img/UnImg/un5.svg';
import Un6 from './Img/UnImg/un6.svg';
import Un7 from './Img/UnImg/un7.svg';
import Un8 from './Img/UnImg/un8.svg';


const HowSimsWorks = () => {
  return (
    <div className='Hhh_ss_Work'>
    <div className='Gent-Tt-Sec'>
        <div className='site-container'>
            <div className='Gent-Tt-Hero'>
            <div className='Gent-Tt-Banner'>
                <img src={HowSimBanner}></img>
            </div>
            <div className='Gent-Tt-Dlt'>
                <h2 className='big-text'>How SimserviceHub Works</h2>
                <p>Hiring a skilled tradesperson through SimserviceHub is simple and stress-free. Just let us know what you need, and our smart matching process will help connect you to the best professionals across Nigeria, bringing quality and trust to every project.</p>
            </div>
            </div>
           
        </div>
    </div>

    <div className='Hhh_ss_Work-main'>
        <div className='site-container'>
        <div className='Hhh_ss_Work_Grid'>
        <div className='Hhh_ss_Work_Card'>
            <img src={Un1}></img>
            <h3>Post a Job</h3>
            <p>Get started by posting your job details in a few easy steps. Once it’s live on SimserviceHub, we’ll notify qualified tradespeople who are ready to help.</p>
            <p>You can even add pictures to your post for more precise quotes.</p>
        </div>

        <div className='Hhh_ss_Work_Card'>
            <img src={Un2}></img>
            <h3>See Who’s Interested</h3>
            <p>Once your job is posted, our system identifies relevant tradespeople and alerts them to your needs. Interested professionals will reach out and express their interest.</p>
        </div>


        <div className='Hhh_ss_Work_Card'>
            <img src={Un3}></img>
            <h3>Choose the Best Fit</h3>
            <p>Review interested tradespeople near you. We’ll only share contact details once you give the go-ahead, ensuring your privacy until you’re ready to connect.</p>
        </div>


        <div className='Hhh_ss_Work_Card'>
            <img src={Un4}></img>
            <h3>Compare Quotes</h3>
            <p>Tradespeople will provide quotes for the work. You can browse their profiles, check out past projects, and read reviews from other clients.</p>
        </div>

        <div className='Hhh_ss_Work_Card'>
            <img src={Un5}></img>
            <h3>Stay Within Budget</h3>
            <p>Our tradespeople usually give estimates based on the type of work and materials needed, helping you find a professional that meets your budget.</p>
        </div>


        <div className='Hhh_ss_Work_Card'>
            <img src={Un6}></img>
            <h3>Check Reviews</h3>
            <p>Previous customers leave feedback after each job, allowing you to see their experiences. Reviews ensure you can choose a reliable tradesperson with confidence.</p>
        </div>


        <div className='Hhh_ss_Work_Card'>
            <img src={Un7}></img>
            <h3>Getting the Job Done</h3>
            <p>Once you’ve agreed on the terms, pricing, and schedule, your tradesperson will get started on your project, keeping you updated along the way.</p>
        </div>


        <div className='Hhh_ss_Work_Card'>
            <img src={Un8}></img>
            <h3>Review and Rate Your Experience</h3>
            <p>When the job is complete, leave a review to share your experience. Our review system keeps artisans accountable, ensuring that only top-quality professionals thrive on our platform.</p>
        </div>


        </div>
        </div>
    </div>
    </div>
  );
};

export default HowSimsWorks;
