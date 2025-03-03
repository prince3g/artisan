import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import './Userdashbaord.css';
import FlashMessage from "../FlashMessage/FlashMessage.jsx";
import { PaystackButton } from "react-paystack";

const ViewQuote = () => {

  const publicKey = "pk_live_298148d200fe6524e3e74ff64bbefa4a9d9d739b"; 

const [flash, setFlash] = useState(null);    
const showMessage = (message, type) => {
  setFlash({ message, type });
};

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showArtisanDetails, setShowArtisanDetails] = useState(false);
  const [payoutDetails, setPayoutDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const navigate = useNavigate();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const artisan = location.state || {};

  const [bid_amount, setBid_amount] = useState("");
  const [job_duration, setJob_duration] = useState("");


  useEffect(() => {
    if (artisan.artisan?.quote) {
      setBid_amount(artisan.artisan.quote.bid_amount);
      setJob_duration(artisan.artisan.quote.job_duration);
    }
  }, [artisan]);

  const fetchPayoutDetails = async () => {

    const artisan_unique_id = artisan.artisan?.quote?.artisan?.unique_id
    try {
      const response = await axios.get(
        `${djangoHostname}/api/auth/payouts/payouts/${artisan_unique_id}/`
        
      );
      setPayoutDetails(response.data);

      // console.log("response.data")
      // console.log(response.data)
      // console.log("response.data")
      
    } catch (error) {
      console.error("Error fetching payout details:", error);
    }
  };

  const handleShowArtisanDetails = () => {
    setShowArtisanDetails(true);
    fetchPayoutDetails(); // Fetch payout details when the section is shown
  };
  
    // console.log("Selected Plan:", plan);
    const authToken = sessionStorage.getItem("access_token");
    const email = sessionStorage.getItem("user_email");
    const firstName = sessionStorage.getItem("user_first_name");
    const lastName = sessionStorage.getItem("user_last_name");
    
    if (!authToken || !email || !firstName || !lastName) {
      showMessage("Please Login or Register to continue", "failure");
      setTimeout(() => {
        showMessage("", "failure");
          navigate("/login");
      }, 3000);
      return;
  }

  const handleSuccess = (reference) => {
    console.log("Payment successful!", reference);
    handleAcceptQuoteViaEscrow()
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
    amount: bid_amount * 100,
    publicKey,
    text: "PAY VIA ESCROW",
    onSuccess: handleSuccess,
    onClose: handleClose,
  };



  const handleAcceptQuoteViaArtisan = async () => {
    setIsLoading(true); // Start loader

    try {
      const unique_id = artisan.artisan.quote.unique_id;
      const response = await axios.post(

        `${djangoHostname}/api/auth/quotes/quote_request/${unique_id}/accept/`
      );
  
      if (response.status === 201) {
        showMessage("You have accepted the quote successfully", "success");
        setShowPaymentOptions(true);
        setShowArtisanDetails(false);
      } else {
        console.error("Failed to accept quote:", response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
  
        showMessage(errorMessage, "failure");
  
        if (errorMessage === "This quote has already been accepted") {
          setShowPaymentOptions(true);
          setShowArtisanDetails(false);
        }
        
       //  console.log(errorMessage);
      } else {
        showMessage("An error occurred while accepting the quote", "faulure");
      }
      console.error("Error accepting quote:", error);
    }finally {
      setIsLoading(false); // Stop loader
    }
  };

  const handleAcceptQuoteViaEscrow = async () => {
    setIsLoading(true); // Start loader

    try {
      const unique_id = artisan.artisan.quote.unique_id;
      const response = await axios.post(

        `${djangoHostname}/api/auth/quotes/quote_request/${unique_id}/accept/`
      );
  
      if (response.status === 201) {
        showMessage("You have accepted the quote successfully", "success");
        setShowPaymentOptions(true);
        setShowArtisanDetails(false);
      } else {
        console.error("Failed to accept quote:", response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
  
        showMessage(errorMessage, "failure");
  
        if (errorMessage === "This quote has already been accepted") {
          setShowPaymentOptions(true);
          setShowArtisanDetails(false);
        }
        
       //  console.log(errorMessage);
      } else {
        showMessage("An error occurred while accepting the quote", "error");
      }
      console.error("Error accepting quote:", error);
    }finally {
      setIsLoading(false); // Stop loader
    }
  };

  const acceptQuote = async () => {
   
    setShowPaymentOptions(true);
    setShowArtisanDetails(false);
  };

  return (
    <div className="ooUserdashbaord-Page">
      <div className="navigating-ttarvs">
        <div className="site-container">
          <p>
            <Link to="/">Simservicehub</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/"> Customer dashboard</Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs">Posted Jobs </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/jobs">Electrical </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/job-artisans">Artisans </Link> <ChevronRightIcon />
            <Link to="/user-dashboard/view-quote">Request Quote </Link>
          </p>
        </div>
      </div>

      <div className="site-container">
        <div className="Gradnded-main user-quote">
          <div className="Gradnded-Box">
            <div className="Gradnded-Box-header">
              {flash && <FlashMessage message={flash.message} type={flash.type} onClose={() => setFlash(null)} />}
              <h2 className="big-text">Request Quote</h2>
            </div>

            <div className="Habgb-sec">
              <div className="My-Artisan-Body">
                <div className='garoo-Gird-part2'>
                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Bid</h3>
                      <p>The total Amount the Artisan is Bidding for this Job</p>
                    </div>
                    <div className="hggah-req-2">
                      <h3>NGN</h3>
                      <input type="text" value={bid_amount} readOnly />
                    </div>
                  </div>

                  <div className="hggah-req">
                    <div className="hggah-req-1">
                      <h3>Duration</h3>
                      <p>How long it will take to complete the Job</p>
                    </div>
                    <div className="hggah-req-2">
                      <input type="text" value={job_duration} readOnly />
                    </div>
                  </div>

                  <div className="aaggs-sec-btns">
                  <button className="accpt-qqut" onClick={acceptQuote} disabled={isLoading}>
                    {isLoading ? "Accepting..." : "Accept Quote"}
                  </button>

                    <button className="dec-qqut" onClick={() => navigate(-1)}>Decline Quote</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPaymentOptions && (
        <div className="qquqps-drops">
          <div className="site-container">
            <div className="qquqps-Box">
              <span className="Close-qquqps-Box" onClick={() => setShowPaymentOptions(false)}><CloseIcon /></span>
              <div className="hga-seds" style={{ display: showArtisanDetails ? 'none' : 'block' }}>
                <div className="qquqps-Cont exctip-pay">
                  {/* <h3>PAY VIA ESCROW</h3> */}
                   <PaystackButton {...componentProps} />
                  <p>Escrow holds your payment, as soon as the artisan completes their job, the payment is made to the artisan</p>
                </div>

                <div className="qquqps-Cont" onClick={handleShowArtisanDetails}>
                  <h3>PAY DIRECTLY TO ARTISAN</h3>
                  <p>You can pay the artisan directly for their services. This ensures a fast, secure transaction while supporting their work without intermediaries.</p>
                </div>
              </div>

              {showArtisanDetails && payoutDetails && (
                <div className="bbann-dltss">
                  <h3>Artisan Account details</h3>
                  <ul>
                    <li><p>Bank Name</p><span>{payoutDetails.bank_name}</span></li>
                    <li><p>Account Number</p><span>{payoutDetails.account_number}</span></li>
                    <li><p>Account Name</p><span>{payoutDetails.account_name}</span></li>
                    <li><p>Account Type</p><span>{payoutDetails.account_type}</span></li>
                  </ul>
                  <div className="bbann-dltss-btns">
                    {/* <button className="bba-btn1">I have Completed Payment</button> */}

                    <button className="bba-btn1" onClick={handleAcceptQuoteViaArtisan} disabled={isLoading}>
                    {isLoading ? "Recording Response..." : "I have Completed Payment"}
                  </button>

                    <button className="bba-btn2" onClick={() => setShowArtisanDetails(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewQuote;
