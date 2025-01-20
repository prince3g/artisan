import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/ArtisanOverview.css';


import AAHeroImg from './Img/ARtA-hero-Img.png';

import GGFAGImg from './Img/GGfag-img.png';

import HghImg1 from './Img/UooaImgs/1.png';
import HghImg2 from './Img/UooaImgs/2.png';
import HghImg3 from './Img/UooaImgs/3.png';


import StatVid from './Img/stats.gif'


import CheckIcon from '@mui/icons-material/Check';


import GInggal from './Img/GInggal.png';

import Hi1 from './Img/hi1.png';
import Hi2 from './Img/hi2.png';

import CallIcon from '@mui/icons-material/Call';

import CloseIcon from "@mui/icons-material/Close";

const ArtisanOverview = () => {

  const [isHidden, setIsHidden] = useState(false); // State to track visibility

  const handleClose = () => {
    setIsHidden(true); // Hide the section
  };


  return (
   <div className='artisan-page'>
    <div className='AA-page-header'>
        <div className='site-container'>
            <div className='AA-Hero-Sec'>
            <div className='AA-Hero-Sec-1'>
            <div className="hero-dlts-main">
                <h2 className="big-text">
                Win Local Jobs and Expand Your Business with <span>SimserviceHub</span>
                </h2>
                <p>We’re here to connect you with Costumer across Nigeria who are actively searching for trusted tradespeople like you. Join our growing platform to gain visibility and unlock access to clients looking for services in your field.</p>

                </div>
            </div>
            <div className='AA-Hero-Sec-2'>
                <img src={AAHeroImg}></img>
            </div>
            </div>
        </div>
    </div>


    <div className='GGfag-sec'>
      <div className='site-container'>
      <div className='GGfag-Top'>
        <h2 className='big-text'>Looking to find work the dependable way?</h2>
        <p>There's plenty of demand for skilled tradespeople but getting the right job at the right time can be a challenge. SimserviceHub is here to simplify the process, connecting you with leads that match your skills and availability.</p>
       <img src={GGFAGImg} />
       </div>

       <div className='GGfag-Grid'>
       <div className='GGfag-Card'>
        <h3>Find All the Work You Need</h3>
        <ul>
          <li>Thousands of Job Opportunities: With hundreds of jobs posted monthly, there’s always work waiting for you.</li>
          <li>Job Matches for Your Skills: Receive leads specifically suited to your trade and expertise.</li>
          <li>Choose Your Location: Decide where you want to work and get leads only from your chosen areas.</li>
          <li>Flexibility in Job Size: Whether it’s a large project or a quick job to fill your schedule, you’re in control of what you take on.</li>
        </ul>
       </div>
       <div className='GGfag-Card'>
        <h3>Stay in Control</h3>
        <ul>
          <li>Join Without Obligations: Sign up for free with zero commitment.</li>
          <li>Flexible Engagement: Respond to job leads only when it works for you.</li>
          <li>No Limits on Interest: Show interest in as many jobs as you want, without any cost.</li>
          <li>Be Recognized with Premium Service: Upgrade to premium and get prioritized at the top of homeowner searches for maximum visibility.</li>
        </ul>
       </div>
       <div className='GGfag-Card'>
        <h3>Build Your Reputation</h3>
        <ul>
          <li>Showcase Your Skills: Create a free profile to highlight your expertise and experience.</li>
          <li>Gain Customer Trust: Let positive reviews from satisfied clients boost your credibility.</li>
          <li>Attract More Clients: A strong reputation draws in more job opportunities, helping your business grow.</li>
        </ul>
       </div>
       </div>
       
       <div className='Jhsia-sec'>
        <h2 className='big-text'>Say Yes To Work You Want</h2>
        <Link to="/artisan-sign-up">Join Now</Link>
       </div>


       <div className='Gakajs-sec'>
       <div className='Gakajs-Header'>
        <h3 className='mid-text'>Business Growth & Advice Centre</h3>
        <p>Take your business to the next level! Explore expert tips, industry insights, and strategies to build a strong reputation and attract more customers</p>
       </div>

       <div className='hgahgs-sec hash-Op'>
  <div className='hgahgs-Card'>
    <img src={HghImg1}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>Essential Tips and Tool For Tradespeople</h3>
    <Link to="/business-tips" >Read</Link>
  </div>
  </div>

  <div className='hgahgs-Card'>
    <img src={HghImg2}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>Comprehensive Vetting Process for Nigerian Artisan: Ensuring Trust, Quality, and Reliability</h3>
    <Link to="/vetting-process" >Read</Link>
  </div>
  </div>


  <div className='hgahgs-Card'>
    <img src={HghImg3}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>How Will Work Come My Way?</h3>
    <Link to="/how-work-comes-your-way" >Read</Link>
  </div>
  </div>


  </div>

       </div>


    {/* <div className='Start_Vid'>
      <img src={StatVid}></img>
    </div> */}


    <div className='auuys8-sec'>
      <h3 className='mid-text'>What Do I Get for My Membership with SimserviceHub?</h3>

      <ul>
        <li>
        <CheckIcon/>
          <span>Present your business professionally with a custom profile page on SimserviceHub, where you can list your skills and showcase your areas of expertise to potential clients.</span>
        </li>

        <li>
        <CheckIcon/>
          <span>Upload high-quality photos of your top projects to highlight your capabilities. This visual display allows clients to see your skills and the quality of your work firsthand.</span>
        </li>

        <li>
        <CheckIcon/>
          <span>Invite clients to leave reviews and rate your services. Positive feedback builds your credibility and encourages others to choose you with confidence.</span>
        </li>

      </ul>

      <div className='GInggal-Sec'>
        <img src={GInggal}></img>
      </div>
    </div>



    <div className='Gkaujs-Sec'>
       <div className='Gkaujs-Card'>
       <img src={Hi1}></img>
        <h3>12-Month Assurance for Costumer and Artisan</h3>
        <p>With SimserviceHub 's 12-month assurance, Costumer gain additional confidence when booking services through our platform. This assurance emphasizes our dedication to quality and reliability, reassuring clients of our Artisans’ commitment to delivering dependable work. Artisan also benefit from this endorsement, as it strengthens trust with clients and provides an added layer of credibility for their services.</p>
       </div>

       <div className='Gkaujs-Card'>
        <img src={Hi2}></img>
        <h3>Support Every Step of the Way</h3>
        <p>With SimserviceHub, you’re never on your own. We’re here to make sure your membership works hard for you, whether you’re a homeowner seeking reliable service or a Artisan showcasing your skills. Our dedicated support team will assist you in getting the most value from your membership and provide guidance if any issues arise. Plus, if you ever face any misunderstandings or challenging feedback, we’re ready to step in and help mediate for a positive outcome, ensuring trust and satisfaction on all sides.</p>
       </div>

       </div>


       <div className='Jhsia-sec hhhaa-btn'>
        <Link to="/artisan-sign-up">Artisan Sign up</Link>
       </div>


      </div>
    </div>


    <div style={{ display: isHidden ? 'none' : 'block' }} className='Call_Cnt_sect'>
      <div className='Call_Cnt_Top'>
        <span onClick={handleClose} style={{ cursor: 'pointer' }}>
          <CloseIcon />
        </span>
      </div>
      <div className='Call_Cnt_Sub'>
        <div className='Call_Cnt_Sub_1'>
          <span><CallIcon /></span>
        </div>
        <div className='Call_Cnt_Sub_2'>
          <p>Speak to an advisor today:</p>
          <h3>Call +442038905470</h3>
        </div>
      </div>
      <div className='Call_Cnt_Bottom'>
        <a href="tel:+442038905470" to="">Call now</a>
      </div>
    </div>






   </div>
  );
};

export default ArtisanOverview;
