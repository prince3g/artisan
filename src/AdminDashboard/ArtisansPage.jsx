import React from "react";

import RegisteredArtisans from './RegisteredArtisans';


const ArtisansPage = () => {
  return (
    <div className="Gen_Admin_BBD">
            <div className="top-sec-main Gen_Admin_Header">
          <h3>SimserviceHub Artisans</h3>
          <p>Registered SimserviceHub Artisans</p>
        </div>

        <RegisteredArtisans />
    </div>
  );
};

export default ArtisansPage;
