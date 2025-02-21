import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

const Subscriptions = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const apiUrl = `${djangoHostname}/api/auth/subscriptions/api/subscriptions/`;
  const navigate = useNavigate();

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch subscription plans");
        }
        const data = await response.json();
        setSubscriptionPlans(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, [apiUrl]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        const response = await fetch(`${apiUrl}${id}/`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete subscription plan");
        }
        setSubscriptionPlans(subscriptionPlans.filter(plan => plan.id !== id));
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) return <p>Loading subscription plans...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec">
        <div className="top-sec-main">
          <h3>Subscription Plans</h3>
          <p>Simservice Hub Subscription Plans</p>
        </div>
        <ul>
          <li>
            <Link to="/admin/add-subscription">
              <AddIcon /> Add a Plan
            </Link>
          </li>
        </ul>
      </div>

      {subscriptionPlans.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          There is no subscription plan created yet.
        </p>
      ) : (
        <div className="subb-boxes-Grid admin-ggg-subi">
          {subscriptionPlans.map((plan) => (
            <div className="subb-box" key={plan.id}>
              <div className="subb-box-Btns">
                <Link to="/admin/edit-plan" state={{ plan }}>Edit Plan</Link>
                <button onClick={() => handleDelete(plan.id)}>Remove Plan</button>
              </div>

              <h2>{plan.name}</h2>
              <h3>
                ₦{parseFloat(plan.price).toLocaleString()} <span>/per month</span> <br />
                <span>1st month Promo ₦{parseFloat(plan.promo_price).toLocaleString()}</span>
              </h3>

              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <CheckIcon /> {feature}
                  </li>
                ))}
              </ul>

              <h4>Key Benefits</h4>
              <ol>
                {plan.key_benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
