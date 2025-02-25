import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const CustomerNotice = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="qquqps-drops">
        <div className="site-container">
          <div className="qquqps-Box">
            <span
              className="Close-qquqps-Box"
              onClick={() => setIsVisible(false)} // Hide the notice when clicked
              style={{ cursor: "pointer" }} // Add cursor pointer for better UX
            >
              <CloseIcon />
            </span>
            <div className="hga-seds">
              <div className="qquqps-Cont hhaaa">
                <h3>NOTICE</h3>
                <p>
                  The company will not be held liable if they interact/transact
                  with an artisan outside the webapp. It is the responsibility
                  of the customer to ensure their safety when interacting with
                  an artisan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CustomerNotice;
