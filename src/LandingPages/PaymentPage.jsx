import React from 'react';
import { Link } from 'react-router-dom';
import CheckIcon from "@mui/icons-material/Check";

const PaymentPage = () => {
  return (
    <div className='Arrri-Pahgs'>
        <div className='large-container'>
          <div className='Arrri-Pahgs-main Succ-Sec'>

            <div className="paymend-Seecc">
            <div className="paymend-Seecc-1">
                <h1 className='big-text'>Basic</h1>
                <h3>₦5,000 <span>/per month</span></h3>
                <p>1st month Promo <span>₦2,500</span></p>
                <div className='pay-seclt'>
                    <label>Select Payment method</label>
                    <div className='pay-seclt-btn'>
                    <button>Fluter wave</button>
                    <button>Pay stack</button>
                    <button>Remita</button>
                    </div>
                    
                </div>
                </div>
                <div className="paymend-Seecc-2">
                <h4>Feature</h4>
                <ul>
            <li><CheckIcon />  Individuals or small artisans just starting out	</li>
            <li><CheckIcon />  Lower monthly fee	</li>
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

            </div>
            </div>
        
          </div>
        </div>
    </div>
  );
};

export default PaymentPage;
