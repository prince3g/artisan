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
                <Link to="/payment" className='Fin-subbnna-btn'>Subscribe</Link>
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
