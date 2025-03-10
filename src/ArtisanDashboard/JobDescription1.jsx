import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import MyLocation from '@mui/icons-material/MyLocation';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import UserPlaceholder from './Img/user-placeholder.png';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const JobDescription1 = () => {
    const [hasQuote, setHasQuote] = useState(false);
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const [flash, setFlash] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { quote } = location.state || {}; 
    const jobId = quote?.job_request?.unique_id;
    const artisanId = quote?.artisan?.unique_id;

    useEffect(() => {
        if (jobId && artisanId) {
            fetch(`${djangoHostname}/api/auth/quotes/quote_request/quote_for_a_job_by_an_artisan_job/?job_id=${jobId}&artisan_id=${artisanId}`)
                .then(response => response.json())
                .then(data => {
                    if (data && Object.keys(data).length > 0) {
                        setHasQuote(true); // If the API returns data, update the state
                        // console.log("data")
                        // console.log(data)
                        // console.log("data")
                    }
                })
                .catch(error => console.error("Error fetching quote:", error));
        }
    }, [jobId, artisanId]);

    const showMessage = (message, type) => {
        setFlash({ message, type });
    };

    if (!quote) {
        return <p>No quote data available.</p>; 
    }

    return (
        <div className="ooUserdashbaord-Page">
            <div className="site-container">
                <div className="Gradnded-main">
                    <div className="Gradnded-Box">
                        <Link to="/artisan-dashboard" className="back_Link">
                            <ArrowBackIcon /> Back
                        </Link>

                        {flash && (
                            <FlashMessage
                                message={flash.message}
                                type={flash.type}
                                onClose={() => setFlash(null)}
                            />
                        )}

                        <div className="Gradnded-Box-header">
                            <h2 className="big-text">{quote.job_request?.title}</h2>
                        </div>

                        <div className="Habgb-sec">
                            <div className="My-Artisan-Body">
                                <div className="garoo-Gird-part2">
                                    <div className="Carded-Box">
                                        <div className="Carded-Box-Gridd">
                                            <div className="Carded-Box-2">
                                                <div className="oo-dlsts">
                                                    <h3>
                                                        {quote.job_request?.title}{" "}
                                                        <span>
                                                            <AccessTimeIcon />{" "}
                                                            {new Date(quote.created_at).toLocaleDateString()}
                                                        </span>
                                                    </h3>
                                                </div>

                                                <div className="ahhgs-sec">
                                                    <h3>
                                                        {/* <img src={UserPlaceholder} alt="User" />{" "} */}
                                                        {quote.artisan?.first_name} {quote.artisan?.last_name}
                                                    </h3>
                                                    <p>
                                                        <CheckCircleIcon /> Active
                                                    </p>
                                                </div>

                                                <div className="kklauis-seds">
                                                    <h3>What to do</h3>
                                                    <p>{quote.job_request?.service_description}</p>
                                                    {/* <h3>Issues description</h3>
                                                    <p>{quote.job_request?.description}</p> */}
                                                    <h3>More description</h3>
                                                    <p>{quote.job_request?.description}</p>
                                                </div>

                                                <div className="GLnad-btns ggfa-btns">
                                                    <div className="GLnad-btns-1">
                                                        <span>
                                                            {quote.job_request?.num_appllications > 1
                                                                ? "Complex Job"
                                                                : "Simple Job"}
                                                        </span>
                                                        <span>
                                                            <BusinessCenterIcon />{" "}
                                                            {quote.job_request?.num_appllications}{" "}
                                                            {quote.job_request?.num_appllications > 1
                                                                ? "Applications"
                                                                : "Application"}
                                                        </span>
                                                    </div>
                                                    <div className="GLnad-btns-2">
                                                    <div className="GLnad-btns-2">
                                                        {/* <Link
                                                            to={{
                                                                pathname: "/artisan-dashboard/send-quote",
                                                            }}
                                                            {...(hasQuote ? { state: { quote } } : {})} // Only add state if hasQuote is true
                                                        >
                                                            {hasQuote ? "Resend Quote" : "Send Quote"}
                                                        </Link> */}
                                                    </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDescription1;