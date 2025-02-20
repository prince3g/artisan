import React, { useState, useEffect } from "react";
import CompletedReg from "./CompletedReg";
import PendingAproval from "./PendingAproval";

const PendingApprovalCheck = () => {
    const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [isApproved, setIsApproved] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const uniqueUserId = sessionStorage.getItem("unique_user_id");
    const fetchProfileStatus = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/profiles/auth/artisan-profile/?unique_id=${uniqueUserId}`
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
  }, []);

  if (loading) return <p>Checking Approval Status...</p>;
  if (error) return <p>Error: {error}</p>;

  return isApproved ? <CompletedReg userData={userData} /> : <PendingAproval />;

};


export default PendingApprovalCheck;
