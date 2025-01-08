// import React, { useState, useEffect } from "react";
// import "./Css/Main.css";
// import { Link, useLocation } from "react-router-dom";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// const CostumerLogin2 = () => {
//   const { state } = useLocation(); // Access state passed from the previous page
//   const email = state?.email; // Extract email from the state

//   // State to track input values
//   const [inputs, setInputs] = useState(Array(5).fill(""));

//   // State for timer countdown
//   const [timer, setTimer] = useState(25);
//   const [isResendVisible, setResendVisible] = useState(false);

//   // Handle input changes
//   const handleInputChange = (index, event) => {
//     const value = event.target.value;

//     // Allow only numeric input
//     if (/^\d*$/.test(value)) {
//       const newInputs = [...inputs];
//       newInputs[index] = value;
//       setInputs(newInputs);
//     }
//   };

//   // Reset the timer when "Resend" is clicked
//   const handleResend = () => {
//     setTimer(25); // Reset the timer to 25 seconds
//     setResendVisible(false); // Hide the resend button while the timer counts down
//   };

//   useEffect(() => {
//     if (timer === 0) {
//       setResendVisible(true); // Show the Resend button when the timer reaches 0
//       return;
//     }

//     const intervalId = setInterval(() => {
//       setTimer((prevTimer) => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(intervalId); // Cleanup the interval on component unmount
//   }, [timer]);

//   return (
//     <div className="Gradnded-page">
//       <div className="navigating-ttarvs">
//         <div className="site-container">
//           <p>
//             <Link to="/">Simservicehub</Link> <ChevronRightIcon />
//             <Link to="/customer-login"> Customer Sign up or create account CostumerLogin2</Link> <ChevronRightIcon />
//             <Link to="/verify-email"> Verify Email</Link>
//           </p>
//         </div>
//       </div>

//       <div className="site-container">
//         <div className="Gradnded-main">
//           <div className="Gradnded-Box Shirolls_Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Check your email</h2>
//               <p>
//                 We have sent you a code via email to <strong>{email}</strong>. Please insert it here.
//               </p>
//             </div>

//             <div className="Gradnded-Box-Body hga-body">
//               <div className="Gland-Quest">
//                 <div className="Gland-Quest-data gghaja-flex">
//                   {inputs.map((input, index) => (
//                     <input
//                       key={index}
//                       type="text"
//                       value={input}
//                       onInput={(e) => handleInputChange(index, e)}
//                       maxLength={1} // Limit to 1 digit per input
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div className="ghha-foot">
//                 <p>
//                   Didn't receive the message?{" "}
//                   {timer > 0 && <span>Resend in {timer} seconds</span>}
//                   {isResendVisible && (
//                     <button onClick={handleResend}>Resend</button> // Restart the timer
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CostumerLogin2;

import React, { useState, useEffect } from "react";
import "./Css/Main.css";
import { Link, useLocation, useNavigate} from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios"; // Import axios for making HTTP requests

const CostumerLogin2 = () => {
  const { state } = useLocation(); // Access state passed from the previous page
  const email = state?.email; // Extract email from the state

   const navigate = useNavigate();

  // State to track input values
  const [inputs, setInputs] = useState(Array(5).fill(""));

  // State for timer countdown
  const [timer, setTimer] = useState(25);
  const [isResendVisible, setResendVisible] = useState(false);

  // Handle input changes
  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    }
  };

  // Trigger validation when all 5 fields are filled
  useEffect(() => {
    if (inputs.every((input) => input !== "")) {
      validateToken(); // Trigger token validation
    }
  }, [inputs]);

  // Make the API call to validate the token
  const validateToken = async () => {
    const token = inputs.join(""); // Combine all input fields to form the full token

    try {
      const response = await axios.post(`${import.meta.env.VITE_DJANGO_HOSTNAME}/api/accounts/auth/api/verify-login-token/`, {
        email,
        token,
      });

      if (response.status === 200) {
        // Redirect or take the next step after successful validation
        // Example: Navigate to dashboard
        
        console.log("Token validated successfully", response.data);

        localStorage.setItem('user_id', response.data.userId);

        localStorage.setItem('user_email', response.data.email);
        localStorage.setItem('user_phone', response.data.phone);

        localStorage.setItem('unique_user_id', response.data.userUnique_id);

        localStorage.setItem('user_first_name', response.data.first_name);
        localStorage.setItem('user_last_name', response.data.last_name);

        // localStorage.setItem('user_user_type', response.data.user_type);

        localStorage.setItem('access_token', response.data.access);

        localStorage.setItem('date_joined', response.data.date_joined);

        navigate("/user-dashboard"); // Navigate to verify email page
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Show error message if token is invalid
      } else {
        alert("Failed to verify token. Please try again later.");
      }
    }
  };

  // Reset the timer when "Resend" is clicked
  const handleResend = () => {
    setTimer(25); // Reset the timer to 25 seconds
    setResendVisible(false); // Hide the resend button while the timer counts down
  };

  useEffect(() => {
    if (timer === 0) {
      setResendVisible(true); // Show the Resend button when the timer reaches 0
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [timer]);

  return (
    <div className="Gradnded-page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />
            <Link to="/customer-login"> Customer Sign up or create account CostumerLogin2</Link> <ChevronRightIcon />
            <Link to="/verify-email"> Verify Email</Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Check your email</h2>
              <p>
                We have sent you a code via email to <strong>{email}</strong>. Please insert it here.
              </p>
            </div>

            <div className="Gradnded-Box-Body hga-body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data gghaja-flex">
                  {inputs.map((input, index) => (
                    <input
                      key={index}
                      type="text"
                      value={input}
                      onInput={(e) => handleInputChange(index, e)}
                      maxLength={1} // Limit to 1 digit per input
                    />
                  ))}
                </div>
              </div>
              <div className="ghha-foot">
                <p>
                  Didn't receive the message?{" "}
                  {timer > 0 && <span>Resend in {timer} seconds</span>}
                  {isResendVisible && (
                    <button onClick={handleResend}>Resend</button> // Restart the timer
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumerLogin2;
