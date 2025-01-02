import React, { useState, useEffect } from "react";
import "./Css/Main.css";
import { Link, useLocation } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CostumerLogin2 = () => {
  const { state } = useLocation(); // Access state passed from the previous page
  const email = state?.email; // Extract email from the state

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
            <Link to="/customer-login"> Customer Sign up or create account</Link> <ChevronRightIcon />
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
