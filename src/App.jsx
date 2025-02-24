// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import './App.css';

// import ScrollToTop from './assets/ScrollToTop';
// import SiteNav from './assets/SiteNav';

// import Home from './LandingPages/Home';
// import SearchResult from './LandingPages/SearchResult';
// import ArtisanProfile from './LandingPages/ArtisanProfile';
// import PostJob from './LandingPages/PostJob';
// import HowSimsWorks from './LandingPages/HowSimsWorks';
// import LeaveReview from './LandingPages/LeaveReview';
// import RequestQuote from './LandingPages/RequestQuote';
// import SavedTrades from './LandingPages/SavedTrades';
// import AdviceCentre from './LandingPages/AdviceCentre';
// import AdviceNigeria from './LandingPages/AdviceNigeria';
// import Benefit from './LandingPages/Benefit';
// import AboutUs from './LandingPages/AboutUs';
// import ArtisanOverview from './LandingPages/ArtisanOverview';
// import BusinessTips from './LandingPages/BusinessTips';
// import VettingProcess from './LandingPages/VettingProcess';
// import HowWorkComesYourWay from './LandingPages/HowWorkComesYourWay';

// import ArtisanChattingPage from './LandingPages/ArtisanChattingPage';

// import ArtisanSignUp from './LandingPages/ArtisanSignUp';
// import TermsPage from './LandingPages/TermsPage';
// import TradespersonTerms from './LandingPages/TradespersonTerms';
// import HomeownersTerms from './LandingPages/HomeownersTerms';
// import PrivacyPolicy from './LandingPages/PrivacyPolicy';
// import CookiesPage from './LandingPages/CookiesPage';
// import CookieConsent from './LandingPages/CookieConsent';
// import FAQPage from './LandingPages/FAQPage';
// import FAQDetailsPage from './LandingPages/FAQDetailsPage';
// import CostumerLogin1 from './LandingPages/CostumerLogin1';
// import CostumerLogin2 from './LandingPages/CostumerLogin2';
// import CostumerLogin3 from './LandingPages/CostumerLogin3';
// import CostumerLogin4 from './LandingPages/CostumerLogin4';
// import AccountPage from './LandingPages/AccountPage';
// import ContactUs from './LandingPages/ContactUs';
// import Footer from './LandingPages/Footer';

// import PostCode from './LandingPages/PostCode';


// import PaymentPage from './LandingPages/PaymentPage';


// import Userdashbaord from './Userdashboard/Userdashbaord';

// import ArtisanDashboard from './ArtisanDashboard/ArtisanDashboard';


// import AdminDashboard from './AdminDashboard/AdminDashboard';


// import CompletedReg from './LandingPages/CompletedReg';
// import SubscriptionPage from './LandingPages/SubscriptionPage';
// import VettingPage from './LandingPages/VettingPage';
// import ContractAgreement from './LandingPages/ContractAgreement';
// import PendingAproval from './LandingPages/PendingAproval';
// import ChangePass from './LandingPages/ChangePass';
// import ForgotPassword from './LandingPages/ForgotPassword';




// function App() {
//   const isAdminDashboardPage = location.pathname.startsWith('/admin');
//   return (
//     <div>
//     <Router>
//     <CookieConsent />

//     <ScrollToTop />


//       {!isAdminDashboardPage && <SiteNav />}

//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/search-results" element={<SearchResult />} />
//           <Route path="/artisan-profile" element={<ArtisanProfile />} />
//           <Route path="/post-job" element={<PostJob />} />
//           <Route path="/how-sim-works" element={<HowSimsWorks />} />
//           <Route path="/leave-review" element={<LeaveReview />} />
//           <Route path="/request-quote" element={<RequestQuote />} />
//           <Route path="/saved-trades" element={<SavedTrades />} />
//           <Route path="/advice-centre" element={<AdviceCentre />} />
//           <Route path="/advice-nigeria" element={<AdviceNigeria />} />
//           <Route path="/benefits" element={<Benefit />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/artisan-overview" element={<ArtisanOverview />} />
//           <Route path="/business-tips" element={<BusinessTips />} />
//           <Route path="/vetting-process" element={<VettingProcess />} />
//           <Route path="/how-work-comes-your-way" element={<HowWorkComesYourWay />} />
//           <Route path="/chat-with-artisan" element={<ArtisanChattingPage />} />
//           <Route path="/artisan-sign-up" element={<ArtisanSignUp />} />
//           <Route path="/terms-of-use" element={<TermsPage />} />
//           <Route path="/terms-of-use-tradeperson" element={<TradespersonTerms />} />
//           <Route path="/terms-of-use-homeowners" element={<HomeownersTerms/>} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/cookies" element={<CookiesPage />} />
//           <Route path="/faq" element={<FAQPage />} />
//           <Route path="/faq-details" element={<FAQDetailsPage />} />
//           <Route path="/login" element={<CostumerLogin1 />} />
//           <Route path="/verify-email" element={<CostumerLogin2 />} />
//           <Route path="/complete-profile" element={<CostumerLogin3 />} />
//           <Route path="/account" element={<AccountPage />} />
//           <Route path="/customer-signup" element={<CostumerLogin4 />} />
//           <Route path="/contact-us" element={<ContactUs />} />
//           <Route path="/post-code" element={<PostCode />} />
//           <Route path="/completed-registeration" element={<CompletedReg />} />
//           <Route path="/subscription" element={<SubscriptionPage />} />
//           <Route path="/vetting-page" element={<VettingPage />} />
//           <Route path="/contract-agreement" element={<ContractAgreement />} />
//           <Route path="/pending-approval" element={<PendingAproval />} />
//           <Route path="/change-password" element={<ChangePass />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/payment" element={<PaymentPage />} />

//           <Route path="/user-dashboard/*" element={<Userdashbaord />} />
//           <Route path="/artisan-dashboard/*" element={<ArtisanDashboard />} />
//           <Route path="/admin/*" element={<AdminDashboard />} />


//         </Routes>
//       </main>

//       {!isAdminDashboardPage && <Footer />}
//     </Router>

//     </div>
//   );
// }

// export default App;






















import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import LeaveReview1 from './LandingPages/LeaveReview1';
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
import PrivacyPolicy from './LandingPages/PrivacyPolicy';
import CookiesPage from './LandingPages/CookiesPage';
import CookieConsent from './LandingPages/CookieConsent';
import FAQPage from './LandingPages/FAQPage';
import FAQDetailsPage from './LandingPages/FAQDetailsPage';
import CostumerLogin1 from './LandingPages/CostumerLogin1';
import CostumerLogin2 from './LandingPages/CostumerLogin2';
import CostumerLogin3 from './LandingPages/CostumerLogin3';
import CostumerLogin4 from './LandingPages/CostumerLogin4';
import AccountPage from './LandingPages/AccountPage';
import ContactUs from './LandingPages/ContactUs';
import Footer from './LandingPages/Footer';

import PostCode from './LandingPages/PostCode';
import PaymentPage from './LandingPages/PaymentPage';

import Userdashbaord from './Userdashboard/Userdashbaord';
import ArtisanDashboard from './ArtisanDashboard/ArtisanDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';

import CompletedReg from './LandingPages/CompletedReg';
import SubscriptionPage from './LandingPages/SubscriptionPage';
import VettingPage from './LandingPages/VettingPage';
import ContractAgreement from './LandingPages/ContractAgreement';
import PendingAproval from './LandingPages/PendingAproval';
import PendingApprovalCheck from './LandingPages/PendingApprovalCheck';
import ChangePass from './LandingPages/ChangePass';
import ForgotPassword from './LandingPages/ForgotPassword';

// Reload the page on navigation but prevent an infinite loop
function PageReloader() {
  const location = useLocation();

  useEffect(() => {
    const lastReloadedPath = sessionStorage.getItem('lastReloadedPath');

    if (lastReloadedPath !== location.pathname) {
      sessionStorage.setItem('lastReloadedPath', location.pathname);
      window.location.reload();
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <PageReloader />
      <CookieConsent />
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
          <Route path="/leave-reviews" element={<LeaveReview1 />} />
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
          <Route path="/terms-of-use-homeowners" element={<HomeownersTerms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/faq-details" element={<FAQDetailsPage />} />
          <Route path="/login" element={<CostumerLogin1 />} />
          <Route path="/verify-email" element={<CostumerLogin2 />} />
          <Route path="/complete-profile" element={<CostumerLogin3 />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/customer-signup" element={<CostumerLogin4 />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/post-code" element={<PostCode />} />

          <Route path="/completed-registeration" element={<CompletedReg />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/vetting-page" element={<VettingPage />} />
          {/* <Route path="/pending-approval" element={<PendingAproval />} /> */}
          <Route path="/pending-approval" element={<PendingApprovalCheck />} />

          <Route path="/contract-agreement" element={<ContractAgreement />} />
          
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user-dashboard/*" element={<Userdashbaord />} />
          <Route path="/artisan-dashboard/*" element={<ArtisanDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
