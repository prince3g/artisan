import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Css/Main.css';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, { useState } from 'react';

const PostCode = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [postCode, setPostCode] = useState(''); // State to store the entered post code

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    if (postCode.trim()) {
      // Navigate to the search-results page with the post code as a query parameter
      navigate(`/search-results?postCode=${encodeURIComponent(postCode)}`);
    } else {
      alert('Please enter a valid post code'); // Show an alert if the input is empty
    }
  };

  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon /> <Link to="/post-code"> Post Code</Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Enter Post Code</h2>
              <p>Enter your post code to enable you to find Artisans around you!</p>
            </div>
            <div className="Gradnded-Box-Body">
              <form onSubmit={handleSubmit}>
                <div className="Gland-Quest-data">
                  <input
                    type="text"
                    placeholder="Type post code"
                    value={postCode} // Bind the input value to the state
                    onChange={(e) => setPostCode(e.target.value)} // Update state on input change
                  />
                </div>

                <div className="Gland-Cnt-Btn">
                  <button type="button" className="back-btn" onClick={() => navigate(-1)}>
                    Back
                  </button>
                  <button type="submit" className="post-job-btn">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCode;
