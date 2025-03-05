import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { PaystackButton } from "react-paystack";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const PaymentPage  = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const [flash, setFlash] = useState(null);    
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const [isSubscribing, setIsSubscribing] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || {};

  const authToken = sessionStorage.getItem("access_token");
  const email = sessionStorage.getItem("user_email");
  const firstName = sessionStorage.getItem("user_first_name");
  const lastName = sessionStorage.getItem("user_last_name");
  const unique_user_id = sessionStorage.getItem('unique_user_id');

  useEffect(() => {
    if (!authToken || !email || !firstName || !lastName) {
      showMessage("Please Login or Register to continue", "failure");
      setTimeout(() => {
        showMessage("");
        navigate("/login");
      }, 3000);
    }
  }, [authToken, email, firstName, lastName, navigate]);

  const publicKey = "pk_live_298148d200fe6524e3e74ff64bbefa4a9d9d739b"; 
  
  const amount = (plan?.price || 0) * 100;

  const handleSuccess = async (reference) => {
    console.log("Payment successful!", reference);
    setIsSubscribing(true);  // Disable UI on payment success
    
    try {
        const response = await fetch(`${djangoHostname}/api/accounts/auth/paystack/verify-payment/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ reference: reference.reference , payment_type: "subscription", user: unique_user_id}) 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Payment verification failed");
        }

        const result = await response.json();

        if (result.status === "success") {
            handleSubscribeClick(plan.unique_id, reference.reference);
        } else {
            console.error("Payment verification failed", result);
            setIsSubscribing(false);  // Re-enable UI on failure
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        setIsSubscribing(false);  // Re-enable UI on failure
    }
  };

  const handleClose = () => {
    console.log("Payment closed");
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

  const handleSubscribeClick = async (planId, payment_reference) => {
    setIsSubscribing(true);
    const authToken = sessionStorage.getItem("access_token");
    const authUserId = sessionStorage.getItem("unique_user_id");


    const payload = {
      payment_reference: payment_reference,
      user: authUserId,
      subscription_plan: planId,
      subscribed_duration: 1  
    };


    try {
        const response = await fetch(`${djangoHostname}/api/auth/subscriptions/api/user-subscriptions/`, {
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

        sessionStorage.setItem('isSubscribed', true);
        navigate("/pending-approval");

    } catch (error) {
       // console.error("Error subscribing:", error);
        showMessage(error.message || "An unexpected error occurred", "failure");
        setTimeout(() => showMessage(""), 3000);
    } finally {
        setIsSubscribing(false);
    }
  };

  return (
    <div className='Arrri-Pahgs'>
      {isSubscribing && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className={`large-container ${isSubscribing ? 'disabled' : ''}`}>
        <div className='Arrri-Pahgs-main Succ-Sec'>
          <div className="paymend-Seecc">
            
            {flash && (
              <FlashMessage
                  message={flash.message}
                  type={flash.type}
                  onClose={() => setFlash(null)}
              />
            )}

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
                  <PaystackButton {...componentProps} />
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

      <style>
        {`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid white;
            border-top: 5px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .disabled {
            pointer-events: none;
            opacity: 0.7;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentPage;
