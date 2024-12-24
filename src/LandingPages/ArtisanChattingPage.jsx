import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Css/ArtisanProfile.css';
import UserImg from './Img/user-img.jpg';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import ChatInput from './ChatInput';

import ChatBanner from './Img/nochat-banner.svg';

import Comments from './Comments';


import { Link } from "react-router-dom";

const ArtisanChattingPage = () => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  // Extracting data from the URL

  const service = decodeURIComponent(searchParams.get('service') || '');
  const artisan_name = decodeURIComponent(searchParams.get('artisan_name') || '');
  const service_details = decodeURIComponent(searchParams.get('service_details') || '');
  const artisan_location = decodeURIComponent(searchParams.get('artisan_location') || '');

  const artisanUniqueID = decodeURIComponent(searchParams.get('artisanUniqueID') || '');

  const artisan_phone = decodeURIComponent(searchParams.get('artisan_phone') || '');


  const [artisanData, setArtisanData] = useState([]); // Initialize service categories state

  
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
          reviewer_name: "5e2fa660-58a2-4b5d-8e59-70f3a1b704e2", // Hardcoded artisan ID
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

  useEffect(() => {
    const sanitizedId = artisanUniqueID?.trim(); // Ensure artisanUniqueId is defined
  
    const fetchArtisanDetail = async () => {
      if (!sanitizedId) {
        console.error('Artisan Unique ID is missing');
        return;
      }
      try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/artisan-profile/${sanitizedId}/`, {
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
        //console.log("Fetched Artisan Data:", data);
        setArtisanData(data);
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      }
    };
  
    fetchArtisanDetail();
  }, [artisanUniqueID, djangoHostname]); // Use artisanUniqueId and djangoHostname in dependency array
  


  return (
    <div className={`artii-profile-page ${isToggled ? "toggle-mobile-messi" : ""}`}>
      <div className="navigating-ttarvs">
        <div className="large-container">
        <p>
          <Link to="/">
            Simservicehub
          </Link>
          <ChevronRightIcon /> {service_details}
          <ChevronRightIcon /> {artisanData.service_details?.name && artisanData.service_details?.name? `${artisanData.service_details.name}`: "Artisan Name"}
          <ChevronRightIcon /> {artisan_name}

            <ChevronRightIcon /> <Link to="/artisan-profile">Artisan Profile</Link>
            <ChevronRightIcon /> <Link to="/chat-with-artisan">Chat with {artisanData.user?.first_name && artisanData.user?.last_name
                          ? `${artisanData.user.first_name} ${artisanData.user.last_name}`: "Artisan Name"}</Link>
        </p>

        </div>
      </div>

      <div className="Prof-Sec">
        <div className="large-container">
          <div className="Prof-Main">
            <div className="Prof-Left">
              <div className="Prof-Left-main">
                <div className="prof-top">
        

                  <div className="ggaa-navsi">
                  <button onClick={() => handleSectionClick("chat")}>
                    <ChatIcon /> <span className="toolTipsa">Chat</span>
                  </button>
                  <button onClick={() => handleSectionClick("call")}>
                    <CallIcon /> <span className="toolTipsa">Call</span>
                  </button>

                  <button>
                      <Favorite /> <span className="toolTipsa">Favourite</span>
                    </button>

                  

                </div>


                  <div className="Uuua-sec">
                    <div className="Uuua-1">
                      <img src={UserImg} alt="User" />
                    </div>
                    <div className="Uuua-2">
                      <div>
                        <h3>{artisan_name}</h3>
                        <h6>
                          <span>
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                          </span>{' '}
                          <span>Reviews (150)</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="aius">
                    <h6>{artisanData.user?.first_name && artisanData.user?.last_name? `${artisanData.user.first_name} ${artisanData.user.last_name}`: " "} &nbsp; Profile</h6>
                    <p>
                      <span>
                        <Handyman /> {artisanData.service_details?.name && artisanData.service_details?.name?`${artisanData.service_details.name}`: "Artisan Skills"} 
                      </span>
                      <span>
                        <MyLocation /> {artisanData.location? `${artisanData.location}`: "Address"}
                      </span>
                    </p>
                    <h4>
                      <DateRangeIcon /> Member Since {artisanData?.user?.date_joined? new Date(artisanData.user.date_joined).toLocaleString('default', { year: 'numeric', month: 'long' })
                        : 'Date Unavailable'}
                    </h4>
                  </div>
                </div>

                <div className="ooais-sec">
                  <div className="ooais-Part">
                    <h4>About</h4>
                    <p className={`about-text ${isExpanded ? 'expanded' : ''}`}>
                      {/* We create outfits that befit your personality..., think classy,
                      think Impression stitches. Our mission is to redefine fashion by
                      creating timeless designs and ensuring quality in every stitch.
                      Experience unparalleled craftsmanship with our bespoke tailoring
                      service, where every detail is tailored to perfection. */}
                      {artisanData.user?.about_artisan && artisanData.user?.about_artisan? `${artisanData.user.about_artisan}`: "Artisan Name"}
                    </p>
                    <span className="viewMoreOrLess" onClick={handleToggleView}>
                      {isExpanded ? 'View less' : 'View more'}
                    </span>
                  </div>
                  <div className="ooais-Part">
                    <h4>Skills</h4>
                    <ul>
                    {artisanData.skills ? (
                      artisanData.skills.map((skill, index) => (
                        <li key={index}>
                          <CheckCircleIcon />
                          {skill.trim()}
                        </li>
                      ))
                    ) : (
                      <li>No skills available</li>
                    )}
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            <div className="Chattt-sec">
              
            <div className="Chattt-Topp-3">
                    <button className="active-togl-atti" onClick={handleCloseClick}><CloseIcon /></button>
                </div>
                
            {activeSection === "chat" && (
              <div className="Chattt-Topp">
                <div className="Chattt-Topp-1">
                  <h3>Chat with {artisanData.user?.first_name && artisanData.user?.last_name? `${artisanData.user.first_name} ${artisanData.user.last_name}`: " "} &nbsp;</h3>
                </div>
                <div className="Chattt-Topp-2">
                  <span>
                     Online<i className="online"></i>
                  </span>
                  <span>
                  <div>Chats</div> <b>{messages.length}</b>
                  </span>
                  <button onClick={handleNewChat}>
                    <ChatIcon /> <div>New chat</div>
                  </button>
                </div>
              </div>
                )}
{activeSection === "chat" && (
              <div className="Chattt-Mid">

                <div className='Chatting-section'>
                <div className='Chatting-section-Main'>
         {/* Check if there are no messages */}
         {messages.length === 0 && (
                  <p className="no-messages">
                     <img src={ChatBanner}></img>
                    <span>No messages yet. Start a conversation!</span>
                  </p>
                )}
                
  {/* Render the first message, followed by the welcome message */}
  {messages.length > 0 && (
    <div className="Chatting-Clamp respond-Box">
      <div
        className={`Mnachatting-box ${
          messages[0].isSent ? 'sent' : 'received'
        }`}
      >
        <p>{messages[0].message}</p>
        {messages[0].image && (
          <img
            src={messages[0].image}
            alt="uploaded"
            className="Main-image-preview"
          />
        )}
        <div className="Mess-hsja">
          <span>{messages[0].timestamp || 'Just now'}</span>
          <span className="message-status double-check">✔✔</span>
          
        </div>
      </div>
    </div>
  )}


  {/* Welcome message */}
  {showWelcomeMessage && (
    <div className="Chatting-Clamp">
      <div className="Mnachatting-box">
        <p>
          Thank you for reaching out! ❤️ Whether you have a project in mind or just want to discuss your ideas, 
          I'm here to bring your vision to life. 💡
        </p>
        <div className="Mess-hsja">
          <span>{welcomeMessageTime}</span>
        </div>
      </div>
    </div>
  )}

    {/* Show Typing message */}
    {showTyping && (
    <div className="Chatting-Clamp">
      <div className="Mnachatting-box typing">
        <p>Typing...</p>
      </div>
    </div>
  )}

  {/* Render remaining messages */}
  {messages.slice(1).map((msg, index) => (
    <div key={index} className="Chatting-Clamp respond-Box">
      <div
        className={`Mnachatting-box ${
          msg.isSent ? 'sent' : 'received'
        }`}
      >
        <p>{msg.message}</p>
        {msg.image && (
          <img
            src={msg.image}
            alt="uploaded"
            className="Main-image-preview"
          />
        )}
        <div className="Mess-hsja">
          <span>{msg.timestamp || 'Just now'}</span>
          {/* Message Status */}
          {msg.isSent && !msg.isDelivered && (
            <span className="message-status single-check">✔</span>
          )}
          {msg.isDelivered && (
            <span className="message-status double-check">✔✔</span>
          )}
        </div>
      </div>
    </div>
  ))}

  </div>



  <div className="Chattt-Foot">
    <ChatInput onNewMessage={handleNewMessage} />
  </div>

  </div>
</div>

)}

            
{activeSection === "call" && (
            <div className='Call-Sec'>
              <div className='call-Box'>
              <img src={UserImg} alt="User" />
                <h3>{artisanData.user?.first_name && artisanData.user?.last_name? `${artisanData.user.first_name} ${artisanData.user.last_name}`: "Artisan Name"}</h3>
                <p>Phone no: {artisanData.user?.phone && artisanData.user?.phone?  `${artisanData.user.phone}`: "Artisan Phone"}</p>
                <div className='kka-btns'>
                  <button><ChatIcon /></button>
                  <a href={`${artisanData.user?.phone ? artisanData.user.phone : "09012120987"}`} > <CallIcon />Call {artisanData.user?.first_name && artisanData.user?.last_name? `${artisanData.user.first_name} ${artisanData.user.last_name}`: "Artisan Name"}</a>
                </div>
              </div>
            </div>
            )}


{/* {activeSection === "review" && (
        <div id="review-MM-sec" className='review-kka'>
          <div className='review-kka-box'>
          <h2>Drop a review for ❤️  Prince</h2>

          <div className='review-kka-input'>
            <label>Rate Prince</label>
            <select>
            <option>Choose a star</option>
              <option>1 Star</option>
              <option>2 Stars</option>
              <option>3 Stars</option>
              <option>4 Stars</option>
              <option>5 Stars</option>
            </select>
            </div>
            <div className='review-kka-input'>
              <label>Drop a review</label>
            <textarea placeholder='Type your review...'></textarea>
          </div>
          <div className='review-kka-input'>
           <button>Send</button>
          </div>
        </div>
        </div>
      )} */}




          </div>
        </div>
      </div>
    </div>




    </div>
  );
};

export default ArtisanChattingPage;
