import React, { useState } from "react";
import "../LandingPages/Css/Main.css";

import Cridential1 from './Img/staffs/1.jpg';
import Cridential2 from './Img/staffs/2.jpg';
import Cridential3 from './Img/staffs/3.jpg';
import Cridential4 from './Img/staffs/4.png';
import Cridential5 from './Img/staffs/5.jpg';

const ArtisanCredentials = () => {
  const initialCredentials = [
    Cridential1,
    Cridential2,
    Cridential3,
    Cridential4,
    Cridential5
  ];

  const [credentialList, setCredentialList] = useState(initialCredentials);
  const [selectedCredential, setSelectedCredential] = useState(null);

  const removeCredential = (index) => {
    setCredentialList(credentialList.filter((_, i) => i !== index));
  };

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>Artisan Credentials - Prince Godson</h3>
      </div>

      <div className="tran-card">
        <div className="credentials-container">
          {credentialList.length === 0 ? (
            <p className="no-credentials">No credentials uploaded.</p>
          ) : (
            <div className="credentials-list">
              {credentialList.map((credential, index) => (
                <div key={index} className="credential-item">
                  <img
                    src={credential}
                    alt={`Credential ${index + 1}`}
                    className="credential-image"
                  />
                  <div className="credential-actions">
                    <button
                      onClick={() => setSelectedCredential(credential)}
                      className="view-btn"
                    >
                      View
                    </button>
                    <button
                      onClick={() => removeCredential(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedCredential && (
            <div className="modal">
              <div className="modal-content">
                <img
                  src={selectedCredential}
                  alt="Credential Full View"
                  className="modal-image"
                />
                <button
                  onClick={() => setSelectedCredential(null)}
                  className="close-btn"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanCredentials;
