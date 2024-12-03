import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './App.css';

import ScrollToTop from './assets/ScrollToTop';
import SiteNav from './assets/SiteNav';

import Home from './LandingPages/Home';
import SearchResult from './LandingPages/SearchResult';
import ArtisanProfile from './LandingPages/ArtisanProfile';
import PostJob from './LandingPages/PostJob';
import HowSimsWorks from './LandingPages/HowSimsWorks';
// import AboutUs from './LandingPages/AboutUs';
// import TermsOfUse from './LandingPages/TermsOfUse';
// import PrivacyPolicy from './LandingPages/PrivacyPolicy';
// import Cookies from './LandingPages/Cookies';
// import ContactUs from './LandingPages/ContactUs';
// import Careers from './LandingPages/Careers';
// import Sitemap from './LandingPages/Sitemap';
import Footer from './LandingPages/Footer';

function App() {
  return (
    <div>
    
    <Router>
    <ScrollToTop />

      <SiteNav />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResult />} />
          <Route path="/artisan-profile" element={<ArtisanProfile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/how-sim-works" element={<HowSimsWorks />} />
          {/* <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/sitemap" element={<Sitemap />} /> */}
        </Routes>
      </main>

      <Footer />
    </Router>

    </div>
  );
}

export default App;
