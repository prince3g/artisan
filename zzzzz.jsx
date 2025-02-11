// For the react part I have two components already please modify them to integrate all your inplementations
// The ChatInput is for typing and sending messages while the ArtisanChattingPage  is for displaying the messages


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Css/ArtisanProfile.css';
// import UserImg from './Img/user-img.jpg';
// import Star from '@mui/icons-material/Star';
// import Handyman from '@mui/icons-material/Handyman';
// import MyLocation from '@mui/icons-material/MyLocation';
// import Favorite from '@mui/icons-material/Favorite';
// import Share from '@mui/icons-material/Share';
// import ChatIcon from '@mui/icons-material/Chat';
// import CallIcon from '@mui/icons-material/Call';
// import DateRangeIcon from '@mui/icons-material/DateRange';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import ChatInput from './ChatInput';
// import ChatBanner from './Img/nochat-banner.svg';
// import Comments from './Comments';

// import { Link } from "react-router-dom";

// const ArtisanChattingPage = () => {
//   const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//   const location = useLocation();
//   const navigate = useNavigate();
//   const searchParams = new URLSearchParams(location.search);

//   const service = decodeURIComponent(searchParams.get('service') || '');
//   const artisan_name = decodeURIComponent(searchParams.get('artisan_name') || '');
//   const service_details = decodeURIComponent(searchParams.get('service_details') || '');
//   const artisan_location = decodeURIComponent(searchParams.get('artisan_location') || '');
//   const artisanUniqueID = decodeURIComponent(searchParams.get('artisanUniqueID') || '');
//   const artisan_phone = decodeURIComponent(searchParams.get('artisan_phone') || '');

//   const [artisanData, setArtisanData] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [showTyping, setShowTyping] = useState(false);
//   const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
//   const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
//   const [welcomeMessageTime, setWelcomeMessageTime] = useState('');
//   const [activeSection, setActiveSection] = useState("chat");
//   const [isToggled, setIsToggled] = useState(false);
//   const [rating, setRating] = useState("");
//   const [review, setReview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const senderID = localStorage.getItem('unique_user_id');

//   const fetchMessages = async () => {
//     try {
//       const authToken = 'your-auth-token-here'; // Replace with your actual token
//       const response = await fetch(`${djangoHostname}/api/messaging/auth/api/messages/conversation/?sender=${senderID}&receiver=${artisanUniqueID}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include the auth token in the header
//         },
//         credentials: 'include',
//       });
  
//       if (response.ok) {
//         const data = await response.json();

//         console.log("data")
//         console.log(data)
//         console.log("data")
      
//         setMessages(data);
//       } else {
//         console.error('Failed to fetch messages');
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };
  
//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const handleReviewSubmit = async () => {
//     if (!rating || !review.trim()) {
//       setMessage("Please provide a rating and a review.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const sanitizedId = artisanUniqueID.trim();
//       const response = await fetch(`${djangoHostname}/api/artisanReview/auth/api/artisan-reviews/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           artisan: sanitizedId,
//           reviewer_name: "5e2fa660-58a2-4b5d-8e59-70f3a1b704e2",
//           artisan_name,
//           rating,
//           review_text: review,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Review submitted successfully!");
//         setRating("");
//         setReview("");
//       } else {
//         setMessage(`Error: ${data.message || "Failed to submit review."}`);
//       }
//     } catch (error) {
//       setMessage("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleView = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleNewMessage = (message, image) => {
//     const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     setMessages([...messages, { message, image, timestamp, isSent: true, isDelivered: false }]);
//   };

//   const handleNewChat = () => {
//     setMessages([]);
//     setShowTyping(false);
//     setShowWelcomeMessage(false);
//     setHasSentFirstMessage(false);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setMessages((prevMessages) =>
//         prevMessages.map((msg) =>
//           msg.isSent && !msg.isDelivered ? { ...msg, isDelivered: true } : msg
//         )
//       );

//       if (!hasSentFirstMessage && messages.length > 0 && messages[0].isDelivered) {
//         setHasSentFirstMessage(true);
//         setShowTyping(true);
//         setWelcomeMessageTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//         setTimeout(() => {
//           setShowTyping(false);
//           setShowWelcomeMessage(true);
//         }, 3000);
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [messages, hasSentFirstMessage]);

//   const handleSectionClick = (section) => {
//     setActiveSection(section);
//     setIsToggled(true);
//   };

//   const handleCloseClick = () => {
//     setActiveSection(null);
//     setIsToggled(false);
//   };

//   useEffect(() => {
//     const sanitizedId = artisanUniqueID?.trim();
//     const fetchArtisanDetail = async () => {
//       if (!sanitizedId) {
//         console.error('Artisan Unique ID is missing');
//         return;
//       }
//       try {
//         const response = await fetch(`${djangoHostname}/api/profiles/auth/artisan-profile/${sanitizedId}/`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setArtisanData(data);
//       } catch (error) {
//         console.error('Error fetching artisan data:', error);
//       }
//     };

//     fetchArtisanDetail();
//   }, [artisanUniqueID, djangoHostname]);


//   return (
//     <div className={`artii-profile-page ${isToggled ? "toggle-mobile-messi" : ""}`}>
//       <div className="navigating-ttarvs">
//         <div className="large-container">
//         <p>
//           <Link to="/">
//             Simservicehub
//           </Link>
//           <ChevronRightIcon /> {service_details}
//           <ChevronRightIcon /> {artisanData.service_details?.name && artisanData.service_details?.name? `${artisanData.service_details.name}`: "Artisan Name"}
//           <ChevronRightIcon /> {artisan_name}

//             <ChevronRightIcon /> <Link to="/artisan-profile">Artisan Profile</Link>
//             <ChevronRightIcon /> <Link to="/chat-with-artisan">Chat with {artisanData.user?.first_name && artisanData.user?.last_name
//                           ? `${artisanData.user.first_name} ${artisanData.user.last_name}`: "Artisan Name"}</Link>
//         </p>

//         </div>
//       </div>

//       <div className="Prof-Sec">
//         <div className="large-container">
//           <div className="Prof-Main">
//             <div className="Prof-Left">
//               <div className="Prof-Left-main">
//                 <div className="prof-top">
        

//                   <div className="ggaa-navsi">
//                   <button onClick={() => handleSectionClick("chat")}>
//                     <ChatIcon /> <span className="toolTipsa">Chat</span>
//                   </button>
//                   <button onClick={() => handleSectionClick("call")}>
//                     <CallIcon /> <span className="toolTipsa">Call</span>
//                   </button>

//                   <button>
//                       <Favorite /> <span className="toolTipsa">Favourite</span>
//                     </button>

                  

//                 </div>


//                   <div className="Uuua-sec">
//                     <div className="Uuua-1">
//                       <img src={UserImg} alt="User" />
//                     </div>
//                     <div className="Uuua-2">
//                       <div>
//                         <h3>{artisan_name}</h3>
//                         <h6>
//                           <span>
//                             <Star />
//                             <Star />
//                             <Star />
//                             <Star />
//                             <Star />
//                           </span>{' '}
//                           <span>Reviews (150)</span>
//                         </h6>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="aius">
//                     <h6>{artisanData.user?.first_name && artisanData.user?.last_name? `${artisanData.user.first_name} ${artisanData.user.last_name}`: " "} &nbsp; Profile</h6>
//                     <p>
//                       <span>
//                         <Handyman /> {artisanData.service_details?.name && artisanData.service_details?.name?`${artisanData.service_details.name}`: "Artisan Skills"} 
//                       </span>
//                       <span>
//                         <MyLocation /> {artisanData.location? `${artisanData.location}`: "Address"}
//                       </span>
//                     </p>
//                     <h4>
//                       <DateRangeIcon /> Member Since {artisanData?.user?.date_joined? new Date(artisanData.user.date_joined).toLocaleString('default', { year: 'numeric', month: 'long' })
//                         : 'Date Unavailable'}
//                     </h4>
//                   </div>
//                 </div>

//                 <div className="ooais-sec">
//                   <div className="ooais-Part">
//                     <h4>About</h4>
//                     <p className={`about-text ${isExpanded ? 'expanded' : ''}`}>
//                       {/* We create outfits that befit your personality..., think classy,
//                       think Impression stitches. Our mission is to redefine fashion by
//                       creating timeless designs and ensuring quality in every stitch.
//                       Experience unparalleled craftsmanship with our bespoke tailoring
//                       service, where every detail is tailored to perfection. */}
//                       {artisanData.user?.about_artisan && artisanData.user?.about_artisan? `${artisanData.user.about_artisan}`: "Artisan Name"}
//                     </p>
//                     <span className="viewMoreOrLess" onClick={handleToggleView}>
//                       {isExpanded ? 'View less' : 'View more'}
//                     </span>
//                   </div>
//                   <div className="ooais-Part">
//                     <h4>Skills</h4>
//                     <ul>
//                     {artisanData.skills ? (
//                       artisanData.skills.map((skill, index) => (
//                         <li key={index}>
//                           <CheckCircleIcon />
//                           {skill.trim()}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No skills available</li>
//                     )}
//                     </ul>
//                   </div>

//                 </div>
//               </div>
//             </div>

//             <div className="Chattt-sec">
//             <div className="Chattt-Topp">
//               <div className="Chattt-Topp-1">
//                 <h3>Chat with {artisanData.user?.first_name && artisanData.user?.last_name ? `${artisanData.user.first_name} ${artisanData.user.last_name}` : " "} &nbsp;</h3>
//               </div>
//               <div className="Chattt-Topp-2">
//                 <span>
//                   Online<i className="online"></i>
//                 </span>
//                 <span>
//                   <div>Chats</div> <b>{messages.length}</b>
//                 </span>
//                 <button onClick={handleNewChat}>
//                   <ChatIcon /> <div>New chat</div>
//                 </button>
//               </div>
//             </div>

//             <div className="Chattt-Mid">
//               <div className='Chatting-section'>
//                 <div className='Chatting-section-Main'>
//                 {messages.length === 0 && (
//             <p className="no-messages">
//               <img src={ChatBanner} alt="No Chat Banner" />
//               <span>No messages yet. Start a conversation!</span>
//             </p>
//           )}

//           {messages.slice(1).map((msg, index) => (
//             <div key={index} className="Chatting-Clamp respond-Box">
//               <div className={`Mnachatting-box ${msg.isSent ? 'sent' : 'received'}`}>
//                 <p>{msg.content}</p> {/* Use msg.content here */}
//                 {msg.image && (
//                   <img src={msg.image} alt="uploaded" className="Main-image-preview" />
//                 )}
//                 <div className="Mess-hsja">
//                   <span>{msg.timestamp || 'Just now'}</span>
//                   {msg.isSent && !msg.isDelivered ? (
//                     <span className="message-status single-check">✔</span>
//                   ) : (
//                     <span className="message-status double-check">✔✔</span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}


//         {messages.slice(1).map((msg, index) => (
//           <div key={index} className="Chatting-Clamp respond-Box">
//             <div className={`Mnachatting-box ${msg.isSent ? 'sent' : 'received'}`}>
//               <p>{msg.content}</p> {/* Corrected to msg.content */}
//               {msg.image && (
//                 <img src={msg.image} alt="uploaded" className="Main-image-preview" />
//               )}
//               <div className="Mess-hsja">
//                 <span>{msg.timestamp || 'Just now'}</span>
//                 {msg.isSent && !msg.isDelivered ? (
//                   <span className="message-status single-check">✔</span>
//                 ) : (
//                   <span className="message-status double-check">✔✔</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}


//         {showWelcomeMessage && (
//           <div className="Chatting-Clamp">
//             <div className="Mnachatting-box">
//               <p>Thank you for reaching out! ❤️ I'm here to bring your vision to life. 💡</p>
//               <div className="Mess-hsja">
//                 <span>{welcomeMessageTime}</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {showTyping && (
//           <div className="Chatting-Clamp">
//             <div className="Mnachatting-box typing">
//               <p>Typing...</p>
//             </div>
//           </div>
//         )}

//         {messages.slice(1).map((msg, index) => (
//           <div key={index} className="Chatting-Clamp respond-Box">
//             <div className={`Mnachatting-box ${msg.isSent ? 'sent' : 'received'}`}>
//               <p>{msg.message}</p>
//               {msg.image && (
//                 <img src={msg.image} alt="uploaded" className="Main-image-preview" />
//               )}
//               <div className="Mess-hsja">
//                 <span>{msg.timestamp || 'Just now'}</span>
//                 {msg.isSent && !msg.isDelivered ? (
//                   <span className="message-status single-check">✔</span>
//                 ) : (
//                   <span className="message-status double-check">✔✔</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className="Chattt-Foot">
//       <ChatInput onNewMessage={handleNewMessage} receiverId={artisanUniqueID}  senderId={senderID}/>
//     </div>

//   </div>
// </div>

//         </div>
//       </div>
//     </div>




//     </div>
//   );
// };

// export default ArtisanChattingPage;


// import React, { useState, useRef, useEffect } from 'react';
// import SendIcon from '@mui/icons-material/Send';
// import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import { IconButton, CircularProgress } from '@mui/material'; // Import CircularProgress for loader
// import CloseIcon from '@mui/icons-material/Close';
// import api from '../axios_instance/'; // Path to your Axios instance

// const ChatInput = ({ onNewMessage, messageId, receiverId, senderId }) => {
//   const textAreaRef = useRef(null);
//   const [message, setMessage] = useState('');
//   const [image, setImage] = useState(null);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [loading, setLoading] = useState(false); // State for loader

//   const message_sender = localStorage.getItem('unique_user_id');

//   const adjustTextAreaHeight = () => {
//     const textarea = textAreaRef.current;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   };

//   const emojiPickerRef = useRef(null);
//   const chatInputRef = useRef(null);

//   const resetTextAreaHeight = () => {
//     const textarea = textAreaRef.current;
//     textarea.style.height = 'auto';
//   };

//   const handleSendMessage = async () => {
//     if (message.trim()) {
//       setLoading(true); // Show loader
//       const endpoint = messageId 
//         ? `/api/messaging/auth/api/${messageId}/1/reply/` 
//         : `/api/messaging/auth/api/messages/send_message/`;
  
//       const payload = messageId 
//         // ? { content: message }
//         ? { receiver: receiverId, sender: senderId, content: message }
//         : { receiver: receiverId, sender: senderId, content: message };
  
//       try {

//         console.log("payload")
//         console.log(payload)
//         console.log("payload")
        
//         const response = await api.post(endpoint, payload);


  
//         if (response.status === 201) {
//           onNewMessage(message);
//           setMessage('');
//           resetTextAreaHeight();
//         }
//       } catch (error) {
//         console.error('Error sending message:', error);
  
//         if (error.response) {
//           // Check if the error response has a specific message
//           const errorMessage = error.response.data.error || 'An unexpected error occurred';
//           alert(errorMessage); // Display error message to the user
//         } else {
//           alert('Network error. Please try again later.');
//         }
  
//         if (error.response && error.response.status === 401) {
//           console.error('Unauthorized. Redirecting to login.');
//           window.location.href = '/login';
//         }
//       } finally {
//         setLoading(false); // Hide loader
//       }
//     }
//   };
  

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//     adjustTextAreaHeight();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//   };

//   const handleClickOutside = (e) => {
//     if (
//       emojiPickerRef.current &&
//       !emojiPickerRef.current.contains(e.target) &&
//       chatInputRef.current &&
//       !chatInputRef.current.contains(e.target)
//     ) {
//       setShowEmojiPicker(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="chat-input-container" ref={chatInputRef}>
//       <div className="chat-input-wrapper">
//         <textarea
//           className="chat-input"
//           ref={textAreaRef}
//           value={message}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your message..."
//           rows="1"
//         />
//         {showEmojiPicker && (
//           <div className="emoji-picker" ref={emojiPickerRef}>
//             <button onClick={() => setMessage(message + '😊')}>😊</button>
//             <button onClick={() => setMessage(message + '😂')}>😂</button>
//             <button onClick={() => setMessage(message + '❤️')}>❤️</button>
//             <button onClick={() => setMessage(message + '😎')}>😎</button>
//             <button onClick={() => setMessage(message + '🥺')}>🥺</button>
//             <button onClick={() => setMessage(message + '✨')}>✨</button>
//             <button onClick={() => setMessage(message + '🔥')}>🔥</button>
//             <button onClick={() => setMessage(message + '💯')}>💯</button>
//             <button onClick={() => setMessage(message + '🙏')}>🙏</button>
//             <button onClick={() => setMessage(message + '👍')}>👍</button>
//             <button onClick={() => setMessage(message + '👀')}>👀</button>
//             <button onClick={() => setMessage(message + '💀')}>💀</button>
//             <button onClick={() => setMessage(message + '🤔')}>🤔</button>
//             <button onClick={() => setMessage(message + '🎉')}>🎉</button>
//             <button onClick={() => setMessage(message + '💥')}>💥</button>
//             <button onClick={() => setMessage(message + '🥳')}>🥳</button>
//             <button onClick={() => setMessage(message + '🤗')}>🤗</button>
//             <button onClick={() => setMessage(message + '💔')}>💔</button>
//             <button onClick={() => setMessage(message + '👑')}>👑</button>
//             <button onClick={() => setMessage(message + '🎶')}>🎶</button>
//             <button onClick={() => setMessage(message + '🍕')}>🍕</button>
//             <button onClick={() => setMessage(message + '🍔')}>🍔</button>
//             <button onClick={() => setMessage(message + '🍻')}>🍻</button>
//             <button onClick={() => setMessage(message + '🌍')}>🌍</button>
//             <button onClick={() => setMessage(message + '📱')}>📱</button>
//             <button onClick={() => setMessage(message + '🏆')}>🏆</button>
//             <button onClick={() => setMessage(message + '🥇')}>🥇</button>
//             <button onClick={() => setMessage(message + '🏀')}>🏀</button>
//             <button onClick={() => setMessage(message + '💃')}>💃</button>
//             <button onClick={() => setMessage(message + '🕺')}>🕺</button>
//             <button onClick={() => setMessage(message + '👨‍💻')}>👨‍💻</button>
//             <button onClick={() => setMessage(message + '👩‍💻')}>👩‍💻</button>
//           </div>
//         )}
        
//         {image && (
//           <div className="image-preview-container">
//             <img src={image} alt="uploaded" className="image-preview" />
//             <span onClick={handleRemoveImage} className="close-image-btn">
//               <CloseIcon />
//             </span>
//           </div>
//         )}
//         <div className="chat-buttons">
//           <IconButton onClick={handleSendMessage} disabled={loading}>
//             {loading ? <CircularProgress size={30} /> : <SendIcon />}
//           </IconButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInput;