import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "../LandingPages/Css/Main.css";

const ArtisanCredentials = () => {
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const location = useLocation();
  const artisanDatum = location.state?.artisanDatum || {};

  // Base URL for media files
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
  const [loadingDownload, setLoadingDownload] = useState(false); // Loading state for download

  // Remove credential and add it to downloadable list
  const removeCredential = (index) => {
    const removedCredential = credentialList[index];
    setCredentialList(credentialList.filter((_, i) => i !== index));
    setDownloadableCredentials([...downloadableCredentials, removedCredential]);
  };

  // Download logic
  const handleDownloadReceipt = async (receiptUrl, name) => {
    setLoadingDownload(true); // Start loader for download state

    try {
      const response = await axios.get(receiptUrl, {
        responseType: "blob", // Ensure response is treated as a Blob
      });

      // Fallback if Content-Type is not provided
      const contentType = response.data.type || "application/octet-stream";
      const blob = new Blob([response.data], { type: contentType });

      // Create URL for the Blob
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = name; // Set the file name

      // Append link to the document and initiate download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and link element
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);

      // Show success message (you can replace this with your own notification system)
      console.log("Your Certificate is downloading");
    } catch (error) {
      console.error("Error downloading receipt:", error);
      // Show error message (you can replace this with your own notification system)
      console.error("An error occurred during the download. Please try again.");
    } finally {
      setLoadingDownload(false); // Stop loader
    }
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
                      onClick={() =>
                        handleDownloadReceipt(
                          credential.url,
                          credential.type + ".jpg" // Set a meaningful filename
                        )
                      }
                      className="download-btn"
                      disabled={loadingDownload} // Disable button during download
                    >
                      {loadingDownload ? "Downloading..." : "Download"}
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
                  src={encodeURI(selectedCredential)} // Encode URL to handle spaces/special characters
                  alt="Credential Full View"
                  className="modal-image"
                />
                <div className="modal-actions">
                  <button
                    onClick={() =>
                      handleDownloadReceipt(
                        selectedCredential,
                        "credential.jpg" // Set a meaningful filename
                      )
                    }
                    className="download-btn"
                    disabled={loadingDownload} // Disable button during download
                  >
                    {loadingDownload ? "Downloading..." : "Download"}
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