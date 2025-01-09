// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import googleIcon from './Img/google-icon.png';
// import appleIcon from './Img/apple-icon.png';
// import { Link } from "react-router-dom";

// const CostumerLogin1 = () => {
//     const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;


//     const [email, setEmail] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();


//         // Regular expression to check for email with "@" and ".com"
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//         if (!email) {
//             setError("Please enter your email.");
//         } else if (!emailRegex.test(email)) {
//             setError("Please enter a valid email with '@' and '.com'.");
//         } else {
//             setError(""); // Clear any existing errors
//             navigate("/verify-email", { state: { email } }); // Pass email in state
//         }
//     };

//     return (
//         <div className="Gradnded-page">
//             <div className="navigating-ttarvs">
//                 <div className="site-container">
//                     <p>
//                         <Link to="/">Simservicehub</Link> <ChevronRightIcon />
//                         <Link to="/customer-login"> Customer Sign up or create account CostumerLogin1 </Link>
//                     </p>
//                 </div>
//             </div>

//             <div className="site-container">
//                 <div className="Gradnded-main">
//                     <div className="Gradnded-Box Shirolls_Box">
//                         <div className="Gradnded-Box-header">
//                             <h2 className="big-text">Sign in or create an account</h2>
//                             <p>
//                                 With a simservicehub account, you can easily chat with, manage, and hire tradespeople for your job. Enter your email address, and we'll send you a verification email to begin.
//                             </p>
//                         </div>

//                         <div className="Gradnded-Box-Body">
//                             <div className="Gland-Quest">
//                                 <div className="Gland-Quest-data">
//                                     <label>Email</label>
//                                     <input
//                                         type="email"
//                                         placeholder="Type your email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)} // Set the email state
//                                     />
//                                     {error && <p className="error-message">{error}</p>} {/* Display error message */}
//                                 </div>
//                                 <div className="Gland-Cnt-Btn">
//                                     <button type="submit" className="post-job-btn" onClick={handleSubmit}>
//                                         Continue
//                                     </button>
//                                 </div>

//                                 <div className="orl-Line">
//                                     <span>Or</span>
//                                 </div>

//                                 <div className="fffa-btns">
//                                     <button>
//                                         <img src={googleIcon} alt="Google" /> Sign in with Google
//                                     </button>
//                                     <button>
//                                         <img src={appleIcon} alt="Apple" /> Sign in with Apple
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CostumerLogin1;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import googleIcon from './Img/google-icon.png';
import appleIcon from './Img/apple-icon.png';
import { Link } from "react-router-dom";
import axios from "axios";  // Import axios for making HTTP requests

const CostumerLogin1 = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);  // State to handle loading
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression to check for email with "@" and ".com"
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!email) {
            setError("Please enter your email.");
        } else if (!emailRegex.test(email)) {
            setError("Please enter a valid email with '@' and '.com'.");
        } else {
            setError(""); // Clear any existing errors
            setLoading(true);  // Set loading to true

            try {
                // Make the API call to send the token
                const response = await axios.post(`${djangoHostname}/api/accounts/auth/api/send-login-token/`, { email });

                if (response.status === 200) {
                    navigate("/verify-email", { state: { email } }); // Navigate to verify email page
                }
            } catch (error) {
                // Display the error message from the response
                if (error.response && error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError("Failed to send token. Please try again later.");
                }
            } finally {
                setLoading(false);  // Set loading to false
            }
        }
    };


    return (
        <div className="Gradnded-page">
            <div className="navigating-ttarvs">
                <div className="site-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/customer-login"> Customer Sign up or create account </Link>
                    </p>
                </div>
            </div>

            <div className="site-container">
                <div className="Gradnded-main">
                    <div className="Gradnded-Box Shirolls_Box">
                        <div className="Gradnded-Box-header">
                            <h2 className="big-text">Sign in or create an account</h2>
                            <p>
                                With a simservicehub account, you can easily chat with, manage, and hire tradespeople for your job. Enter your email address, and we'll send you a verification email to begin.
                            </p>
                        </div>

                        <div className="Gradnded-Box-Body">
                            <div className="Gland-Quest">
                                <div className="Gland-Quest-data">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Type your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Set the email state
                                    />
                                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                                </div>
                                <div className="Gland-Cnt-Btn">
                                    <button 
                                        type="submit" 
                                        className="post-job-btn" 
                                        onClick={handleSubmit} 
                                        disabled={loading} // Disable button when loading
                                    >
                                        {loading ? 'Sending...' : 'Continue'}
                                    </button>
                                </div>

                                <div className="orl-Line">
                                    <span>Or</span>
                                </div>

                                <div className="fffa-btns">
                                    <button>
                                        <img src={googleIcon} alt="Google" /> Sign in with Google
                                    </button>
                                    <button>
                                        <img src={appleIcon} alt="Apple" /> Sign in with Apple
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostumerLogin1;
