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


// const mediaData = [
//   { type: "image", src: image1 },
//   { type: "image", src: image2 },
//   { type: "video", src: video1 },
//   { type: "image", src: image3 },
// ];

const PortfolioSlider = (artisanUniqueID) => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [currentSlide, setCurrentSlide] = useState(0);
  const mainSliderRef = useRef(null); // Reference for the main slider
  const [artisanData, setArtisanData] = useState([]); // Initialize service categories state
  const [isVisible, setIsVisible] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [mediaData, setMediaData] = useState([]); // State for media data

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


  
  useEffect(() => {
    const sanitizedId = artisanUniqueID.artisanUniqueID; // Ensure artisanUniqueId is defined

  
    const fetchArtisanDetail = async () => {
      if (!sanitizedId) {
        console.error('Artisan Unique ID is missing');
        return;
      }
      try {

      const sanitizedId = artisanUniqueID.artisanUniqueID.replace(/\/$/, ""); // Remove trailing slash
      const response = await fetch(`${djangoHostname}/api/profiles/auth/single-artisan-profile/?unique_id=${sanitizedId}`, {
      
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Match server-side CORS_ALLOW_CREDENTIALS
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
       //  console.log("Fetched Artisan Data:", data);
        setArtisanData(data);
        parseAvailabilityData(data.availability);


        // console.log("data.previous_jobs")
        // console.log(data.previous_jobs)
        // console.log("data.previous_jobs")

        // Construct mediaData from previous_jobs
        if (data.previous_jobs && Array.isArray(data.previous_jobs)) {
          const mediaFiles = data.previous_jobs.map((filePath) => {
            const fileType = filePath.split('.').pop().toLowerCase();
            return {
              type: fileType === 'mp4' ? 'video' : 'image', // Determine file type
              src: `${djangoHostname}/media/${filePath}`, // Construct full URL
            };
          });
          setMediaData(mediaFiles);
        }
        
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      }
    };
    
  
    fetchArtisanDetail();
  }, []); // Use artisanUniqueId and djangoHostname in dependency array
  
  // Fetch artisan data

  const parseAvailabilityData = (availabilityData) => {
    if (availabilityData?.AllDay?.enabled) {
      // If "All Day" is enabled, show only that
      setAvailability([
        {
          day: "All Day",
          fromTime: availabilityData.AllDay.from,
          toTime: availabilityData.AllDay.to,
        },
      ]);
    } else {
      // If "All Day" is not enabled, show only individually enabled days
      const individualAvailability = Object.entries(availabilityData)
        .filter(([day, times]) => day !== "AllDay" && times.enabled) // Exclude "All Day" and disabled days
        .map(([day, times]) => ({
          day,
          fromTime: times.from,
          toTime: times.to,
        }));
      setAvailability(individualAvailability);
    }
  };
  


  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  
    const toggleTableVisibility = () => {
      setIsTableVisible(!isTableVisible);
    };
  

    // Handle skills field
    let parsedSkills = [];
    if (typeof artisanData.skills === "string") {
      try {
        // Try parsing as JSON
        parsedSkills = JSON.parse(artisanData.skills);
      } catch (error) {
        // If parsing fails, assume it's a comma-separated string
        parsedSkills = artisanData.skills.split(",").map((skill) => skill.trim());
      }
    } else if (Array.isArray(artisanData.skills)) {
      // If it's already an array, use it directly
      parsedSkills = artisanData.skills;
          }


  return (
    <div className="portfolio-slider">
    <div className="poooap-Header">
      <h2>{artisanData.user?.about_artisan && artisanData.user?.about_artisan? `${artisanData.user.about_artisan}`: "Artisan Name"}</h2>

      
      <div className="Uuua-sec">
                    <div className="Uuua-1">
                      <img src={UserImg} alt="User" />
                    </div>
                    <div className="Uuua-2">
                      <div>
                      <h3>
                        {artisanData.user?.first_name && artisanData.user?.last_name
                          ? `${artisanData.user.first_name} ${artisanData.user.last_name}`
                          : "Artisan Name"}
                      </h3>
                        <h5> Artisan Portfolio </h5>
                      </div>
                    </div>
                  </div>

    </div>


    <div className="hayyshs-sec">
      <h2 onClick={toggleVisibility}>
        Services and Skills
        {isVisible ? (
          <ExpandLessIcon style={{ marginLeft: '8px' }} />
        ) : (
          <ExpandMoreIcon style={{ marginLeft: '8px' }} />
        )}
      </h2>
      {isVisible && (
         <ul>
        <h3>
          {artisanData.service_details?.name 
            ? artisanData.service_details.name 
            : "Artisan Skills"} 
          <span>&nbsp; &nbsp; {artisanData.skills ? JSON.parse(artisanData.skills).length : 0} &nbsp; &nbsp; Skills</span>
        </h3>

          <div className="Ull-is">
            {artisanData.skills ? (
              JSON.parse(artisanData.skills).map((skill, index) => (
                <li key={index}>
                  <CheckCircleIcon />
                  {skill.trim()}
                </li>
              ))
            ) : (
              <li>No skills available</li>
            )}
          </div>
       </ul>
      )}
    </div>



<div className="Rogoos-sec hayyshs-sec">
        <h2 onClick={toggleTableVisibility} style={{ cursor: 'pointer' }}>
          Time Availability
          {isTableVisible ? <ExpandLessIcon style={{ marginLeft: '8px' }} /> : <ExpandMoreIcon style={{ marginLeft: '8px' }} />}
        </h2>
        {isTableVisible && (
          <div className="Rogoos-Tables oahsk-tabel">
            <table>
              <thead>
                <tr>
                  <th>Days</th>
                  <th>From Time</th>
                  <th>To Time</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.fromTime}</td>
                    <td>{item.toTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

<div className="jahs-slider">

      {/* Main Media Slider */}
      <Slider {...settings} ref={mainSliderRef}>
          {mediaData.map((media, index) => (
            <div key={index}>
              {media.type === "image" ? (
                <img src={media.src} alt={`Media ${index + 1}`} className="main-media" />
              ) : (
                <video src={media.src} controls className="main-media" alt={`Media ${index + 1}`} />
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
            <span>{artisanData.user?.first_name && artisanData.user?.last_name? 
            `${artisanData.user.first_name} ${artisanData.user.last_name}`: "Artisan Name"}</span>
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
              <HomeIcon style={{ marginRight: '8px' }} /> {artisanData.location? `${artisanData.location}`: "Address"}
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
          <span>
            {artisanData?.user?.date_joined? new Date(artisanData.user.date_joined).toLocaleString('default', { year: 'numeric', month: 'long' })
              : 'Date Unavailable'}
          </span>
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
        <a href="tel:09037494084">{artisanData.user?.phone && artisanData.user?.phone? 
            `${artisanData.user.phone}`: "Artisan Phone"}</a>
      </li>
      <li>
        <span>
          <LanguageIcon /> Email
        </span>
        <a href={`mailto:${artisanData.user?.email ? artisanData.user.email : "example@example.com"}`}  target="_blank" rel="noopener noreferrer">
        {artisanData.user?.email && artisanData.user?.email? 
            `${artisanData.user.email}`: "Artisan Email"}
        </a>
      </li>
    </ul>
    </div>



    </div>
  );
};

export default PortfolioSlider;
