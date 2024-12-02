import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChatInput = ({ onNewMessage }) => {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Refs for detecting clicks outside
  const textAreaRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const chatInputRef = useRef(null);

  const adjustTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const resetTextAreaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto'; // Reset to the initial height
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    adjustTextAreaHeight();
  };

  const handleSendMessage = () => {
    if (message.trim() || image) {
      // Pass message and image back to the parent component
      onNewMessage(message, image);
      setMessage('');
      setImage(null);
      resetTextAreaHeight(); // Reset the textarea height
      setShowEmojiPicker(false); // Hide emoji picker
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior
      handleSendMessage(); // Send the message
      setShowEmojiPicker(false); // Hide emoji picker
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Reset the image state, hiding the container
  };

  // Hide emoji picker when clicking outside
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
    // Add event listener for click outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
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
          onKeyDown={handleKeyDown} // Handle Enter and Shift+Enter
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

        {/* Conditionally render image preview */}
        {image && (
          <div className="image-preview-container">
            <img src={image} alt="uploaded" className="image-preview" />
            <span onClick={handleRemoveImage} className="close-image-btn">
              <CloseIcon />
            </span>
          </div>
        )}

        <div className="chat-buttons">
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <EmojiEmotionsIcon />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="image-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            <IconButton component="span">
              <InsertPhotoIcon />
            </IconButton>
          </label>
          <IconButton onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
