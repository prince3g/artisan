
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Star from '@mui/icons-material/Star';
import Handyman from '@mui/icons-material/Handyman';
import MyLocation from '@mui/icons-material/MyLocation';
import Favorite from '@mui/icons-material/Favorite';
import Share from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

import "../LandingPages/Css/Main.css";


import Comments from '../LandingPages/Comments';


import { Link } from "react-router-dom";



const ArtisanReviews = () => {

     const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
     const location = useLocation();
     const artisanDatum = location.state || {};
    
      // Extracting data from the URL
    
      const artisan_unique_id = artisanDatum.artisanDatum.user.unique_id;
      const artisan_firstNAme = artisanDatum.artisanDatum.user.first_name;
      const artisan_lastNAme = artisanDatum.artisanDatum.user.last_name;
      
      
      const [isExpanded, setIsExpanded] = useState(false);
      const [messages, setMessages] = useState([]); // To store messages
      const [showTyping, setShowTyping] = useState(false); // Control "Typing..." message
      const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); // Control welcome message visibility
      const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false); // Check if the first message has been sent
      const [welcomeMessageTime, setWelcomeMessageTime] = useState(''); // Time of the welcome message
    
      const [activeSection, setActiveSection] = useState("chat");
    
      const [isToggled, setIsToggled] = useState(false);
    
    
      const [rating, setRating] = useState(""); // For storing selected rating
      const [review, setReview] = useState(""); // For storing the review text
      const [loading, setLoading] = useState(false); // To show loading state during API call
      const [message, setMessage] = useState(""); // For feedback messages
    
      const handleReviewSubmit = async () => {
        if (!rating || !review.trim()) {
          setMessage("Please provide a rating and a review.");
          return;
        }
      
        setLoading(true);
        setMessage("");
      
        try {
    
          const sanitizedId = artisan_unique_id.trim();
    
          const response = await fetch(`${djangoHostname}/api/artisanReview/auth/api/artisan-reviews/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              artisan: sanitizedId, // Hardcoded artisan ID
              //reviewer_name: "b010a064-4ec1-47a4-b79a-9160be7e4083", // Hardcoded artisan ID
              //reviewer_name: "5c2aefcf-57f1-4582-84b7-54431c36c776", // Hardcoded artisan ID
              reviewer_name: "4711b4e5-8f18-4639-a9b5-496b2cdb8a2c", // Hardcoded artisan ID
              artisan_name,
              rating,
              review_text: review, // Match review variable
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setMessage("Review submitted successfully!");
            setRating("");
            setReview("");
          } else {
            setMessage(`Error: ${data.message || "Failed to submit review."}`);
          }
        } catch (error) {
          setMessage("An error occurred. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      
    
      const handleToggleView = () => {
        setIsExpanded(!isExpanded);
      };
    
      const handleNewMessage = (message, image) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages([
          ...messages,
          { message, image, timestamp, isSent: true, isDelivered: false },
        ]);
      };
    
        // New handler to clear all chats when the "New chat" button is clicked
        const handleNewChat = () => {
          setMessages([]); // Clear all messages
          setShowTyping(false); // Hide "Typing..." message
          setShowWelcomeMessage(false); // Hide the welcome message
          setHasSentFirstMessage(false); // Reset the first message flag
        };
    
      useEffect(() => {
        // Simulate delivery of messages after 3 seconds
        const timer = setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.isSent && !msg.isDelivered
                ? { ...msg, isDelivered: true }
                : msg
            )
          );
    
          // After first message is delivered, show typing message for 3 seconds
          if (!hasSentFirstMessage && messages.length > 0 && messages[0].isDelivered) {
            setHasSentFirstMessage(true);
            setShowTyping(true);
            setWelcomeMessageTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            // Hide typing message after 1 second and show welcome message
            setTimeout(() => {
              setShowTyping(false);
              setShowWelcomeMessage(true);
            }, 3000);
          }
        }, 1000);
    
        return () => clearTimeout(timer); // Cleanup timer on unmount
      }, [messages, hasSentFirstMessage]);
      
    
    
      const handleSectionClick = (section) => {
        setActiveSection(section);
        setIsToggled(true);
      };
    
      const handleCloseClick = () => {
        setActiveSection(null);
        setIsToggled(false);
      };
    
    


  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>{artisan_firstNAme} {artisan_lastNAme}</h3>
      </div>


      <div className={`artii-profile-page Dash-Reviews ${isToggled ? "toggle-mobile-messi" : ""}`}>

<div className='Artisan-comment-sec'>
    <Comments artisanUniqueId={artisan_unique_id} />
    {/* <div className='Drop-Revvo'>
      <button onClick={() => {
        handleSectionClick("review");
        window.scrollTo(0, 0); // Scrolls to the top of the page
      }}>Drop a Review</button>
    </div> */}
  </div>


</div>

   
    </div>
  );
};

export default ArtisanReviews;
