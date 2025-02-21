import React, { useState } from "react";
import "../LandingPages/Css/Main.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AddSubscription = () => {
  const [features, setFeatures] = useState([""]);
  const [benefits, setBenefits] = useState([""]);

  // Function to add more feature inputs
  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  // Function to remove a feature input
  const removeFeature = (index) => {
    if (features.length > 1) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
    }
  };

  // Function to add more benefit inputs
  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  // Function to remove a benefit input
  const removeBenefit = (index) => {
    if (benefits.length > 1) {
      const newBenefits = benefits.filter((_, i) => i !== index);
      setBenefits(newBenefits);
    }
  };

  // Handle input change for features
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  // Handle input change for benefits
  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  return (
    <div className="Gen_Admin_BBD">
      <div className="tran-card">
        <form className="tran-card-tableSec PPtran-card-tableSec">
          <div className="top-sec-main Gen_Admin_Header">
            <h3>Add Subscription Plan</h3>
          </div>

          <div className="Gland-Quest-data">
            <label>Title</label>
            <input type="text" name="title" placeholder="Enter plan title" />
          </div>

          <div className="Gland-Quest-data">
            <label>Plan Amount (/per month)</label>
            <input type="text" name="amount" placeholder="Enter plan amount" />
          </div>

          <div className="Gland-Quest-data">
            <label>Promo Amount (1st month)</label>
            <input
              type="text"
              name="promoAmount"
              placeholder="Enter promo amount"
            />
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
                  <input
                    type="text"
                    placeholder="Enter plan feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
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

          {/* Key Benefits Section */}
          <div className="cccrs-secs">
            <div className="Gland-Quest-data">
              <div className="cccrs-secs-header">
                <label>Key Benefits</label>
                <span onClick={addBenefit} style={{ cursor: "pointer" }}>
                  <AddIcon /> Add benefit
                </span>
              </div>
              {benefits.map((benefit, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    placeholder="Enter benefit"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                  />
                  {benefits.length > 1 && (
                    <span onClick={() => removeBenefit(index)} style={{ cursor: "pointer" }} className="remove-inputt-span">
                      <RemoveIcon />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="Gland-Cnt-Btn">
            <button type="submit" className="post-job-btn">
              Add Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
