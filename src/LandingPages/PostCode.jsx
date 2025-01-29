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



import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Css/Main.css";

// const GOOGLE_MAPS_API_KEY = "AIzaSyAfZvmALAKh0VbVH5naOOwS9IMeDPfQ4Uw"; // Replace with your actual API Key
 const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const loadGoogleMapsScript = (callback) => {
  if (!window.google) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
  } else {
    callback();
  }
};

const PostCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [postCode, setPostCode] = useState("");
  const inputRef = useRef(null);

  // Extract trade and service from URL
  const queryParams = new URLSearchParams(location.search);
  const trade = queryParams.get("trade") || "";
  const service = queryParams.get("service") || "";
  const serviceDetailsId = queryParams.get("service_details_id") || "";
  const services = queryParams.get("services") || "[]"; // Default to an empty array in string format

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!window.google || !window.google.maps) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place || !place.address_components) return;

        const postalCodeComponent = place.address_components.find((component) =>
          component.types.includes("postal_code")
        );

        if (postalCodeComponent) {
          setPostCode(postalCodeComponent.long_name);
        }
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!trade || !service) {
      alert("Trade and service details are missing. Please select valid options.");
      return;
    }

    if (postCode.trim()) {
      navigate(
        `/search-results?trade=${encodeURIComponent(trade)}&service=${encodeURIComponent(service)}&service_details_id=${encodeURIComponent(serviceDetailsId)}&postCode=${encodeURIComponent(postCode)}&services=${encodeURIComponent(
          services
        )}`
      );
    } else {
      alert("Please enter a valid address with a postcode.");
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
              <h2 className="big-text">Enter Address</h2>
              <p>Select your address to find Artisans near you!</p>
            </div>
            <div className="Gradnded-Box-Body">
              <form onSubmit={handleSubmit}>
                <div className="Gland-Quest-data">
                  <input
                    type="text"
                    placeholder="Type address"
                    ref={inputRef}
                    defaultValue=""
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
