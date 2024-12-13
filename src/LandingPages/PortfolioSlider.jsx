import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Css/PortfolioSlider.css"; // Optional: Add custom styles if needed

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

  return (
    <div className="portfolio-slider">
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
  );
};

export default PortfolioSlider;
