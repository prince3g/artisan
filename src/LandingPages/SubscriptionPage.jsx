import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckIcon from "@mui/icons-material/Check";

const SubscriptionPage = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const apiUrl = `${djangoHostname}/api/auth/subscriptions/api/subscriptions/`;
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const handleSubscribeClick = async (planId) => {
    setIsSubscribing(planId);
    const authToken = sessionStorage.getItem("access_token");
    const authUserId = sessionStorage.getItem("unique_user_id");

    if (!authToken) {
        setFlashMessage("Please login or register to continue");
        setTimeout(() => {
            setFlashMessage("");
            navigate("/login");
        }, 3000);
        setIsSubscribing(null);
        return;
    }

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

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch subscription plans");
        }
        const data = await response.json();
        setPlans(data.results); // Assuming 'results' is the key containing the array of plans
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [apiUrl]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <p>Loading subscription plans...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='subscript-pgg'>
      <div className='AA-page-header'>
        <div className='large-container'>
          <h2 className="big-text">Simservice Hub Subscription Plans</h2>
        </div>
      </div>

      <div className='subb-boxes-sec'>
        <div className='large-container'>
          <div className='subb-boxes-Grid'>
            {plans.map((plan) => (
              <div key={plan.id} className='subb-box'>
                <h2>{plan.name}</h2>
                <h3>₦{parseFloat(plan.price).toLocaleString()} <span>/per month</span> <br /><span>1st month Promo ₦{parseFloat(plan.promo_price).toLocaleString()}</span></h3>
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}><CheckIcon /> {feature}</li>
                  ))}
                </ul>
                <h4>Key Benefits</h4>
                <ol>
                  {plan.key_benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ol>
                {/* <Link to="/payment" className='Fin-subbnna-btn'>Subscribe</Link> */}
                <Link 
                  to={{
                    pathname: "/payment",
                  }} 
                  state={{ plan }}
                  className='Fin-subbnna-btn'
                >
                  Subscribe
                </Link>
              </div>
            ))}
          </div>

          <div className="Gland-Cnt-Btn ujh-btns">
            <button type="button" className="back-btn" onClick={handleBackClick}>Back</button>
            <Link to="/pending-approval">Next</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
