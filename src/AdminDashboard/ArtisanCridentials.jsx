import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../LandingPages/Css/Main.css";

const ArtisanCredentials = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const artisanDatum = location.state?.artisanDatum || {};

  console.log("artisanDatum", artisanDatum);

  // Base URL for media files
  // const baseUrl = "http://127.0.0.1:9090/media/";
  const baseUrl = `${djangoHostname}/media/`;

  // Function to resolve URLs
  const resolveUrl = (url) => {
    if (url.startsWith("http")) {
      return url; // Already an absolute URL
    }
    return `${baseUrl}${url}`; // Prepend base URL for relative paths
  };

  // Map credentials to their types and resolved URLs
  const credentialTypes = [
    { type: "Proof of Address", url: artisanDatum.proof_of_address },
    { type: "Driver's Licence", url: artisanDatum.driver_licence },
    { type: "International Passport", url: artisanDatum.international_passport },
    { type: "Other Document", url: artisanDatum.other_doc },
    ...(artisanDatum.qualifications?.map((url) => ({
      type: "Qualification",
      url,
    })) || []),
  ].filter((credential) => credential.url); // Filter out null or undefined values

  // Resolve URLs and add meaningful names
  const availableCredentials = credentialTypes.map((credential) => ({
    ...credential,
    url: resolveUrl(credential.url),
  }));

  const [credentialList, setCredentialList] = useState(availableCredentials);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [downloadableCredentials, setDownloadableCredentials] = useState([]);

  // Remove credential and add it to downloadable list
  const removeCredential = (index) => {
    const removedCredential = credentialList[index];
    setCredentialList(credentialList.filter((_, i) => i !== index));
    setDownloadableCredentials([...downloadableCredentials, removedCredential]);
  };

  // Download image
  const downloadImage = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop(); // Use the last part of the URL as the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="Gen_Admin_BBD">
      <div className="top-sec-main Gen_Admin_Header">
        <h3>
          Artisan Credentials - {artisanDatum.user?.first_name}{" "}
          {artisanDatum.user?.last_name}
        </h3>
      </div>

      <div className="tran-card">
        <div className="credentials-container">
          {credentialList.length === 0 && downloadableCredentials.length === 0 ? (
            <p className="no-credentials">No credentials uploaded.</p>
          ) : (
            <div className="credentials-list">
              {/* Render active credentials */}
              {credentialList.map((credential, index) => (
                <div key={index} className="credential-item">
                  <img
                    src={encodeURI(credential.url)} // Encode URL to handle spaces/special characters
                    alt={`${credential.type} ${index + 1}`}
                    className="credential-image"
                  />
                  <div className="credential-actions">
                    <p className="credential-type">{credential.type}</p>
                    <button
                      onClick={() => setSelectedCredential(credential.url)}
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

              {/* Render downloadable credentials */}
              {downloadableCredentials.map((credential, index) => (
                <div key={index} className="credential-item">
                  <img
                    src={encodeURI(credential.url)} // Encode URL to handle spaces/special characters
                    alt={`Downloadable ${credential.type} ${index + 1}`}
                    className="credential-image"
                  />
                  <div className="credential-actions">
                    <p className="credential-type">{credential.type}</p>
                    <button
                      onClick={() => downloadImage(credential.url)}
                      className="download-btn"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* {selectedCredential && (
            <div className="modal">
              <div className="modal-content">
                <img
                  src={encodeURI(selectedCredential)} // Encode URL to handle spaces/special characters
                  alt="Credential Full View"
                  className="modal-image"
                />
                <div className="modal-actions">
                  <button
                    onClick={() => downloadImage(selectedCredential)}
                    className="download-btn"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setSelectedCredential(null)}
                    className="close-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )} */}
          {selectedCredential && (
            <div className="modal">
              <div className="modal-content">
                <img
                  src={encodeURI(selectedCredential)} // Encode URL to handle spaces/special characters
                  alt="Credential Full View"
                  className="modal-image"
                />
                <div className="modal-actions">
                  <button
                    onClick={() => downloadImage(selectedCredential)}
                    className="download-btn"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setSelectedCredential(null)}
                    className="close-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanCredentials;