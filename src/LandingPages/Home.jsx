import React, { useState, useEffect } from 'react';
import './Css/Home.css';

import { Link } from 'react-router-dom';

import HeroBanner from './Img/hero-banner.png';
import SearchIcon from './Img/search-icon.svg';


import ServiceSlider from "../assets/ServiceSlider";

import { CheckCircle, Verified, People, Close, ArrowForward } from '@mui/icons-material';


import StepImg1 from './Img/StepImg/1.png';
import StepImg2 from './Img/StepImg/2.png';
import StepImg3 from './Img/StepImg/3.png';

import HghImg1 from './Img/hghImgs/1.png';
import HghImg2 from './Img/hghImgs/2.png';
import HghImg3 from './Img/hghImgs/3.png';

import LocationList from '../assets/LocationList';

import WhyBanner from './Img/why-Banner.png';

import PageServices from '../data/PageServices';

import locations from '../data/Locations';

import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [services, setServices] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('trade');
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch services data from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/jobs/auth/service-categories/`);
        const data = await response.json();
        setServices(data.results);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSearchTypeChange = (type) => {
    setCurrentSearch((prevType) => (prevType === type ? 'trade' : type));
    setShowDropdown(false);
    setInputValue('');
  };

  const handleDropdownClick = (item) => {
    setInputValue(item);
    setShowDropdown(false);
  };


  const handleSearch = () => {
    if (currentSearch === 'trade') {
      const trade = services.find((t) => t.name.toLowerCase() === inputValue.toLowerCase());
      if (trade) {
        setPopupContent({
          title: `What do you need a ${trade.name} for?`,
          list: trade.services,
        });
        setShowPopup(true);
      } else {
        setPopupContent({ title: 'Trade not available', list: [] });
        setShowPopup(true);
      }
    }
  };

  // const handleSearch = () => {
  //   if (currentSearch === 'trade') {
  //     const trade = PageServices.find((t) => t.name.toLowerCase() === inputValue.toLowerCase());
  //     if (trade) {
  //       setPopupContent({
  //         title: `What do you need a ${trade.name} for?`,
  //         list: trade.services,
  //       });
  //       setShowPopup(true);
  //     } else {
  //       setPopupContent({ title: 'Trade not available', list: [] });
  //       setShowPopup(true);
  //     }
  //   } else if (currentSearch === 'location') {
  //     if (locations.includes(inputValue)) {
  //       setPopupContent({
  //         title: `What trade are you looking for in ${inputValue}?`,
  //         list: PageServices.map((trade) => trade.name),
  //       });
  //       setShowPopup(true);
  //       setSelectedTrade(null); // Reset trade selection
  //     } else {
  //       setPopupContent({ title: 'Location not recognized', list: [] });
  //       setShowPopup(true);
  //     }
  //   } else if (currentSearch === 'name') {
  //     const foundTrade = PageServices.filter((trade) =>
  //       trade.name.toLowerCase().includes(inputValue.toLowerCase())
  //     );
  
  //   }
  // };

  const handleServiceSelection = (service) => {
    if (selectedTrade) {
      navigate(
        `/search-results?trade=${selectedTrade.name}&service_details_id=${selectedTrade.unique_id}&service=${service}&services=${encodeURIComponent(
          JSON.stringify(selectedTrade.services)
        )}`
      );
    }
  };

  const handleClosePopup = () => {
    setInputValue('');
    setShowDropdown(false);
    setShowPopup(false);
  };


  return (
    <div className="Home-page">
    <div className="hero-sec">
      <div className="site-container">
        <div className="hero-cont">
          <div className="hero-dlts">
            <div className="hero-dlts-main">
              <h6>SimserviceHub Trusted Artisan </h6>
              <h2 className="big-text">
                Discover Vetted <span>Artisan</span> for Every Home Project
              </h2>
              <p>Your trusted platform for connecting with experienced, reliable Artisans.</p>

              <div className="Search-Sec">
                <div className="top-Search">
                  {currentSearch === 'trade' && (
                    <div className="Seach-OO1">
                      <label htmlFor="trade-input">Search for a Specific Trade</label>
                      <input
                        type="text"
                        placeholder="Trade Type (e.g., Plumber, Electrician)"
                        autoComplete="off"
                        id="trade-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      />
                      {showDropdown && inputValue && (
                        <div className="dropdown">
                          {services
                            .filter((search) => search.name.toLowerCase().includes(inputValue.toLowerCase())) // Filter suggestions
                            .map((search, index) => (
                              <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleDropdownClick(search.name)}
                              >
                                {search.name}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                  {currentSearch === 'location' && (
                    <div className="Seach-OO1">
                      <label htmlFor="location-input">Search by Location</label>
                      <input
                        type="text"
                        placeholder="Enter Location (e.g., Lagos)"
                        autoComplete="off"
                        id="location-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      />
                      {showDropdown && inputValue && (
                        <div className="dropdown">
                          {locations
                            .filter((state) => state.toLowerCase().includes(inputValue.toLowerCase())) // Filter suggestions
                            .map((state, index) => (
                              <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleDropdownClick(state)}
                              >
                                {state}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                  {currentSearch === 'name' && (
                    <div className="Seach-OO1">
                      <label htmlFor="name-input">Search by Name</label>
                      <input
                        type="text"
                        placeholder="Enter Artisan Name (e.g., John Jerry)"
                        autoComplete="off"
                        id="name-input"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                      />
                    </div>
                  )}
                  <button className="search-btn" onClick={handleSearch}>
                    <img src={SearchIcon} alt="Search Icon" />
                    Search
                  </button>
                </div>
                <div className="Sub-Search">
                  <button onClick={() => handleSearchTypeChange('location')}>
                    {currentSearch === 'location' ? 'Search for a Specific Trade' : 'Location Search'}
                  </button>
                  <span>or</span>
                  <button onClick={() => handleSearchTypeChange('name')}>
                    {currentSearch === 'name' ? 'Search for a Specific Trade' : 'Search by Name'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-banner">
            <img src={HeroBanner} alt="Hero Banner" />
          </div>
        </div>
      </div>
    </div>

       {/* {showPopup && (
        <div className="Services-PopUp-Sec">
          <div className="Services-PopUp-Box">
            <div className="Services-PopUp-Box-Header">
              <h3>{popupContent.title}</h3>
              <button className="Close-Service-PopUp" onClick={handleClosePopup}>
                <Close />
              </button>
            </div>
            <div className="Services-PopUp-Box-Main">
              <ul>
                {popupContent.list.map((service, index) => (
                  <li key={index} onClick={() => handleServiceSelection(service)}>
                    <span>{service} <ArrowForward /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )} */}

      
      {showPopup && (
        <div className="Services-PopUp-Sec">
          <div className="Services-PopUp-Box">
            <div className="Services-PopUp-Box-Header">
              <h3>{popupContent.title}</h3>
              <button className="Close-Service-PopUp" onClick={handleClosePopup}>
                <Close />
              </button>
            </div>
            <div className="Services-PopUp-Box-Main">
            <ul>
                {popupContent.list.map((service, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (currentSearch === 'location' && selectedTrade) {
                        handleServiceSelection(service); // Navigate to search-results page
                      } else if (currentSearch === 'trade') {
                        // Logic for 'trade' search
                        const trade = services.find(
                          (t) => t.name.toLowerCase() === inputValue.toLowerCase()
                        );
                        if (trade) {
                          // Setting popup content for services based on the selected trade

                          // console.log("trade")
                          // console.log(trade)
                          // console.log("trade")

                          setPopupContent({
                            title: `What do you need a ${trade.name} for?`,
                            list: trade.services,
                          });
                          setShowPopup(true); // Show the popup

                          // Navigate to the page for the selected trade


                          navigate(
                            `/search-results?trade=${trade.name}&service=${service}&service_details_id=${trade.unique_id}&services=${encodeURIComponent(
                              JSON.stringify(trade.services)
                            )}`
                          );

                        } else {
                          setPopupContent({ title: 'Trade not available', list: [] });
                          setShowPopup(true); // Show popup with message for unavailable trade
                        }
                      } else {
                        handleTradeSelection(service); // Continue trade selection
                      }
                    }}
                  >
                    <span>{service} <ArrowForward /></span> {/* Non-clickable text */}
                    
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
      )}



    <div className='service-sec'>
      <div className='site-container'>
        <div className='service-header'>
          <h2 className='mid-text'>Browse Our Top Service Categories </h2>
        </div>

        <ServiceSlider />
      </div>
    </div>

<div className='Oggg-sec'>
  <div className='site-container'>
  <div className='Oggg-Grid'>
  <div className='Oggg-Part1'>
    <div className='Oggg-header'>
  <h2 className='big-text'>Why Choose SimserviceHub’s <span>Artisan</span> Network?</h2>
  </div>
  <div className='Oggg-Card'>
    <h3><CheckCircle /> Guaranteed Work Quality</h3>
    <p>SimserviceHub offers quality assurance for all Artisan projects. T & Cs apply</p>
  </div>
  <div className='Oggg-Card'>
    <h3><Verified /> Rigorous Screening Process </h3>
    <p>All Artisan undergo a thorough verification process, including background and skill checks.</p>
  </div>
  <div className='Oggg-Card'>
    <h3><People /> Trusted service </h3>
    <p>We maintain transparency and trust.</p>
  </div>
  </div>
  <div className='Oggg-Part2'>
    <img src={WhyBanner}></img>
  </div>
 
  </div>
  </div>
</div>


<div className='Cosii-mam'>
  <div className='site-container'>
  <div className='Cosii-mam-header'>
    <h2 className='mid-text'>How to Hire the Right Artisan with SimserviceHub</h2>
  </div>
  <div className='Cosii-mam-Grid'>
  <div className='Cosii-mam-Card'>
    <img src={StepImg1}></img>
    <h3>01</h3>
    <div className='Cosii-mam-Card-txt'>
    <p>Post Your Job for Free</p>
    <span>Share your job details on SimserviceHub at no cost. Describe the work you need done and add any specifics or photos to help tradespeople understand your needs.</span>
  </div>
  </div>

  <div className='Cosii-mam-Card'>
    <img src={StepImg2}></img>
    <h3>02</h3>
    <div className='Cosii-mam-Card-txt'>
    <p>Receive Responses from Tradespeople</p>
    <span>Once your job is posted, qualified tradespeople and professionals will be notified and can express their interest. You’ll start receiving responses in no time.</span>
  </div>
  </div>

  <div className='Cosii-mam-Card'>
    <img src={StepImg3}></img>
    <h3>03</h3>
    <div className='Cosii-mam-Card-txt'>
    <p>Review Profiles and Make Your Choice </p>
    <span>Browse profiles of interested tradespeople. You can check their work history, reviews, and qualifications to find the perfect match for your project. When you’re ready, select the best person for the job. </span>
  </div>
  </div>

  </div>
  <div className='Cosii-mam-foot'><Link to="how-sim-works">How SimserviceHub Works</Link></div>
  </div>
</div>


<div className='site-container'>
  <div className='hgahgs-sec'>
  <div className='hgahgs-Card'>
    <img src={HghImg1}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>How Was Your Experience? Leave a Review</h3>
    <p>Help us build a trustworthy community by sharing your experience with our tradespeople. Your feedback is invaluable.  </p>
    <Link to="/leave-review" >Leave a Review</Link>
  </div>
  </div>

  <div className='hgahgs-Card'>
    <img src={HghImg2}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>Request a Quote</h3>
    <p>Tell us your requirements, and we’ll connect you with up to three verified Artisan.  </p>
    <Link to="/request-quote" >Request a Quote</Link>
  </div>
  </div>


  <div className='hgahgs-Card'>
    <img src={HghImg3}></img>
    <div className='hgahgs-Card-Dlt'>
    <h3>Customers rely on Simservicehub to find skilled, verified trades person.</h3>
    <p>Sign up and grow your Business Today.</p>
    <Link to="/artisan-sign-up" >Artisan Sign-Up</Link>
  </div>
  </div>


  </div>
</div>

  <LocationList />





    </div>
  );
}

export default Home;

