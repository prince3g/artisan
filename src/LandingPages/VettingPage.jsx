import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const VettingPage = () => {
  const [flash, setFlash] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const navigate = useNavigate();
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [ninDoc, setNinDoc] = useState(null);
  const [otherDoc, setOtherDoc] = useState(null);
  const [docType, setDocType] = useState("NIN");
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const unique_user_id = sessionStorage.getItem("unique_user_id");
    if (!unique_user_id) {
      showMessage("User ID not found. Please log in again.", "failure");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    if (proofOfAddress) formData.append("proof_of_address", proofOfAddress);
    if (ninDoc) formData.append("NIN_doc", ninDoc);
    if (otherDoc) formData.append("other_doc", otherDoc);

    try {
      const response = await fetch(
        `${djangoHostname}/api/accounts/auth/api/user/${unique_user_id}/update/`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update documents");
      }

      showMessage("Documents updated successfully!", "success"); 
      navigate("/pending-approval");
    } catch (error) {
      console.error("Error updating documents:", error);
      showMessage(`Error updating documents. Please try again. ${error}`, "failure"); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Gradnded-page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header">
              <h2 className="big-text">Artisan Vetting</h2>
            </div>

            {flash && (
              <FlashMessage
                message={flash.message}
                type={flash.type}
                onClose={() => setFlash(null)}
              />
            )}

            <form onSubmit={handleSubmit} className="Gradnded-Box-Body filska">
              <div className="Gland-Quest">
                <div className="Gland-Quest-data">
                  <label>Proof of Address</label>
                  <input type="file" onChange={(e) => handleFileChange(e, setProofOfAddress)} />
                </div>

                <div className="Gland-Quest-data">
                  <label>Proof of Identity</label>
                  <select onChange={(e) => setDocType(e.target.value)}>
                    <option value="NIN">NIN</option>
                    <option value="Others">Others</option>
                  </select>
                  <input
                    type="file"
                    onChange={(e) =>
                      docType === "NIN" ? handleFileChange(e, setNinDoc) : handleFileChange(e, setOtherDoc)
                    }
                  />
                </div>

                <div className="Consit-sec">
                  <input type="checkbox" required />
                  <p>
                    By clicking this box, you agree to SimserviceHub's{" "}
                    <a href="/privacy-policy">Data & Privacy Policy</a>,{" "}
                    <a href="/INFORMED-CONSENT-FORM.pdf" target="_blank" rel="noopener noreferrer">
                      Informed Consent Form
                    </a>
                    , and <a href="/contract-agreement">Contract Agreement</a>.
                  </p>
                </div>

                <div className="Gland-Cnt-Btn">
                  <button type="submit" className="post-job-btn" disabled={isLoading}>
                    {isLoading ? "Uploading ..." : "Continue"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VettingPage;
