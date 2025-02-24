import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../LandingPages/Css/Main.css";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const ArtisanPayout = () => {
  const [flash, setFlash] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Track loading state for fetching

  const showMessage = (message, type) => {
    setFlash({ message, type });
  };

  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;
  const artisanId = sessionStorage.getItem("unique_user_id");

  const [formData, setFormData] = useState({
    artisan: artisanId,
    bank_name: "",
    account_number: "",
    account_name: "",
    account_type: "savings",
  });

  // Fetch payout details on component mount
  useEffect(() => {
    const fetchPayoutDetails = async () => {
      try {
        const response = await fetch(`${djangoHostname}/api/auth/payouts/payouts/${artisanId}/`);
        if (!response.ok) throw new Error("Failed to fetch payout details");

        const data = await response.json();
        setFormData({
          artisan: artisanId,
          bank_name: data.bank_name || "",
          account_number: data.account_number || "",
          account_name: data.account_name || "",
          account_type: data.account_type || "savings",
        });
      } catch (error) {
        console.error("Error fetching payout details:", error);
        showMessage("Unable to fetch payout details.", "failure");
      } finally {
        setIsFetching(false);
      }
    };

    if (artisanId) {
      fetchPayoutDetails();
    } else {
      setIsFetching(false);
    }
  }, [djangoHostname, artisanId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${djangoHostname}/api/auth/payouts/payouts/${artisanId}/`, {
        method: "PATCH", // Use PATCH to update existing data
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Payout details saved successfully!", "success");
      } else {
        if (data.errors) {
          setErrors(data.errors); // Set errors for specific fields
        } else {
          showMessage("Failed to save payout details.", "failure");
        }
      }
    } catch (error) {
      showMessage("An error occurred. Please try again.", "failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Gradnded-page">
      <div className="site-container">
        <div className="Gradnded-main">
          <div className="Gradnded-Box Shirolls_Box">
            <div className="Gradnded-Box-header uupoa">
              {flash && (
                <FlashMessage message={flash.message} type={flash.type} onClose={() => setFlash(null)} />
              )}
              <h2 className="big-text">Payout Settings</h2>
              <p>Enter your bank details here</p>
              <p><Link to="/artisan-dashboard/">Go back</Link></p>
            </div>

            <div className="Gradnded-Box-Body">
              {isFetching ? (
                <p>Loading payout details...</p>
              ) : (
                <form className="Gland-Quest" onSubmit={handleSubmit}>
                  <div className="Gland-Quest-data">
                    <label>Bank Name</label>
                    <input type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} required />
                    {errors.bank_name && <p className="error-message">{errors.bank_name}</p>}
                  </div>

                  <div className="Gland-Quest-data">
                    <label>Account Number</label>
                    <input type="text" name="account_number" value={formData.account_number} onChange={handleChange} required />
                    {errors.account_number && <p className="error-message">{errors.account_number}</p>}
                  </div>

                  <div className="Gland-Quest-data">
                    <label>Account Name</label>
                    <input type="text" name="account_name" value={formData.account_name} onChange={handleChange} required />
                    {errors.account_name && <p className="error-message">{errors.account_name}</p>}
                  </div>

                  <div className="Gland-Quest-data">
                    <label>Account Type</label>
                    <select name="account_type" value={formData.account_type} onChange={handleChange}>
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                    </select>
                  </div>

                  <div className="Gland-Cnt-Btn">
                    <button type="submit" className="post-job-btn" disabled={loading}>
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanPayout;
