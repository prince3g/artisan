// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate} from "react-router-dom";
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import CloseIcon from '@mui/icons-material/Close';
// import './Userdashbaord.css';

// const ViewQuote = () => {

//   const [showPaymentOptions, setShowPaymentOptions] = useState(false);
//   const [showArtisanDetails, setShowArtisanDetails] = useState(false);
//   const navigate = useNavigate();

//   const [bid_amount, setBid_amount] = useState("");
//   const [job_duration, setJob_duration] = useState("");

  

//     const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
//     const location = useLocation();
//     const artisan = location.state || {};  
 
//     console.log("artisan")
//     console.log(artisan.artisan.quote.unique_id)
//     console.log("artisan")

//     useEffect(() => {
//       if (artisan.artisan?.quote) {
//         setBid_amount(artisan.artisan.quote.bid_amount);
//         setJob_duration(artisan.artisan.quote.job_duration);
//       }
//     }, [artisan]); // Ensure this only runs when artisan changes
  
//   const handleAcceptQuote = () => {
//     setShowPaymentOptions(true);
//     setShowArtisanDetails(false);
//   };

//   const handleClosePaymentOptions = () => {
//     setShowPaymentOptions(false);
//     setShowArtisanDetails(false);
//   };

//   const handleShowArtisanDetails = () => {
//     setShowArtisanDetails(true);
//   };

//   const handleCancelArtisanDetails = () => {
//     setShowArtisanDetails(false);
//   };


//   const handleDeclineQuote = () => {
//     navigate(-1);
//   };



//   return (
//     <div className="ooUserdashbaord-Page">
//       <div className="navigating-ttarvs">
//         <div className="site-container">
//           <p>
//             <Link to="/">Simservicehub</Link> <ChevronRightIcon />
//             <Link to="/user-dashboard/"> Customer dashboard</Link> <ChevronRightIcon />
//             <Link to="/user-dashboard/jobs">Posted Jobs </Link> <ChevronRightIcon />
//             <Link to="/user-dashboard/jobs">Electrical </Link> <ChevronRightIcon />
//             <Link to="/user-dashboard/job-artisans">Artisans </Link> <ChevronRightIcon />
//             <Link to="/user-dashboard/view-quote">Request Quote </Link>
//           </p>
//         </div>
//       </div>

//       <div className="site-container">
//         <div className="Gradnded-main user-quote">
//           <div className="Gradnded-Box">
//             <div className="Gradnded-Box-header">
//               <h2 className="big-text">Request Quote</h2>
//             </div>

//             <div className="Habgb-sec">
//               <div className="My-Artisan-Body">
//                 <div className='garoo-Gird-part2'>
//                   <div className="hggah-req">
//                     <div className="hggah-req-1">
//                       <h3>Bid</h3>
//                       <p>The total Amount the Artisan is Bidding for this Job</p>
//                     </div>
//                     <div className="hggah-req-2">
//                       <h3>NGN</h3>
//                       <input type="text" value={bid_amount} readOnly />
//                     </div>
//                   </div>

//                   <div className="hggah-req">
//                     <div className="hggah-req-1">
//                       <h3>Duration</h3>
//                       <p>How long it will take to complete the Job</p>
//                     </div>
//                     <div className="hggah-req-2">
//                     <input type="text" value={job_duration} readOnly />
//                     </div>
//                   </div>

//                   <div className="aaggs-sec-btns">
//                     <button className="accpt-qqut" onClick={handleAcceptQuote}>Accept Quote</button>
//                    <button className="dec-qqut" onClick={handleDeclineQuote}>Decline Quote</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showPaymentOptions && (
//         <div className="qquqps-drops">
//           <div className="site-container">
//             <div className="qquqps-Box">
//               <span className="Close-qquqps-Box" onClick={handleClosePaymentOptions}><CloseIcon /></span>
//               <div className="hga-seds" style={{ display: showArtisanDetails ? 'none' : 'block' }}>
//                 <div className="qquqps-Cont exctip-pay">
//                   <h3>PAY VIA ESCROW</h3>
//                   <p>Escrow holds your payment, as soon as the artisan completes their job, the payment is made to the artisan</p>
//                 </div>

//                 <div className="qquqps-Cont" onClick={handleShowArtisanDetails}>
//                   <h3>PAY DIRECTLY TO ARTISAN</h3>
//                   <p>You can pay the artisan directly for their services. This ensures a fast, secure transaction while supporting their work without intermediaries.</p>
//                 </div>
//               </div>

//               {showArtisanDetails && (
//                 <div className="bbann-dltss">
//                   <h3>Artisan Account details</h3>
//                   <ul>
//                     <li><p>Bank Name</p><span>First Bank</span></li>
//                     <li><p>Account Number</p><span>3103583959</span></li>
//                     <li><p>Account Name</p><span>Ndubuisi Prince Godson</span></li>
//                     <li><p>Account Type</p><span>Savings</span></li>
//                   </ul>
//                   <div className="bbann-dltss-btns">
//                     <button className="bba-btn1">Complete Payment</button>
//                     <button className="bba-btn2" onClick={handleCancelArtisanDetails}>Cancel</button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewQuote;
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'; // Import axios for making HTTP requests
import './Userdashbaord.css';
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const ViewQuote = () => {

  const [flash, setFlash] = useState(null);    
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showArtisanDetails, setShowArtisanDetails] = useState(false);
  const navigate = useNavigate();

  const [bid_amount, setBid_amount] = useState("");
  const [job_duration, setJob_duration] = useState("");

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const artisan = location.state || {};

  //console.log("artisan", artisan);

  useEffect(() => {
    if (artisan.artisan?.quote) {
      setBid_amount(artisan.artisan.quote.bid_amount);
      setJob_duration(artisan.artisan.quote.job_duration);
    }
  }, [artisan]);

  const handleAcceptQuote = async () => {
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
  
        showMessage(errorMessage, "error");
  
        if (errorMessage === "This quote has already been accepted") {
          setShowPaymentOptions(true);
          setShowArtisanDetails(false);
        }
        
        console.log(errorMessage);
      } else {
        showMessage("An error occurred while accepting the quote", "error");
      }
      console.error("Error accepting quote:", error);
    }
  };
  
  const handleClosePaymentOptions = () => {
    setShowPaymentOptions(false);
    setShowArtisanDetails(false);
  };

  const handleShowArtisanDetails = () => {
    setShowArtisanDetails(true);
  };

  const handleCancelArtisanDetails = () => {
    setShowArtisanDetails(false);
  };

  const handleDeclineQuote = () => {
    navigate(-1);
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
            {flash && (
            <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash(null)}
            />
            )}
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
                    <button className="accpt-qqut" onClick={handleAcceptQuote}>Accept Quote</button>
                    <button className="dec-qqut" onClick={handleDeclineQuote}>Decline Quote</button>
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
              <span className="Close-qquqps-Box" onClick={handleClosePaymentOptions}><CloseIcon /></span>
              <div className="hga-seds" style={{ display: showArtisanDetails ? 'none' : 'block' }}>
                <div className="qquqps-Cont exctip-pay">
                  <h3>PAY VIA ESCROW</h3>
                  <p>Escrow holds your payment, as soon as the artisan completes their job, the payment is made to the artisan</p>
                </div>

                <div className="qquqps-Cont" onClick={handleShowArtisanDetails}>
                  <h3>PAY DIRECTLY TO ARTISAN</h3>
                  <p>You can pay the artisan directly for their services. This ensures a fast, secure transaction while supporting their work without intermediaries.</p>
                </div>
              </div>

              {showArtisanDetails && (
                <div className="bbann-dltss">
                  <h3>Artisan Account details</h3>
                  <ul>
                    <li><p>Bank Name</p><span>First Bank</span></li>
                    <li><p>Account Number</p><span>3103583959</span></li>
                    <li><p>Account Name</p><span>Ndubuisi Prince Godson</span></li>
                    <li><p>Account Type</p><span>Savings</span></li>
                  </ul>
                  <div className="bbann-dltss-btns">
                    <button className="bba-btn1">Complete Payment</button>
                    <button className="bba-btn2" onClick={handleCancelArtisanDetails}>Cancel</button>
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