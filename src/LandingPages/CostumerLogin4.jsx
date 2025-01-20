import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

const CostumerLogin4 = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Regular expression to check for a valid email (allowing custom domains)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            setError("Please enter your email.");
        } else if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError(""); // Clear any existing errors

            const userData = {
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                phone
            };

            try {
                const response = await fetch(`4{djangoHostname}/api/accounts/auth/api/users/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('User created successfully:', result);
                    navigate("/artisan-login", { state: { email } }); // Pass email in state
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || 'Something went wrong');
                }
            } catch (error) {
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
                                            placeholder="Type your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <div className="Gland-Quest-data">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            placeholder="Type your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="Gland-Quest-data">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="Gland-Cnt-Btn">
                                        <button type="submit" className="post-job-btn">
                                            Continue
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
