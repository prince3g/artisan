import React, { useState, useEffect, useRef } from 'react';
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
import { toast } from 'react-toastify'; // For push notifications
import ChatInput from './ChatInput';
import ChatBanner from './Img/nochat-banner.svg';
import { Link } from 'react-router-dom';

const ArtisanChattingPage = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const service = decodeURIComponent(searchParams.get('service') || '');
  const artisan_name = decodeURIComponent(searchParams.get('artisan_name') || '');
  const service_details = decodeURIComponent(searchParams.get('service_details') || '');
  const artisan_location = decodeURIComponent(searchParams.get('artisan_location') || '');
  const artisanUniqueID = decodeURIComponent(searchParams.get('artisanUniqueID') || '');
  const artisan_phone = decodeURIComponent(searchParams.get('artisan_phone') || '');

  const [artisanData, setArtisanData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  const [welcomeMessageTime, setWelcomeMessageTime] = useState('');
  const [activeSection, setActiveSection] = useState('chat');
  const [isToggled, setIsToggled] = useState(false);
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  

  const senderID = sessionStorage.getItem('unique_user_id');
  const senderIDEmail= sessionStorage.getItem('user_email');

  const lastMessageRef = useRef(null);
    // Create a ref for the chat container
  const chatContainerRef = useRef(null);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        
        `${djangoHostname}/api/messaging/auth/messages/conversation/?sender=${senderID}&receiver=${artisanUniqueID}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        // console.log("data");
        // console.log(data);
        // console.log("data");
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [artisanUniqueID, senderID]);

  
  const handleNewMessage = (newMessage) => {
    const currentTime = new Date();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...newMessage,
        isSent: true,
        isDelivered: false,
        timestamp: "just now", // Set initial timestamp to "just now"
        created_at: currentTime.toISOString(), // Save the actual timestamp
      },
    ]);
  
    // Show typing indicator and welcome message
    if (!hasSentFirstMessage) {
      setHasSentFirstMessage(true);
      setShowTyping(true);
      setWelcomeMessageTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setTimeout(() => {
        setShowTyping(false);
        setShowWelcomeMessage(true);
      }, 3000);
    }
  };
  

  const markMessagesAsRead = async () => {
    const unreadMessages = messages.filter(msg => !msg.is_read && msg.receiver === senderID);
    const messageIds = unreadMessages.map(msg => msg.id);
  
    if (messageIds.length === 0) return;
  
    try {
      const response = await fetch(`${djangoHostname}/api/messaging/auth/messages/mark_as_read/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          message_ids: messageIds,
          receiver_id: senderID,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // Optionally, update the local state to reflect that messages have been read
        setMessages(prevMessages => prevMessages.map(msg => 
          messageIds.includes(msg.id) ? { ...msg, is_read: true } : msg
        ));
      } else {
        console.error('Failed to mark messages as read');
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };
  
  useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead();
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead();
    }
  }, [messages]);

  // Handle new chat
  const handleNewChat = () => {
    setMessages([]);
    setShowTyping(false);
    setShowWelcomeMessage(false);
    setHasSentFirstMessage(false);
  };

  // Handle section click (chat, call, etc.)
  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsToggled(true);
  };

  // Handle close click
  const handleCloseClick = () => {
    setActiveSection(null);
    setIsToggled(false);
  };

  // Fetch artisan details
  useEffect(() => {
    const sanitizedId = artisanUniqueID?.trim();
    const fetchArtisanDetail = async () => {
      if (!sanitizedId) {
        console.error('Artisan Unique ID is missing');
        return;
      }
      try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/artisan-profile/?unique_id=${sanitizedId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setArtisanData(data);
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      }
    };

    fetchArtisanDetail();
  }, [artisanUniqueID, djangoHostname]);

  const handleToggleView = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTimestamp = (createdAt) => {
    const now = new Date();
    const messageDate = new Date(createdAt);
  
    if (createdAt === "just now") {
      return "just now"; // If it's just now, return that
    }
  
    const timeDifference = now - messageDate; // Time difference in milliseconds
    const isMoreThan24Hours = timeDifference > 24 * 60 * 60 * 1000;
  
    // Format the timestamp
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
  
    if (isMoreThan24Hours) {
      return messageDate.toLocaleString('default', options);
    } else {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  useEffect(() => {
    // Scroll to the bottom whenever messages are updated
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency on messages to scroll when they change
  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Scroll when messages change
  


  return (
    <div className={`artii-profile-page ${isToggled ? 'toggle-mobile-messi' : ''}`}>
      <div className="navigating-ttarvs">
        <div className="large-container">
          <p>
            <Link to="/">Simservicehub</Link>
            <ChevronRightIcon /> {service_details}
            <ChevronRightIcon /> {artisanData.service_details?.name && artisanData.service_details?.name
              ? `${artisanData.service_details.name}`
              : 'Artisan Name'}
            <ChevronRightIcon /> {artisan_name}
            <ChevronRightIcon /> <Link to="/artisan-profile">Artisan Profile</Link>
            <ChevronRightIcon /> <Link to="/chat-with-artisan">Chat with {artisanData.user?.first_name && artisanData.user?.last_name
              ? `${artisanData.user.first_name} ${artisanData.user.last_name}`
              : 'Artisan Name'}</Link>
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
                    <button onClick={() => handleSectionClick('chat')}>
                      <ChatIcon /> <span className="toolTipsa">Chat</span>
                    </button>
                    <button onClick={() => handleSectionClick('call')}>
                      <CallIcon /> <span className="toolTipsa">Call   </span>
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
                    <h6>{artisanData.user?.first_name && artisanData.user?.last_name
                      ? `${artisanData.user.first_name} ${artisanData.user.last_name}`
                      : ' '}{' '}
                      &nbsp; Profile</h6>
                    <p>
                      <span>
                        <Handyman /> {artisanData.service_details?.name && artisanData.service_details?.name
                          ? `${artisanData.service_details.name}`
                          : 'Artisan Skills'}
                      </span>
                      <span>
                        <MyLocation /> {artisanData.location ? `${artisanData.location}` : 'Address'}
                      </span>
                    </p>
                    <h4>
                      <DateRangeIcon /> Member Since {artisanData?.user?.date_joined
                        ? new Date(artisanData.user.date_joined).toLocaleString('default', { year: 'numeric', month: 'long' })
                        : 'Date Unavailable'}
                    </h4>
                  </div>
                </div>

                <div className="ooais-sec">
                  <div className="ooais-Part">
                    <h4>About</h4>
                    <p className={`about-text ${isExpanded ? 'expanded' : ''}`}>
                      {artisanData.user?.about_artisan && artisanData.user?.about_artisan
                        ? `${artisanData.user.about_artisan}`
                        : 'Artisan Name'}
                    </p>
                    <span className="viewMoreOrLess" onClick={handleToggleView}>
                      {isExpanded ? 'View less' : 'View more'}
                    </span>
                  </div>
                  <div className="ooais-Part">
                    <h4>Skills</h4>
                    <ul>
                      {artisanData.skills
                        ? artisanData.skills.map((skill, index) => (
                            <li key={index}>
                              <CheckCircleIcon />
                              {skill.trim()}
                            </li>
                          ))
                        : <li>No skills available</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="Chattt-sec">
              <div className="Chattt-Topp">
                <div className="Chattt-Topp-1">
                  <h3>Chat with   {artisanData.user?.first_name && artisanData.user?.last_name
                    ? `${artisanData.user.first_name} ${artisanData.user.last_name}`
                    : ' '}{' '}
                    &nbsp;</h3>
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

              <div className="Chattt-Mid" ref={chatContainerRef}>
                <div className="Chatting-section">
                  <div className="Chatting-section-Main">

                    {messages.length === 0 && (
                      <p className="no-messages">
                        <img src={ChatBanner} alt="No Chat Banner" />
                        <span>No messages yet. Start a conversation!</span>
                      </p>
                    )}
                    {messages.map((msg, index) => {
                      const isOutgoing = msg.sender === senderIDEmail; // Check if the message was sent by the current user
                      
                      return (
                        <div
                          key={index}
                          className={`Chatting-Clamp ${isOutgoing ? 'sent' : 'received'}`}
                          ref={index === messages.length - 1 ? lastMessageRef : null}
                        >
                          <div className={`Mnachatting-box ${isOutgoing ? 'sent' : 'received'}`}>
                            <p>{msg.content}</p>
                            <span>{formatTimestamp(msg.created_at)}</span>
                            {/* <p>{msg.sender}</p>
                            <p>{isOutgoing ? "Outgoing" : "Incoming"}</p> */}
                          </div>
                        </div>
                      );
                    })}


                    {showTyping && (
                      <div className="Chatting-Clamp">
                        <div className="Mnachatting-box typing">
                          <p>Typing...</p>
                        </div>
                      </div>
                    )}
                  
                  
                  </div>
                </div>
              </div>

              <div className="Chattt-Foot"> 
                <ChatInput onNewMessage={handleNewMessage} receiverId={artisanUniqueID} senderId={senderID} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanChattingPage;