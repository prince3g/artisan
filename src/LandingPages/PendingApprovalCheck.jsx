import React, { useState, useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import CompletedReg from "./CompletedReg";
import PendingAproval from "./PendingAproval";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const PendingApprovalCheck = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const navigate = useNavigate();
    
    const [flash, setFlash] = useState(null);    
    const showMessage = (message, type) => {
        setFlash({ message, type });
    };

    const location = useLocation();
    const [isApproved, setIsApproved] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let uniqueUserId = sessionStorage.getItem("unique_user_id");
        let isSubscribed = sessionStorage.getItem("isSubscribed");

        if (!isSubscribed) {
            showMessage("You are not subscribed. Please subscribe to any of our plans.", "failure");
            setTimeout(() => {
                navigate("/subscription");
            }, 3000);
            return;
        }

        if (!uniqueUserId && location.state?.uniqueId) {
            uniqueUserId = location.state.uniqueId;
            sessionStorage.setItem("unique_user_id", uniqueUserId);
        }

        if (!uniqueUserId) {
            setError("No unique user ID found. Please log in again.");
            setLoading(false);
            return;
        }

        const fetchProfileStatus = async () => {
            try {
                const response = await fetch(`${djangoHostname}/api/accounts/auth/api/users/${uniqueUserId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setIsApproved(data.is_approved);
                setUserData(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileStatus();
    }, [location.state]);

    if (loading) return <p>Checking Approval Status...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {flash && (
                <FlashMessage
                    message={flash.message}
                    type={flash.type}
                    onClose={() => setFlash(null)}
                />
            )}
            {isApproved ? (
                <CompletedReg userData={userData} flash={flash} setFlash={setFlash} />
            ) : (
                <PendingAproval flash={flash} setFlash={setFlash} />
            )}
        </>
    );
};

export default PendingApprovalCheck;
