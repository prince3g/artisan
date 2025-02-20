import React from 'react';
import { Link } from 'react-router-dom';

import CheckIcon from "@mui/icons-material/Check";

const handleBackClick = () => {
  navigate(-1);
};


const SubscriptionPage = () => {

    // Data array with features for the table
    // const data = [
    //   { feature: "Ideal For", basic: "Individuals or small artisans just starting out", standard: "Growing artisans or small businesses needing more functionality", standardPlus: "Established businesses requiring advanced features & dedicated support" },
    //   { feature: "Pricing", basic: "Lower monthly fee", standard: "Moderate monthly fee", standardPlus: "Higher monthly fee" },
    //   { feature: "Job Submissions", basic: "Up to 20 job quotes every month to secure new projects and grow your client base.", standard: "Up to 40 job quotes every month to increase your chances of landing quality jobs.", standardPlus: "Unlimited job submissions every month, allowing you to take on as many projects as you can handle." },
    //   { feature: "Payment Gateways", basic: "Single payment gateway", standard: "Multiple payment gateways", standardPlus: "Multiple gateways + advanced payment options (recurring debit)" },
    //   { feature: "Marketing Tools", basic: "Limited to social media integration", standard: "Includes email marketing & promotional campaigns", standardPlus: "Comprehensive marketing suite" },
    //   { feature: "Customer Support", basic: "Email support on weekdays", standard: "Email + live chat support (extended hours)", standardPlus: "Priority support (phone, email, live chat, and dedicated account manager)" },
    //   { feature: "Onboarding & Training", basic: "Self-guided setup resources (tutorials/documentation)", standard: "Assisted setup (live sessions for initial configuration)", standardPlus: "Comprehensive onboarding + tailored training for your team" },
    //   { feature: "Scalability & Future Growth", basic: "Best for small-scale operations", standard: "Room to grow with added features and resources", standardPlus: "Seamless scaling to larger product lines, higher traffic, and expanding teams" },
    //   { feature: "Overall Cost-Benefit", basic: "Most budget-friendly option - Ideal for testing new ideas", standard: "Solid balance of price and functionality - Good for steady growth", standardPlus: "Highest ROI for advanced needs - Suitable for established or rapidly expanding businesses" },
    // ];


  return (
    <div className='subscript-pgg'>
      <div className='AA-page-header'>
        <div className='large-container'>
            <div className="hero-dlts-main">
                <h2 className="big-text">
                Simservice Hub Subscription Plans 
                </h2>

                </div>
            </div>

    </div>

    <div className='subb-boxes-sec'>
      <div className='large-container'>
      <div className='subb-boxes-Grid'>

        <div className='subb-box'>
          <h2>Basic</h2>
          <h3>₦5,000 <span>/per month</span> <br></br> <span>1st month Promo ₦2,500 </span></h3>

          <ul>
            <li><CheckIcon />  Individuals or small artisans just starting out	</li>
            <li><CheckIcon />  Up to 20 job quotes every month to secure new projects and grow your client base.	</li>
            <li><CheckIcon />  Single payment gateway</li>
            <li><CheckIcon />  Limited to social media integration</li>
            <li><CheckIcon />  Email support on weekdays</li>
            <li><CheckIcon />  Self-guided setup resources (tutorials/documentation)</li>
            <li><CheckIcon />  Best for small-scale operations</li>
            <li><CheckIcon />  Most budget-friendly option - Ideal for testing new ideas</li>
          </ul>

        <h4>Key Benefits</h4>
          <ol>
            <li>Cost-effective solution for solo artisans or those experimenting with online sales</li>
            <li>Quick to set up with minimal complexity</li>
            <li>Access to essential features without a large investment</li>
          </ol>

          <Link to="/payment" className='Fin-subbnna-btn'>Subscribe</Link>
        </div>

        <div className='subb-box'>
          <h2>Standard</h2>
          <h3>₦10,000 <span>/per month</span> <br></br> <span>1st month Promo ₦5,000 </span></h3>

          <ul>
            <li><CheckIcon />  Growing artisans or small businesses needing more functionality</li>
            <li><CheckIcon />  Up to 40 job quotes every month to increase your chances of landing quality jobs.</li>
            <li><CheckIcon />  Multiple payment gateways</li>
            <li><CheckIcon />  Includes email marketing & promotional campaigns</li>
            <li><CheckIcon />  Email + live chat support (extended hours)</li>
            <li><CheckIcon />  Assisted setup (live sessions for initial configuration)</li>
            <li><CheckIcon />  Room to grow with added features and resources</li>
            <li><CheckIcon />  Solid balance of price and functionality - Good for steady growth</li>
          </ul>

          <h4>Key Benefits</h4>
          <ol>
            <li>Balanced feature set for small-to-medium artisan businesses looking to grow</li>
            <li>Multiple payment options and deeper analytics to scale your operations</li>
            <li>Enough customization to reflect your brand’s unique identity</li>
          </ol>

         <Link to="/payment" className='Fin-subbnna-btn'>Subscribe</Link>
        </div>


        <div className='subb-box'>
          <h2>Standard Plus </h2>
          <h3>₦15,000 <span>/per month</span> <br></br> <span>1st month Promo ₦7,000 </span></h3>


          <ul>
            <li><CheckIcon />  Established businesses requiring advanced features & dedicated support</li>
            <li><CheckIcon />  Unlimited job submissions every month, allowing you to take on as many projects as you can handle.</li>
            <li><CheckIcon />  Multiple gateways + advanced payment options (recurring debit)</li>
            <li><CheckIcon />  Comprehensive marketing suite</li>
            <li><CheckIcon />  Priority support (phone, email, live chat, and dedicated account manager)</li>
            <li><CheckIcon />  Comprehensive onboarding + tailored training for your team</li>
            <li><CheckIcon />  Seamless scaling to larger product lines, higher traffic, and expanding teams</li>
            <li><CheckIcon />  Highest ROI for advanced needs - Suitable for established or rapidly expanding businesses</li>
          </ul>


          <h4>Key Benefits</h4>
          <ol>
            <li> Enterprise-level tools and dedicated, priority support for seamless operations</li>
            <li> Full design freedom, advanced security, and comprehensive analytics</li>
            <li> Ideal for established businesses needing robust performance and specialized features</li>
          </ol>

         <Link to="/payment" className='Fin-subbnna-btn'>Subscribe</Link>
        </div>



      </div>

      <div className="Gland-Cnt-Btn ujh-btns">
                <button type="button" className="back-btn" onClick={handleBackClick}>
                  Back
                </button>
                <Link to="/pending-approval">
                  Next
                </Link>
              </div>

      {/* <div className='compriss-sec'>
      <div className='compriss-header'>
        <h2>Comparison Summary Table (With Restrictions)</h2>
      </div>
      <div className="compriss-table">
      <table>
        <thead>
          <tr>
            <th>Features</th>
            <th>Basic</th>
            <th>Standard</th>
            <th>Standard Plus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.feature}</td>
              <td>{row.basic}</td>
              <td>{row.standard}</td>
              <td>{row.standardPlus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div> */}
      


      </div>
    </div>

    </div>
  );
};

export default SubscriptionPage;
