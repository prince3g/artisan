// import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
// import './Css/Main.css';
// import { Link } from 'react-router-dom';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import React, { useState } from 'react';

// const PostCode = () => {
//   const navigate = useNavigate(); // Initialize the useNavigate hook
//   const [postCode, setPostCode] = useState(''); // State to store the entered post code

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent form submission default behavior
//     if (postCode.trim()) {
//       // Navigate to the search-results page with the post code as a query parameter
//       navigate(`/search-results?postCode=${encodeURIComponent(postCode)}`);
//     } else {
//       alert('Please enter a valid post code'); // Show an alert if the input is empty
//     }
//   };

//   return (
//     <div className="Gradnded-page">
//       <div className="navigating-ttarvs">
//         <div className="site-container">
//           <p>
//             <Link to="/">Simservicehub</Link> <ChevronRightIcon /> <Link to="/post-code"> Post Code</Link>
//           </p>
//         </div>
//       </div>

//       <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Enter Post Code</h2>
//               <p>Enter your post code to enable you to find Artisans around you!</p>
//             </div>
//             <div className="Gradnded-Box-Body">
//               <form onSubmit={handleSubmit}>
//                 <div className="Gland-Quest-data">
//                   <input
//                     type="text"
//                     placeholder="Type post code"
//                     value={postCode} // Bind the input value to the state
//                     onChange={(e) => setPostCode(e.target.value)} // Update state on input change
//                   />
//                 </div>

//                 <div className="Gland-Cnt-Btn">
//                   <button type="button" className="back-btn" onClick={() => navigate(-1)}>
//                     Back
//                   </button>
//                   <button type="submit" className="post-job-btn">
//                     Search
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostCode;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import './Css/Main.css';

const libraries = ['places'];
const googleMapsApiKey = "AIzaSyAfZvmALAKh0VbVH5naOOwS9IMeDPfQ4Uw"; // Replace with your Google API Key

const PostCode = () => {
  const navigate = useNavigate();
  const [postCode, setPostCode] = useState('');
  const [searchBox, setSearchBox] = useState(null);

  const onLoad = (ref) => setSearchBox(ref);

  const onPlacesChanged = () => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places.length > 0) {
        setPostCode(places[0].formatted_address); // Use the formatted address as the postcode
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postCode.trim()) {
      navigate(`/search-results?postCode=${encodeURIComponent(postCode)}`);
    } else {
      alert('Please enter a valid post code');
    }
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
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
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                      <input
                        type="text"
                        placeholder="Type post code"
                        value={postCode}
                        onChange={(e) => setPostCode(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          borderRadius: '5px',
                          border: '1px solid #ccc'
                        }}
                      />
                    </StandaloneSearchBox>
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
    </LoadScript>
  );
};

export default PostCode;
