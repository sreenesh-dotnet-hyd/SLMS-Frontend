import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import HomeNav from "./HomeNav";
import Second from "./Second";
import Dashboards from "./Dashboards";
import "./Landing.css";

export default function Home() {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("signin");
  };

  const navigateToProduct = () => {
    navigate("/app/devices");
  };

  return (
    <div className="home-container">
      <HomeNav />

      {/* HERO SECTION */}
      <div className="hero-container">
        <span className="hero-text">
          Smarter Software License Management
        </span>

        <span className="sub-hero-text">
          Don’t leave your operations to chance. Master your software ecosystem
          with tracking, unified dashboards, and insights.
        </span>

        <div className="hero-btns">
          <button
            className="btn btn-3d primary-btn"
            onClick={navigateToProduct}
          >
            <span>Explore the product</span>
            <div className="btn-glow" />
          </button>

          <button
            className="btn btn-3d ghost-btn"
            onClick={navigateToSignIn}
          >
            Sign In
          </button>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <Dashboards />
      <Second />
      <Footer />
    </div>
  );
}
