import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom"; 
import CompletedReg from "./CompletedReg";
import PendingAproval from "./PendingAproval";

const PendingApprovalCheck = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
    const location = useLocation(); // Get state from navigation
    const [isApproved, setIsApproved] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Try getting uniqueUserId from sessionStorage first
        let uniqueUserId = sessionStorage.getItem("unique_user_id");

        // If not found, check the state passed during navigation
        if (!uniqueUserId && location.state?.uniqueId) {
            uniqueUserId = location.state.uniqueId;
            sessionStorage.setItem("unique_user_id", uniqueUserId); // Store for future use
        }

        if (!uniqueUserId) {
            setError("No unique user ID found. Please log in again.");
            setLoading(false);
            return;
        }

        const fetchProfileStatus = async () => {
            try {
                const response = await fetch(
                    // `${djangoHostname}/api/accounts/auth/api/users/${uniqueUserId}`
                     `${djangoHostname}/api/profiles/auth/artisan-profile/?unique_id=${uniqueUserId}`
                    
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setIsApproved(data.is_approved);
                console.log("data")
                console.log(data)
                console.log("data")

                setUserData(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileStatus();
    }, [location.state]); // Depend on location.state in case of navigation

    if (loading) return <p>Checking Approval Status...</p>;
    if (error) return <p>Error: {error}</p>;

    return isApproved ? <CompletedReg userData={userData} /> : <PendingAproval />;
};

export default PendingApprovalCheck;
