import React, { useState } from "react";
import "../LandingPages/Css/Main.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";

const AddSubscription = () => {

const [flash, setFlash] = useState(null);    
const showMessage = (message, type) => {
  setFlash({ message, type });
};
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  const [errors, setErrors] = useState({});
  const [features, setFeatures] = useState([""]);
  const [keyBenefits, setKeyBenefits] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index) => {
    if (features.length > 1) setFeatures(features.filter((_, i) => i !== index));
  };

  const addBenefit = () => setKeyBenefits([...keyBenefits, ""]);
  const removeBenefit = (index) => {
    if (keyBenefits.length > 1) setKeyBenefits(keyBenefits.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...keyBenefits];
    newBenefits[index] = value;
    setKeyBenefits(newBenefits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("title"),
      price: formData.get("amount"),
      promo_price: formData.get("promoAmount"),
      features,
      key_benefits: keyBenefits, // Sending correctly named key
    };

    try {
      const response = await fetch(`${djangoHostname}/api/auth/subscriptions/api/subscriptions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", responseData);
        setErrors(responseData);
        console.log("responseData");
        console.log(responseData);
        console.log("responseData");
        return;
      }

      //alert("Subscription plan created successfully!");
      showMessage("Subscription plan created successfully!!", "success");
      e.target.reset();
      setFeatures([""]);
      setKeyBenefits([""]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Gen_Admin_BBD">
      <div className="tran-card">
      {flash && (
        <FlashMessage
            message={flash.message}
            type={flash.type}
            onClose={() => setFlash(null)}
        />
        )}
        <form className="tran-card-tableSec" onSubmit={handleSubmit}>
        {/* <form className="tran-card-tableSec PPtran-card-tableSec"> */}
          <div className="top-sec-main Gen_Admin_Header">
            <h3>Add Subscription Plan</h3>
          </div>

          <div className="Gland-Quest-data">
            <label>Title</label>
            <input type="text" name="title" placeholder="Enter plan title" required />
            {errors.name && <p className="error-text">{errors.name[0]}</p>}
          </div>

          <div className="Gland-Quest-data">
            <label>Plan Amount (/per month)</label>
            <input type="text" name="amount" placeholder="Enter plan amount" required />
            {errors.price && <p className="error-text">{errors.price[0]}</p>}
          </div>

          <div className="Gland-Quest-data">
            <label>Promo Amount (1st month)</label>
            <input type="text" name="promoAmount" placeholder="Enter promo amount" required />
          </div>

          <div className="cccrs-secs">
            <div className="Gland-Quest-data">
              <div className="cccrs-secs-header">
                <label>Plan Features</label>
                <span onClick={addFeature} style={{ cursor: "pointer" }}>
                  <AddIcon /> Add feature
                </span>
              </div>
              {features.map((feature, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    placeholder="Enter plan feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    required
                  />
                  {features.length > 1 && (
                    <span onClick={() => removeFeature(index)} style={{ cursor: "pointer" }} className="remove-inputt-span">
                      <RemoveIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>


          <div className="cccrs-secs">
            <div className="Gland-Quest-data">
              <div className="cccrs-secs-header">
                <label>Key Benefits</label>
                <span onClick={addBenefit} style={{ cursor: "pointer" }}>
                  <AddIcon /> Add benefit
                </span>
              </div>
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    placeholder="Enter benefit"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                    required
                  />
                  {keyBenefits.length > 1 && (
                    <span onClick={() => removeBenefit(index)} style={{ cursor: "pointer" }} className="remove-inputt-span">
                      <RemoveIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="Gland-Cnt-Btn">
            <button type="submit" className="post-job-btn" disabled={loading}>
              {loading ? "Creating..." : "Add Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
