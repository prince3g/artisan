import React, { useState, useEffect } from "react";
import "./Css/Main.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";

const CostumerLogin2 = () => {
  const { state } = useLocation(); // Access state passed from the previous page
  const email = state?.email;
  const phone = state?.phone;
  const inputType = state?.inputType;

  const navigate = useNavigate();

  // State to track input values
  const [inputs, setInputs] = useState(Array(5).fill(""));

  // State for timer countdown
  const [timer, setTimer] = useState(25);
  const [isResendVisible, setResendVisible] = useState(false);



  const handleInputChange = (index, event) => {
    const value = event.target.value;
  
    // Allow only numeric input and move to next field if a digit is entered
    if (/^\d$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
  
      // Move to the next input field if not the last one
      if (index < inputs.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else if (value === "") {
      // Allow deletion and move cursor back
      const newInputs = [...inputs];
      newInputs[index] = "";
      setInputs(newInputs);
    }
  };

  
  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text");
  
    // Ensure only numeric data and check if length matches the number of inputs
    if (/^\d+$/.test(pasteData) && pasteData.length === inputs.length) {
      const newInputs = pasteData.split("").slice(0, inputs.length);
      setInputs(newInputs);
    }
  };
  

  // Trigger validation when all 5 fields are filled
  useEffect(() => {
    if (inputs.every((input) => input !== "")) {
      validateToken(); // Trigger token validation
    }
  }, [inputs]);

  const validateToken = async () => {
    const token = inputs.join(""); // Combine all input fields to form the full token

    try {
      const response = await axios.post(`${import.meta.env.VITE_DJANGO_HOSTNAME}/api/accounts/auth/api/verify-login-token/`, {
        [inputType]: inputType === "email" ? email : phone,
        token,
      });

      if (response.status === 200) {
        // Save user data to localStorage
        sessionStorage.setItem('user_id', response.data.userId);
        sessionStorage.setItem('Address', response.data.address);
        sessionStorage.setItem('user_email', response.data.email);
        sessionStorage.setItem('user_phone', response.data.phone);
        sessionStorage.setItem('user_type', response.data.user_type);
        sessionStorage.setItem('unique_user_id', response.data.unique_user_id);
        sessionStorage.setItem('user_first_name', response.data.first_name);
        sessionStorage.setItem('user_last_name', response.data.last_name);
        sessionStorage.setItem('access_token', response.data.access);
        sessionStorage.setItem('refresh_token', response.data.refresh);
        sessionStorage.setItem('isSubscribed', response.data.isSubscribed);
        sessionStorage.setItem('user_date_joined', response.data.user_date_joined);

        // Route based on user type

        

        if (response.data.user_type === 'artisan') {
          // window.location.reload();
          navigate("/artisan-dashboard");
        } else if (response.data.user_type === 'customer') {
          navigate("/user-dashboard");
        } else if (response.data.user_type === 'super_admin') {
          navigate("/admin");
        } else {
          alert("Unknown user type");
        }
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
  const handleResend = async () => {
    setTimer(25); // Reset the timer to 25 seconds
    setResendVisible(false); // Hide the resend button while the timer counts down
    setInputs(Array(5).fill("")); // Clear the input fields
  
    try {
      await axios.post(`${import.meta.env.VITE_DJANGO_HOSTNAME}/api/accounts/auth/api/send-login-token/`, {
        [inputType]: inputType === "email" ? email : phone,
      });
      alert('Verification code resent successfully.');
    } catch (error) {
      alert('Failed to resend verification code. Please try again later.');
    }
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
            <Link to="/verify-email"> Verify {inputType === "email" ? "Email" : "Phone"}</Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Check your {inputType}</h2>
              <p>
                We have sent you a code via {inputType} to <strong>{inputType === "email" ? email : phone}</strong>. Please insert it here.
              </p>
            </div>

            <div className="Gradnded-Box-Body hga-body">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data gghaja-flex">
                  {/* {inputs.map((input, index) => (
                    <input
                      key={index}
                      type="text"
                      value={input}
                      onInput={(e) => handleInputChange(index, e)}
                      onPaste={handlePaste} // Handle pasting the full token
                      maxLength={1} // Limit to 1 digit per input
                    />
                  ))} */}

                  {inputs.map((input, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`} // Assign a unique ID to each input
                      type="text"
                      value={input}
                      onChange={(e) => handleInputChange(index, e)}
                      onPaste={handlePaste}
                      maxLength={1} // Restrict input to 1 character
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
