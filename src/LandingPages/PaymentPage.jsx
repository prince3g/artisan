
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { PaystackButton } from "react-paystack";

const PaymentPage  = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || {};



  // console.log("Selected Plan:", plan);
  const authToken = sessionStorage.getItem("access_token");
  const email = sessionStorage.getItem("user_email");
  const firstName = sessionStorage.getItem("user_first_name");
  const lastName = sessionStorage.getItem("user_last_name");
  
  if (!authToken || !email || !firstName || !lastName) {
    setFlashMessage("Please Login or Register to continue");
    setTimeout(() => {
        setFlashMessage("");
        navigate("/login");
    }, 3000);
    return;
}

    const publicKey = "pk_test_3444178a2e2dda33f778668a54dc53bc712d04a3"; 
    const amount = plan.price * 100; // Amount in kobo (100 kobo = 1 Naira)
  
  
    const handleSuccess = (reference) => {
      //console.log("Payment successful!", reference);
      handleSubscribeClick(plan.unique_id)
      // Handle success logic (e.g., updating backend, showing confirmation)
    };
  
    const handleClose = () => {
      console.log("Payment closed");
      // Handle the case where the user closes the payment modal
    };
  
    const componentProps = {
      email,
      firstName,
      lastName,
      amount,
      publicKey,
      text: "Subscribe Now",
      onSuccess: handleSuccess,
      onClose: handleClose,
    };


const handleSubscribeClick = async (planId) => {
      setIsSubscribing(planId);
      const authToken = sessionStorage.getItem("access_token");
      const authUserId = sessionStorage.getItem("unique_user_id");
  
      const payload = {
          user: authUserId,
          subscription_plan: planId,
          subscribed_duration: 1  // Default to 1 month
      };
  
      
      try {
          const response = await fetch(`${djangoHostname}/api/subscription/auth/api/user-subscriptions/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify(payload)
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.detail || "Failed to subscribe");
          }
  
          const result = await response.json();
  
          navigate("/dashboard");
          // window.location.href = result.payment_link;  // Redirect to Remita payment page
  
      } catch (error) {
          console.error("Error subscribing:", error);
          setFlashMessage(error.message || "An unexpected error occurred");
          setTimeout(() => setFlashMessage(""), 3000);
      } finally {
          setIsSubscribing(null);
      }
  };
  
  return (
    <div className='Arrri-Pahgs'>
      <div className='large-container'>
        <div className='Arrri-Pahgs-main Succ-Sec'>
          <div className="paymend-Seecc">
            <div className="paymend-Seecc-1">
              <h1 className='big-text'>{plan.name || "Plan"}</h1>
              <h3>
                ₦{plan.price} <span>/per month</span>
              </h3>
              <p>
                1st month Promo <span>₦{plan.promo_price}</span>
              </p>
              <div className='pay-seclt'>
                <label>Select Payment method</label>
                <div className='pay-seclt-btn'>
                  {/* <button>Flutterwave</button> */}
                  <PaystackButton {...componentProps} />
                  {/* <button>Remita</button> */}
                </div>
              </div>
            </div>
            <div className="paymend-Seecc-2">
              <h4>Features</h4>
              <ul>
                {plan.features?.map((feature, index) => (
                  <li key={index}><CheckIcon /> {feature}</li>
                ))}
              </ul>
              <h4>Key Benefits</h4>
              <ol>
                {plan.key_benefits?.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
