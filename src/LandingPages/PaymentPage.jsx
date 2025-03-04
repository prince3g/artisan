
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { PaystackButton } from "react-paystack";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const PaymentPage  = () => {

  
const [flash, setFlash] = useState(null);    
const showMessage = (message, type) => {
  setFlash({ message, type });
};

const [isSubscribing, setIsSubscribing] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || {};



  // console.log("Selected Plan:", plan);
  const authToken = sessionStorage.getItem("access_token");
  const email = sessionStorage.getItem("user_email");
  const firstName = sessionStorage.getItem("user_first_name");
  const lastName = sessionStorage.getItem("user_last_name");
  
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
      
      try {
          const response = await fetch(`${djangoHostname}/api/paystack/verify-payment/`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify({ reference: reference.reference }) // Send reference to backend
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.detail || "Payment verification failed");
          }
  
          const result = await response.json();
  
          // If verification is successful, subscribe the user
          if (result.status === "success") {
              handleSubscribeClick(plan.unique_id);
          } else {
              console.error("Payment verification failed", result);
          }
      } catch (error) {
          console.error("Error verifying payment:", error);
      }
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
          showMessage(error.message || "An unexpected error occurred");
          setTimeout(() => showMessage(""), 3000);
      } finally {
          setIsSubscribing(null);
      }
  };
  
  return (
    <div className='Arrri-Pahgs'>
      <div className='large-container'>
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
