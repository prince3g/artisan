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
import LeaveReview from './LandingPages/LeaveReview';
import RequestQuote from './LandingPages/RequestQuote';
import SavedTrades from './LandingPages/SavedTrades';
import AdviceCentre from './LandingPages/AdviceCentre';
import AdviceNigeria from './LandingPages/AdviceNigeria';
import Benefit from './LandingPages/Benefit';
import AboutUs from './LandingPages/AboutUs';
import ArtisanOverview from './LandingPages/ArtisanOverview';
import BusinessTips from './LandingPages/BusinessTips';
import VettingProcess from './LandingPages/VettingProcess';
import HowWorkComesYourWay from './LandingPages/HowWorkComesYourWay';
import ArtisanChattingPage from './LandingPages/ArtisanChattingPage';
import ArtisanSignUp from './LandingPages/ArtisanSignUp';
import TermsPage from './LandingPages/TermsPage';
import TradespersonTerms from './LandingPages/TradespersonTerms';
import HomeownersTerms from './LandingPages/HomeownersTerms';
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
          <Route path="/leave-review" element={<LeaveReview />} />
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/saved-trades" element={<SavedTrades />} />
          <Route path="/advice-centre" element={<AdviceCentre />} />
          <Route path="/advice-nigeria" element={<AdviceNigeria />} />
          <Route path="/benefits" element={<Benefit />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/artisan-overview" element={<ArtisanOverview />} />
          <Route path="/business-tips" element={<BusinessTips />} />
          <Route path="/vetting-process" element={<VettingProcess />} />
          <Route path="/how-work-comes-your-way" element={<HowWorkComesYourWay />} />
          <Route path="/chat-with-artisan" element={<ArtisanChattingPage />} />
          <Route path="/artisan-sign-up" element={<ArtisanSignUp />} />
          <Route path="/terms-of-use" element={<TermsPage />} />
          <Route path="/terms-of-use-tradeperson" element={<TradespersonTerms />} />
          <Route path="/terms-of-use-homeowners" element={<HomeownersTerms/>} />

          {/* 
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
