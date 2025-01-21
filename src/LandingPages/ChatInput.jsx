import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { IconButton, CircularProgress } from '@mui/material'; // Import CircularProgress for loader
import CloseIcon from '@mui/icons-material/Close';
import api from '../axios_instance/'; // Path to your Axios instance

const ChatInput = ({ onNewMessage, messageId, receiverId, senderId }) => {
  const textAreaRef = useRef(null);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader

  const message_sender = localStorage.getItem('unique_user_id');

  const adjustTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const emojiPickerRef = useRef(null);
  const chatInputRef = useRef(null);

  const resetTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto';
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      setLoading(true); // Show loader
      const endpoint = messageId 
        ? `/api/messaging/auth/api/${messageId}/1/reply/` 
        : `/api/messaging/auth/api/messages/send_message/`;

      const payload = messageId 
        ? { content: message }
        : { receiver: receiverId, sender: senderId, content: message };

      try {
        const response = await api.post(endpoint, payload);

        if (response.status === 201) {
          onNewMessage(message);

          setMessage('');
          
          resetTextAreaHeight();
        }
      } catch (error) {
        console.error('Error sending message:', error);
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized. Redirecting to login.');
          window.location.href = '/login';
        }
      } finally {
        setLoading(false); // Hide loader
      }
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    adjustTextAreaHeight();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

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
