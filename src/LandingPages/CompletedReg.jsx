import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CompletedImg from "./Img/completed-banner.svg";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";  

const CompletedReg = ({ userData, flash, setFlash }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/login");
    };

    return (
        <div className="Arrri-Pahgs">
            <div className="large-container">
                <div className="Arrri-Pahgs-main Succ-Sec">
                    {flash && (
                        <FlashMessage
                            message={flash.message}
                            type={flash.type}
                            onClose={() => setFlash(null)}
                        />
                    )}

                    <div className="Succ-Box">
                        <img src={CompletedImg} alt="Completed" />
                        <h3>Congratulations {userData?.user?.first_name} {userData?.user?.last_name}</h3>
                        <p>You have successfully completed the process</p>
                        <h6>Your identification code:</h6>
                        <h2>{userData?.identification_code}</h2>
                        <button className="oo-finish-btn" onClick={handleBackClick}>
                            Finish
                        </button>
                        <h5>
                            For information and assistance <Link to="/contact-us">Help</Link>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedReg;
