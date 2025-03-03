import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FlashMessage from "../FlashMessage/FlashMessage.jsx";


const EditSubscriptionPlan = () => {

  const [flash, setFlash] = useState(null);    
  const showMessage = (message, type) => {
    setFlash({ message, type });
  };
  const location = useLocation();
  const navigate = useNavigate();
  const djangoHostname = import.meta.env.VITE_DJANGO_HOSTNAME;

  // Get the passed plan data from location.state
  const plan = location.state?.plan;

//  console.log("plan")
//  console.log(plan.unique_id)
//  console.log("plan")

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [features, setFeatures] = useState([]);
  const [keyBenefits, setKeyBenefits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (plan) {
      setName(plan.name || "");
      setPrice(plan.price || "");
      setPromoPrice(plan.promo_price || "");
      setFeatures(plan.features || [""]);
      setKeyBenefits(plan.key_benefits || [""]);
    }
  }, [plan]);

  // Add & Remove Features
  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index) => {
    if (features.length > 1) setFeatures(features.filter((_, i) => i !== index));
  };
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Add & Remove Key Benefits
  const addBenefit = () => setKeyBenefits([...keyBenefits, ""]);
  const removeBenefit = (index) => {
    if (keyBenefits.length > 1) setKeyBenefits(keyBenefits.filter((_, i) => i !== index));
  };
  const handleBenefitChange = (index, value) => {
    const newBenefits = [...keyBenefits];
    newBenefits[index] = value;
    setKeyBenefits(newBenefits);
  };

  const handleSubmit = async (e) => {

    alert("READY")
    console.log("READY")

    e.preventDefault();
    setLoading(true);
    setErrors({});

    const updatedPlan = {
      name,
      price,
      promo_price: promoPrice,
      features,
      key_benefits: keyBenefits,
    };

    try {
      const response = await fetch(`${djangoHostname}/api/auth/subscriptions/api/subscriptions/${plan.id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPlan),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("API Error Response:", responseData);
        setErrors(responseData);
        return;
      }

      //alert("Subscription plan updated successfully!");
      showMessage("Subscription plan updated successfully!", "success");
      //navigate("/admin/subscriptions"); // Redirect back to subscription list
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No plan selected for editing.</p>;
  }

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
        <form className="tran-card-tableSec PPtran-card-tableSec">
          <div className="top-sec-main Gen_Admin_Header">
            <h3>Edit Subscription ({name})</h3>
          </div>

          <div className="Gland-Quest-data">
            <label>Title</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            {errors.name && <p className="error-text">{errors.name[0]}</p>}
          </div>

          <div className="Gland-Quest-data">
            <label>Plan Amount (/per month)</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            {errors.price && <p className="error-text">{errors.price[0]}</p>}
          </div>

          <div className="Gland-Quest-data">
            <label>Promo Amount (1st month)</label>
            <input type="text" value={promoPrice} onChange={(e) => setPromoPrice(e.target.value)} required />
          </div>

          {/* Plan Features Section */}
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
                  <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} required />
                  {features.length > 1 && (
                    <span onClick={() => removeFeature(index)} style={{ cursor: "pointer" }} className="remove-inputt-span">
                      <RemoveIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Benefits Section */}
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
                  <input type="text" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} required />
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
            <button type="submit" className="post-job-btn" disabled={loading} onClick={handleSubmit}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionPlan;
