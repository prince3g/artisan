import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../axios_instance/'; // Path to your Axios instance
import { toast } from 'react-toastify'; // For push notifications

const ChatInput = ({ onNewMessage, messageId, receiverId, senderId }) => {

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const textAreaRef = useRef(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Typing indicator state

  const emojiPickerRef = useRef(null);
  const chatInputRef = useRef(null);

  const message_sender = localStorage.getItem('unique_user_id');

  // Adjust textarea height dynamically
  const adjustTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const resetTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto';
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
        setLoading(true);
        const endpoint = `/api/messaging/auth/messages/send_message/`;

        let token = localStorage.getItem('access_token');
        //console.log("🔹 Sending token:", token);  // Log token before sending

        if (!token) {
            toast.error("You are not authenticated. Please log in again.");
            setLoading(false);
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        //console.log("🔹 Headers:", headers);

        try {
            const response = await api.post(endpoint, {
                receiver: receiverId,
                sender: senderId,
                content: message,
            }, { headers });

            //console.log("🔹 Response status:", response.status);
            
            if (response.status === 201) {
                onNewMessage(response.data);
                setMessage('');
                toast.success('Message sent!');

                window.location.reload()
            }
        } catch (error) {
            console.error("🔻 Error sending message:", error);
            if (error.response?.status === 401) {
                toast.error("Unauthorized! Your session may have expired.");
            } else {
                toast.error(error.response?.data?.error || 'An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    }
};



  // Handle typing indicator
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    adjustTextAreaHeight();

    if (!isTyping) {
      setIsTyping(true);
      api.post(`/api/messaging/auth/messages/typing_indicator/`, {
        receiver_id: receiverId,
        is_typing: true,
      });
    }
  };

  // Reset typing indicator after 2 seconds of inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false);
        api.post(`/api/messaging/auth/messages/typing_indicator/`, {
          receiver_id: receiverId,
          is_typing: false,
        });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isTyping, receiverId]);

  // Handle keydown events (e.g., pressing Enter to send)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setImage(null);
  };

  // Close emoji picker when clicking outside
  const handleClickOutside = (e) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(e.target) &&
      chatInputRef.current &&
      !chatInputRef.current.contains(e.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="chat-input-container" ref={chatInputRef}>
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          ref={textAreaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows="1"
        />
        {showEmojiPicker && (
          <div className="emoji-picker" ref={emojiPickerRef}>
            <button onClick={() => setMessage(message + '😊')}>😊</button>
            <button onClick={() => setMessage(message + '😂')}>😂</button>
            <button onClick={() => setMessage(message + '❤️')}>❤️</button>
            <button onClick={() => setMessage(message + '😎')}>😎</button>
            <button onClick={() => setMessage(message + '🥺')}>🥺</button>
            <button onClick={() => setMessage(message + '✨')}>✨</button>
            <button onClick={() => setMessage(message + '🔥')}>🔥</button>
            <button onClick={() => setMessage(message + '💯')}>💯</button>
            <button onClick={() => setMessage(message + '🙏')}>🙏</button>
            <button onClick={() => setMessage(message + '👍')}>👍</button>
            <button onClick={() => setMessage(message + '👀')}>👀</button>
            <button onClick={() => setMessage(message + '💀')}>💀</button>
            <button onClick={() => setMessage(message + '🤔')}>🤔</button>
            <button onClick={() => setMessage(message + '🎉')}>🎉</button>
            <button onClick={() => setMessage(message + '💥')}>💥</button>
            <button onClick={() => setMessage(message + '🥳')}>🥳</button>
            <button onClick={() => setMessage(message + '🤗')}>🤗</button>
            <button onClick={() => setMessage(message + '💔')}>💔</button>
            <button onClick={() => setMessage(message + '👑')}>👑</button>
            <button onClick={() => setMessage(message + '🎶')}>🎶</button>
            <button onClick={() => setMessage(message + '🍕')}>🍕</button>
            <button onClick={() => setMessage(message + '🍔')}>🍔</button>
            <button onClick={() => setMessage(message + '🍻')}>🍻</button>
            <button onClick={() => setMessage(message + '🌍')}>🌍</button>
            <button onClick={() => setMessage(message + '📱')}>📱</button>
            <button onClick={() => setMessage(message + '🏆')}>🏆</button>
            <button onClick={() => setMessage(message + '🥇')}>🥇</button>
            <button onClick={() => setMessage(message + '🏀')}>🏀</button>
            <button onClick={() => setMessage(message + '💃')}>💃</button>
            <button onClick={() => setMessage(message + '🕺')}>🕺</button>
            <button onClick={() => setMessage(message + '👨‍💻')}>👨‍💻</button>
            <button onClick={() => setMessage(message + '👩‍💻')}>👩‍💻</button>
          </div>
        )}
        
        {image && (
          <div className="image-preview-container">
            <img src={image} alt="uploaded" className="image-preview" />
            <span onClick={handleRemoveImage} className="close-image-btn">
              <CloseIcon />
            </span>
          </div>
        )}
        <div className="chat-buttons">
          <IconButton onClick={handleSendMessage} disabled={loading}>
            {loading ? <CircularProgress size={30} /> : <SendIcon />}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;