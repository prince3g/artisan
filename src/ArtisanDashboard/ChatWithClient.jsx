import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';


import CallIcon from '@mui/icons-material/Call';

import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';


import ChatInput from './ChatInput';


const ChatWithClient = () => {

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
    <div className="Chattt-sec">

        
    {activeSection === "chat" && (
      <div className="Chattt-Topp">
        <div className="Chattt-Topp-1">
          <h3>Chat</h3>
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
          <p className="no-messages hahggs-TIa">
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




  </div>
  );
};

export default ChatWithClient;
