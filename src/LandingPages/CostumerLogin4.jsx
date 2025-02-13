import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CostumerLogin4 = () => {
    
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);  // State for password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
    const [loading, setLoading] = useState(false); // State for loading status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression to check for a valid email (allowing custom domains)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Regular expression to check for a valid phone number with country code
        const phoneRegex = /^\+[1-9]\d{1,14}$/;

        if (!email) {
            setError("Please enter your email.");
        } else if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
        } else if (!phoneRegex.test(phone)) {
            setError("Please enter a valid phone number with country code.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError(""); // Clear any existing errors
            setLoading(true); // Start loading

            const userData = {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                phone,
                mobile_number:phone,
                user_type:"customer"
            };

            try {

                // console.log("userData")
                // console.log(userData)
                // console.log("userData")

                const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                setLoading(false); // Stop loading after the request

                if (response.ok) {
                    const result = await response.json();
                    // console.log('User created successfully:', result);
                    navigate("/login", { state: { email } }); // Pass email in state
                } else {
                    const errorData = await response.json();
                    // Extracting error details and displaying them
                    const errorMessages = [];
                    if (errorData.email) {
                        errorMessages.push(errorData.email[0]);
                    }
                    if (errorData.phone) {
                        errorMessages.push(errorData.phone[0]);
                    }
                    if (errorData.mobile_number) {
                        errorMessages.push(errorData.mobile_number[0]);
                    }

                    setError(errorMessages.length > 0 ? errorMessages.join(" ") : 'Something went wrong');
                }
            } catch (error) {
                setLoading(false); // Stop loading if there is an error
                console.error('Error:', error);
                setError('An error occurred. Please try again.');
            }
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
                            <form onSubmit={handleSubmit}>
                                <div className="Gland-Quest">
                                    <div className="Gland-Quest-data">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Type your last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="Gland-Quest-data">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            placeholder="Type your first name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>

                                    <div className="Gland-Quest-data">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Type your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="Gland-Quest-data">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="Type your phone number (e.g., +1234567890)"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="Gland-Quest-data">
                                        <label>Password</label>
                                        <div className="password-input-container">
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                placeholder="Type your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="visibility-toggle"
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                            >
                                                {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="Gland-Quest-data">
                                        <label>Confirm Password</label>
                                        <div className="password-input-container">
                                            <input
                                                type={confirmPasswordVisible ? "text" : "password"}
                                                placeholder="Confirm password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="visibility-toggle"
                                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                            >
                                                {confirmPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="Gland-Cnt-Btn">
                                        <button type="submit" className="post-job-btn">
                                            {loading ? "Submitting..." : "Continue"}
                                        </button>
                                    </div>

                                    {error && <p className="error-message">{error}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostumerLogin4;
