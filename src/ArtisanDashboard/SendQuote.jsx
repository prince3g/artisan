import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const SendQuote = () => {
  const [flash, setFlash] = useState(null);
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const navigate = useNavigate();
  const location = useLocation();
  const quote = location.state || null; // Check if a quote exists

 
  // console.log("quote")
  // console.log(quote)
  // console.log("quote")

  // Prepopulate form fields if quote exists
  const [bidAmount, setBidAmount] = useState(quote?.quote?.bid_amount || "");
  const [jobDuration, setJobDuration] = useState(quote?.quote?.job_duration || "1 week");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const serviceFee = bidAmount ? (bidAmount * 0.1).toFixed(2) : "0.00";
  const receiveAmount = bidAmount ? (bidAmount - serviceFee).toFixed(2) : "0.00";
  const uniqueUserId = sessionStorage.getItem("unique_user_id");

 
  const handleSubmit = async () => {
    if (!bidAmount || !jobDuration) {
      setError("Please enter a bid amount and select a duration.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    let payload = {
      bid_amount: bidAmount,
      freelancer_service_fee: serviceFee,
      job_duration: jobDuration,
    };
  
    if (!quote?.quote?.unique_id) {
      // Include these fields only for POST requests
      payload = {
        ...payload,
        artisan_id: uniqueUserId,
        job_request_id: quote?.job?.job?.unique_id,
      };
    }
  
    const requestOptions = {
      method: quote?.quote?.unique_id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
  
    // console.log("payload");
    // console.log(payload);
    // console.log("payload");
  
    const endpoint = quote?.quote?.unique_id
      ? `${djangoHostname}/api/auth/quotes/quote_request/${quote.quote.unique_id}/`
      : `${djangoHostname}/api/auth/quotes/quote_request/`;
  
    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred.");
      }
  
      showMessage(`Quote ${quote ? "updated" : "sent"} successfully`, "success");

      setTimeout(() => {
          navigate("/artisan-dashboard");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="ooUserdashbaord-Page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">{quote ? "Edit Quote" : "Send Quote"}</h2>
            </div>

            {flash && (
              <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash(null)}
              />
            )}

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className="garoo-Gird-part2">
                  {/* Bid Input */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Bid</h3>
                      <p>What is the total amount you'd like to bid for this job?</p>
                    </div>
                    <div className="hggah-req-2">
                      <h3>NGN</h3>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(parseFloat(e.target.value) || "")}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Service Fee Calculation */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>10% Freelancer Service Fee</h3>
                    </div>
                    <div className="hggah-req-2 muteddd-inpt">
                      <h3>NGN</h3>
                      <input type="number" value={`-${serviceFee}`} readOnly />
                    </div>
                  </div>

                  {/* Amount to Receive Calculation */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>You'll Receive</h3>
                      <p>The estimated amount you'll receive after service fees</p>
                    </div>
                    <div className="hggah-req-2 muteddd-inpt">
                      <h3>NGN</h3>
                      <input type="number" value={receiveAmount} readOnly />
                    </div>
                  </div>

                  {/* Duration Dropdown */}
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Duration</h3>
                      <p>How long do you think this project will take?</p>
                    </div>
                    <div className="hggah-req-2">
                      <select
                        value={jobDuration}
                        onChange={(e) => setJobDuration(e.target.value)}
                        disabled={loading}
                      >
                        <option>1 Hour</option>
                        <option>4 Hours</option>
                        <option>8 Hours</option>
                        <option>12 Hours</option>
                        <option>1 day</option>
                        <option>2 days</option>
                        <option>4 days</option>
                        <option>6 days</option>
                        <option>1 week</option>
                        <option>2 weeks</option>
                        <option>3 weeks</option>
                        <option>1 month</option>
                        <option>2 months</option>
                      </select>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {/* Buttons */}
                  <div className="aaggs-sec-btns">
                    <button className="accpt-qqut" onClick={handleSubmit} disabled={loading}>
                      {loading ? (quote?.quote?.unique_id ? "Updating..." : "Sending...") : quote?.quote?.unique_id ? "Update Quote" : "Send Quote"}
                    </button>
                    <button className="dec-qqut" onClick={() => navigate(-1)} disabled={loading}>
                      Cancel
                    </button>
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

export default SendQuote;
