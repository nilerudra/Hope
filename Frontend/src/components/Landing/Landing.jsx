import React, { useEffect, useState } from "react";
import "./landing.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import ChooseRole from "../Login/ChooseRole";

const LandingPage = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const openLoginPage = () => {
    // Handle navigation to login page
    alert("Navigate to Login Page");
    closePopup();
  };

  const openVolunteerSignup = () => {
    navigate("/login");
    closePopup();
  };

  const openNgoSignup = () => {
    navigate("/ngo/sign-up");
    closePopup();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="outer-container">
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="org-name">HOPE</span>
        </div>
        <div className="nav-right">
          <div className="nav-item">HOME</div>
          <div className="nav-item">ABOUT</div>
          <div className="nav-item">SERVICES</div>
          <div className="nav-item">CONTACT</div>
          <div className="nav-item donate-button">DONATE</div>
        </div>
      </nav>

      <div className="content-container">
        <h1 className={`main-heading ${fadeIn ? "fade-in-top-down" : ""}`}>
          Hope for Humanity
        </h1>
        <h6 className={`sub-heading ${fadeIn ? "fade-in-top-down" : ""}`}>
          GIVE A HELPING HAND TO THOSE WHO NEED IT!
        </h6>
        <div className="button-group">
          <button
            className={`get-started-button ${fadeIn ? "fade-in-top-down" : ""}`}
            onClick={openPopup}
          >
            Get Started
          </button>
          <button
            className={`donate-now-button ${fadeIn ? "fade-in-top-down" : ""}`}
            onClick={() => {
              navigate("/payment");
            }}
          >
            Donate Now
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <ChooseRole
          closeModal={closePopup}
          openLoginPage={openLoginPage}
          openVolunteerSignup={openVolunteerSignup}
          openNgoSignup={openNgoSignup}
        />
      )}
    </div>
  );
};

export default LandingPage;
