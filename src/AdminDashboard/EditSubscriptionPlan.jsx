import React, { useState } from "react";
import "../LandingPages/Css/Main.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const EditSubscriptionPlan = () => {
  const [features, setFeatures] = useState([]);
  const [benefits, setBenefits] = useState([]);

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const removeBenefit = (index) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(newBenefits);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  return (
    <div className="Gen_Admin_BBD">
      <div className="tran-card">
        <form className="tran-card-tableSec">
          <div className="top-sec-main Gen_Admin_Header">
            <h3>Edit Subscription (Basic Plan)</h3>
          </div>

          <div className="Gland-Quest-data">
            <label>Title</label>
            <input type="text" value="Basic Plan" readOnly />
          </div>

          <div className="Gland-Quest-data">
            <label>Plan Amount (/per month)</label>
            <input type="text" value="₦5,000" readOnly />
          </div>

          <div className="Gland-Quest-data">
            <label>Promo Amount (1st month)</label>
            <input type="text" value="₦2,500" readOnly />
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

              <input type="text" value="Individuals or small artisans just starting out" readOnly />
              <input type="text" value="Up to 20 job quotes every month to secure new projects and grow your client base." readOnly />
              <input type="text" value="Single payment gateway" readOnly />
              <input type="text" value="Limited to social media integration" readOnly />
              <input type="text" value="Email support on weekdays" readOnly />
              <input type="text" value="Self-guided setup resources (tutorials/documentation)" readOnly />
              <input type="text" value="Best for small-scale operations" readOnly />
              <input type="text" value="Most budget-friendly option - Ideal for testing new ideas" readOnly />

              {features.map((feature, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    placeholder="Enter plan feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <span
                    onClick={() => removeFeature(index)}
                    style={{ cursor: "pointer" }}
                    className="remove-inputt-span"
                  >
                    <RemoveIcon />
                  </span>
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

              <input type="text" value="Cost-effective solution for solo artisans or those experimenting with online sales" readOnly />
              <input type="text" value="Quick to set up with minimal complexity" readOnly />
              <input type="text" value="Access to essential features without a large investment" readOnly />

              {benefits.map((benefit, index) => (
                <div key={index} className="input-group">
                  <input
                    type="text"
                    placeholder="Enter benefit"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(index, e.target.value)}
                  />
                  <span
                    onClick={() => removeBenefit(index)}
                    style={{ cursor: "pointer" }}
                    className="remove-inputt-span"
                  >
                    <RemoveIcon />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="Gland-Cnt-Btn">
            <button type="submit" className="post-job-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionPlan;