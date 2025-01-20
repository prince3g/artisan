import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import googleIcon from './Img/google-icon.png';
import appleIcon from './Img/apple-icon.png';
import { Link } from "react-router-dom";

const CostumerLogin4 = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;


    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        // Regular expression to check for email with "@" and ".com"
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!email) {
            setError("Please enter your email.");
        } else if (!emailRegex.test(email)) {
            setError("Please enter a valid email with '@' and '.com'.");
        } else {
            setError(""); // Clear any existing errors
            navigate("/verify-email", { state: { email } }); // Pass email in state
        }
    };

    return (
        <div className="Gradnded-page">
            <div className="navigating-ttarvs">
                <div className="site-container">
                    <p>
                        <Link to="/">Simservicehub</Link> <ChevronRightIcon />
                        <Link to="/customer-signup"> Customer Sign up or create account </Link>
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
                                    <label>Full Name</label>
                                    <input
                                        type="type"
                                        placeholder="Type your full name"
                                    />
                                </div>

                                <div className="Gland-Quest-data">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="Type your email"
                                    />
                                </div>

                                <div className="Gland-Quest-data">
                                    <label>Phone Number</label>
                                    <input
                                        type="number"
                                        placeholder="Type your phone number"
                                    />
                                </div>

                                <div className="Gland-Quest-data">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        placeholder="Type your password"
                                    />
                                </div>

                                <div className="Gland-Quest-data">
                                    <label>Confrim Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm password"
                                    />
                                </div>


                                <div className="Gland-Cnt-Btn">
                                    <button type="submit" className="post-job-btn" onClick={handleSubmit}>
                                        Continue
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

export default CostumerLogin4;
