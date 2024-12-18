import React, { useState, useRef, useEffect  } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Css/PortfolioSlider.css"; 

import Star from '@mui/icons-material/Star';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import PersonIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

import UserImg from './Img/user-img.jpg';

// Importing Material Icons
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

// Importing local images and videos
import image1 from "./Img/PortImgs/1.jpg";
import image2 from "./Img/PortImgs/2.jpg";
import image3 from "./Img/PortImgs/3.jpg";
import video1 from "./Img/PortImgs/video1.mp4";




const mediaData = [
  { type: "image", src: image1 },
  { type: "image", src: image2 },
  { type: "video", src: video1 },
  { type: "image", src: image3 },
];

const PortfolioSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSliderRef = useRef(null); // Reference for the main slider

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: Math.min(mediaData.length, 5), // Show up to 5 thumbnails
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0px",
    arrows: false, // Hide navigation buttons for thumbnails
  };


  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsVisible(false); // Mobile screens
      } else {
        setIsVisible(true); // Desktop screens
      }
    };

    // Check screen size on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const plumberingServices = [
    "Pipe Installation and Repair",
    "Leak Detection and Repair",
    "Clogged Drains Cleaning",
    "Water Heater Installation",
    "Water Heater Repair",
    "Sewer Line Repair",
    "Septic Tank Installation",
    "Septic Tank Maintenance",
    "Toilet Installation and Repair",
    "Faucet Installation and Repair",
    "Shower and Tub Installation",
    "Garbage Disposal Installation",
    "Garbage Disposal Repair",
    "Gas Line Installation",
    "Gas Line Leak Repair",
    "Backflow Prevention Services",
    "Sump Pump Installation",
    "Sump Pump Repair",
    "Water Softener Installation",
    "Water Filtration System Installation",
    "Outdoor Plumbing Repairs",
    "Frozen Pipe Repair",
    "Bathroom Plumbing Renovation",
    "Kitchen Plumbing Renovation",
    "Hydro Jetting Services",
    "Main Water Line Repair",
    "Pressure Regulator Repair",
    "Drainage System Installation",
    "Emergency Plumbing Services",
  ];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  
  return (
    <div className="portfolio-slider">
    <div className="poooap-Header">
      <h2>I'm a great and deligent plumber and I love serving my clients very well, and I make sure I deliver well.</h2>

      
      <div className="Uuua-sec">
                    <div className="Uuua-1">
                      <img src={UserImg} alt="User" />
                    </div>
                    <div className="Uuua-2">
                      <div>
                        <h3>Ndubuisi Prince Godson</h3>
                        <h5> Artisan Portfolio </h5>
                      </div>
                    </div>
                  </div>

    </div>


    <div className="hayyshs-sec">
      <h2 onClick={toggleVisibility}>
        Services and Skills
        {isVisible ? (
          <ExpandMoreIcon style={{ marginLeft: '8px' }} />
        ) : (
          <ExpandLessIcon style={{ marginLeft: '8px' }} />
        )}
      </h2>
      {isVisible && (
         <ul>
         <h3>
           Plumber  <span>{plumberingServices.length} Skills</span>
         </h3>
         <div className="Ull-is">
         {plumberingServices.map((service, index) => (
           <li key={index}>
             <CheckCircleIcon/>
             {service}
           </li>
         ))}
         </div>
       </ul>
      )}
    </div>

    <div className="Rogoos-sec">
      <h2>Company Profile</h2>
    <div className="Rogoos-Tables">
      <table>
        <tr>
          <td>
            <p>
              <PersonIcon style={{ marginRight: '8px' }} /> Owner
            </p>
          </td>
          <td>
            <span>Prince Godson</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <PolicyIcon style={{ marginRight: '8px' }} /> Public Liability Insurance
            </p>
          </td>
          <td>
            <span>Self-Certified</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <HomeIcon style={{ marginRight: '8px' }} /> Address
            </p>
          </td>
          <td>
            <span>Checked</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <DescriptionIcon style={{ marginRight: '8px' }} /> SimulServicesHub T&C's
            </p>
          </td>
          <td>
            <span>Signed</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <BusinessIcon style={{ marginRight: '8px' }} /> Company Type
            </p>
          </td>
          <td>
            <span>LTD Company</span>
          </td>
        </tr>
      </table>

      <table>
        <tr>
          <td>
            <p>
              <CalendarTodayIcon style={{ marginRight: '8px' }} /> Member Since
            </p>
          </td>
          <td>
            <span>2023</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <VerifiedIcon style={{ marginRight: '8px' }} /> Accreditations
            </p>
          </td>
          <td>
            <span>Checked</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <CheckCircleIcon style={{ marginRight: '8px' }} /> Identity
            </p>
          </td>
          <td>
            <span>Checked</span>
          </td>
        </tr>
        <tr>
          <td>
            <p>
              <MoneyOffIcon style={{ marginRight: '8px' }} /> VAT
            </p>
          </td>
          <td>
            <span>No</span>
          </td>
        </tr>
      </table>
      </div>
    </div>


<div className="jahs-slider">

      {/* Main Media Slider */}
      <Slider {...settings} ref={mainSliderRef}>
        {mediaData.map((media, index) => (
          <div key={index}>
            {media.type === "image" ? (
              <img src={media.src} alt={`Media ${index + 1}`} className="main-media" />
            ) : (
              <video
                src={media.src}
                controls
                className="main-media"
                alt={`Media ${index + 1}`}
              />
            )}
          </div>
        ))}
      </Slider>

      {/* Thumbnail Navigation */}
      <div className="thumbnails">
        <Slider {...thumbnailSettings}>
          {mediaData.map((media, index) => (
            <div
              key={index}
              className={`thumbnail ${currentSlide === index ? "active" : ""}`}
              onClick={() => mainSliderRef.current.slickGoTo(index)} // Navigate to clicked thumbnail
            >
              {media.type === "image" ? (
                <img src={media.src} alt={`Thumbnail ${index + 1}`} className="thumbnail-image" />
              ) : (
                <video
                  src={media.src}
                  muted
                  className="thumbnail-image"
                  alt={`Thumbnail ${index + 1}`}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <IconButton
          onClick={() => mainSliderRef.current.slickPrev()}
          className="nav-button prev-button"
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={() => mainSliderRef.current.slickNext()}
          className="nav-button next-button"
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>

    


    <div className="KKhas-sec">
      <h2>Company Info</h2>
      <p>I'm a great and deligent plumber and I love serving my clients very well, and I make sure I deliver well. I'm a great and deligent plumber and I love serving my clients very well, and I make sure I deliver well. I'm a great and deligent plumber and I love serving my clients very well, and I make sure I deliver well.</p>
    </div>

    <div className="Onyes-sec">
      <h2>Contact details</h2>
      <ul>
      <li>
        <span>
          <PhoneIcon /> Contact Number
        </span>
        <a href="tel:09037494084">09037494084</a>
      </li>
      <li>
        <span>
          <LanguageIcon /> Website
        </span>
        <a href="https://www.princegodson.com" target="_blank" rel="noopener noreferrer">
          www.princegodson.com
        </a>
      </li>
    </ul>
    </div>



    </div>
  );
};

export default PortfolioSlider;
