import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const artisan_phone = decodeURIComponent(searchParams.get('artisan_phone') || '');
  
    const artisanUniqueID = localStorage.getItem('unique_user_id');
  
    const [artisanData, setArtisanData] = useState([]);
    const [messages, setMessages] = useState([]); // To store messages
    const [showTyping, setShowTyping] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
    const [welcomeMessageTime, setWelcomeMessageTime] = useState('');
    const [activeSection, setActiveSection] = useState('chat');
    const [isToggled, setIsToggled] = useState(false);



    const fetchMessages = async () => {
      const sender = artisanUniqueID;
      const receiver = artisanUniqueID; // Ensure this value is valid
  
      if (!receiver) {
          console.error('Receiver is missing');
          return;
      }
  
      try {
          const response = await fetch(`${djangoHostname}/api/messages/conversation/?sender=${sender}&receiver=${receiver}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
  
          if (response.ok) {
              const data = await response.json();
              setMessages(data);  // Set the fetched messages to state
          } else {
              console.error('Failed to fetch messages');
          }
      } catch (error) {
          console.error('Error fetching messages:', error);
      }
  };

  
    useEffect(() => {
        if (artisanUniqueID) {
            fetchMessages();
        }
    }, [djangoHostname, artisanUniqueID]);  // Add artisanUniqueID as a dependency to refetch if it changes

    const handleNewMessage = (message, image) => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages([...messages, { message, image, timestamp, isSent: true, isDelivered: false }]);
    };

    const handleNewChat = () => {
        setMessages([]); // Clear all messages
        setShowTyping(false); // Hide "Typing..." message
        setShowWelcomeMessage(false); // Hide the welcome message
        setHasSentFirstMessage(false); // Reset the first message flag
    };

    // Artisan profile fetching function
    useEffect(() => {
        const fetchArtisanDetail = async () => {
            if (!artisanUniqueID) {
                console.error('Artisan Unique ID is missing');
                return;
            }
            try {
                const response = await fetch(`${djangoHostname}/api/profiles/auth/artisan-profile/${artisanUniqueID}/`, {
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
                setArtisanData(data);
            } catch (error) {
                console.error('Error fetching artisan data:', error);
            }
        };

        fetchArtisanDetail();
    }, [artisanUniqueID, djangoHostname]);

    return (
        <div className="Chattt-sec">
            {activeSection === 'chat' && (
                <div className="Chattt-Topp">
                    <div className="Chattt-Topp-1">
                        <h3>Chat Client chat</h3>
                    </div>
                    <div className="Chattt-Topp-2">
                        <span>
                            Online Client chat<i className="online"></i>
                        </span>
                        <span>
                            <div>Chats Client chat</div> <b>{messages.length}</b>
                        </span>
                        <button onClick={handleNewChat}>
                            <ChatIcon /> <div>New chat</div>
                        </button>
                    </div>
                </div>
            )}
            {activeSection === 'chat' && (
                <div className="Chattt-Mid">
                    <div className="Chatting-section">
                        <div className="Chatting-section-Main">
                            {messages.length === 0 && (
                                <p className="no-messages hahggs-TIa">
                                    <span>No messages yet. Start a conversation!</span>
                                </p>
                            )}

                            {messages.length > 0 && (
                                <div className="Chatting-Clamp respond-Box">
                                    <div
                                        className={`Mnachatting-box ${messages[0].isSent ? 'sent' : 'received'}`}
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

                            {showWelcomeMessage && (
                                <div className="Chatting-Clamp">
                                    <div className="Mnachatting-box">
                                        <p>
                                            Thank you for reaching out! ❤️ Whether you have a project in mind or just
                                            want to discuss your ideas, I'm here to bring your vision to life. 💡
                                        </p>
                                        <div className="Mess-hsja">
                                            <span>{welcomeMessageTime}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showTyping && (
                                <div className="Chatting-Clamp">
                                    <div className="Mnachatting-box typing">
                                        <p>Typing...</p>
                                    </div>
                                </div>
                            )}

                            {messages.slice(1).map((msg, index) => (
                                <div key={index} className="Chatting-Clamp respond-Box">
                                    <div className={`Mnachatting-box ${msg.isSent ? 'sent' : 'received'}`}>
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
        </div>
    );
};

export default ChatWithClient;
