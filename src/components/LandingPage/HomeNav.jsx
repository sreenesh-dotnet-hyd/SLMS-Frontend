// src/components/LandingPage/HomeNav.jsx
import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function HomeNav() {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/signin");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToContact = () => {
    navigate("/contact");
  };

  const navigateToFeatures = () => {
    navigate("/features");
  };

  const navigateToCompany = () => {
    navigate("/company");
  };

  const navigateToResources = () => {
    navigate("/resources");
  };

  const navigateToPricing = () => {
    navigate("/pricing");
  };

  return (
    <div className="home-nav-container">
      <div className="sub-1">
        {/* Logo as clickable brand button */}
        <button className="logo logo-btn" onClick={navigateToHome}>
          <span className="logo-accent">L</span>
          icense
        </button>

        <div className="features">
          <span onClick={navigateToFeatures}>features</span>
          <span onClick={navigateToCompany}>company</span>
          <span onClick={navigateToResources}>resources</span>
          <span onClick={navigateToPricing}>pricing</span>
        </div>
      </div>

      <div className="sub-2">
        <button className="btn btn-3d" onClick={navigateToContact}>
          Contact Us
        </button>
        <button className="btn btn-3d" onClick={navigateToSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}
