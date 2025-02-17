import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';
import ChatBanner from './Img/nochat-banner.svg';
import ChatInput from './ChatInput';
import './ChatWithClient.css';

const ChatWithClient =  ({ receiverId, receiverEmail, senderId, senderIdEmail }) => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [clients, setClients] = useState([]);
  const [artisanData, setArtisanData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  const [welcomeMessageTime, setWelcomeMessageTime] = useState('');
  const [activeSection, setActiveSection] = useState("chat");
  const [isToggled, setIsToggled] = useState(false);

  const lastMessageRef = useRef(null);
    // Create a ref for the chat container
  const chatContainerRef = useRef(null);

  const handleNewChat = () => {
    setMessages([]);
    setShowTyping(false);
    setShowWelcomeMessage(false);
    setHasSentFirstMessage(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prevMessages =>
        prevMessages.map(msg => (msg.isSent && !msg.isDelivered ? { ...msg, isDelivered: true } : msg))
      );

      if (!hasSentFirstMessage && messages.length > 0 && messages[0].isDelivered) {
        setHasSentFirstMessage(true);
        setShowTyping(true);
        setWelcomeMessageTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setTimeout(() => {
          setShowTyping(false);
          setShowWelcomeMessage(true);
        }, 3000);
      }
    }, 1000);

    return () => clearTimeout(timer);
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
    const fetchArtisanDetail = async () => {
      if (!senderId?.trim()) {
        console.error('Artisan Unique ID is missing');
        return;
      }

      try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/api/artisan-profile/?unique_id=${senderId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setArtisanData(data.results[0]);
      } catch (error) {
        console.error('Error fetching artisan data:', error);
      }
    };

    fetchArtisanDetail();
  }, [senderId, djangoHostname]);


  useEffect(() => {

    const fetchMessages = async () => {
        try {
          const response = await fetch(`${djangoHostname}/api/messaging/auth/messages/conversation/?sender=${senderId}&receiver=${receiverId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
      
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
          const data = await response.json();
          setClients(data.senders || []);
          setMessages(data || []); // Ensure messages is always an array
      
          //console.log("Chat data", data);

        } catch (error) {
          console.error('Error fetching messages:', error);
          setMessages([]); // Set an empty array on error to prevent `undefined`
        }
      };
      

    fetchMessages();
  }, [senderId, receiverId, djangoHostname]);

  useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead();
    }
  }, [messages]);

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
    const unreadMessages = messages.filter(msg => !msg.is_read);
    //const unreadMessages = messages.filter(msg => !msg.is_read && msg.receiver === artisanUniqueId);
    const messageIds = unreadMessages.map(msg => msg.id);
  
    if (messageIds.length === 0) return;
  
    try {
      const response = await fetch(`${djangoHostname}/api/messaging/auth/messages/mark_as_read/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          message_ids: messageIds,
          // receiver_id: senderID,
          // sender_id: senderID,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        //console.log(data.message);
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
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // Ensures message is centered
      });
    }
  }, [messages]);
  
  
  
  return (
    <div className="Chattt-sec">
      {activeSection === "chat" && (
        <div className="Chattt-Topp">
          <div className="Chattt-Topp-1">
            <h3>Chat</h3>
          </div>
          <div className="Chattt-Topp-2">
            <span>Online<i className="online"></i></span>
            <span>Chats <b>{messages.length}</b></span>
            <button onClick={handleNewChat}><ChatIcon /> <div>New chat</div></button>
          </div>
        </div>
      )}

      {activeSection === "chat" && (

       <div className="Chattt-Mid" ref={chatContainerRef}>
        <div className="Chatting-section">
            <div className="Chatting-section-Main">
            {messages.length === 0 && (
                <p className="no-messages">
                <img src={ChatBanner} alt="No Chat Banner" />
                <span>No messages yet. Start a conversation!</span>
                </p>
            )}
            
            {messages.map((msg, index) => (
              
                <div
                key={index}
                
                // className={`Chatting-Clamp respond-Box ${msg.isSent ? 'sent' : 'received'}`}
                className={`Chatting-Clamp ${msg.sender === senderIdEmail ? 'sent' : 'received'}`}
                ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
                >
                <div className="Mnachatting-box">
                    <p>{msg.content}</p>
                    {/* <p>{msg.sender}</p>
                    <p>{msg.receiver}</p> */}
                    {msg.image && (
                    <img src={msg.image} alt="uploaded" className="Main-image-preview" />
                    )}
                    <div className="Mess-hsja">
                    <span>{formatTimestamp(msg.created_at)}</span>
                    {msg.isSent && !msg.isDelivered ? (
                        <span className="message-status single-check">✔</span>
                    ) : (
                        <span className="message-status double-check">✔✔</span>
                    )}
                    </div>
                </div>
                </div>
            ))}


            {/* {showWelcomeMessage && (
                <div className="Chatting-Clamp">
                <div className="Mnachatting-box">
                    <p>Thank you for reaching out! ❤️ I'm here to bring your vision to life. 💡</p>
                    <div className="Mess-hsja">
                    <span>{welcomeMessageTime}</span>
                    </div>
                </div>
                </div>
            )} */}

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
      )}

        <div className="Chattt-Foot">
          {/* <p>Receiver: {artisanUniqueId}</p>
          <p>Sender: {customerUniqueId}</p> */}
            {/* <ChatInput onNewMessage={handleNewMessage} senderId={currentUserId} receiverId={chatPartnerId}  /> */}
            <ChatInput onNewMessage={handleNewMessage} senderId={senderId} receiverId={receiverId}  />
            
        </div>

      {activeSection === "call" && (
        <div className='Call-Sec'>
          <div className='call-Box'>
            <img src={artisanData.user?.image || ''} alt="User" />
            <h3>{artisanData.user?.first_name && artisanData.user?.last_name ? `${artisanData.user.first_name} ${artisanData.user.last_name}` : "Artisan Name"}</h3>
            <p>Phone no: {artisanData.user?.phone || "Artisan Phone"}</p>
            <div className='kka-btns'>
              <button><ChatIcon /></button>
              <a href={`tel:${artisanData.user?.phone || "09012120987"}`}>
                <CallIcon /> Call {artisanData.user?.first_name && artisanData.user?.last_name ? `${artisanData.user.first_name} ${artisanData.user.last_name}` : "Artisan Name"}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWithClient;