import React, { useState } from "react";
import "./ChooseRole.css";
import { useNavigate } from "react-router-dom";

const ChooseRole = ({ closeModal }) => {
  const [view, setView] = useState("roleSelection");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (view) {
      case "roleSelection":
        return (
          <>
            <h2 className="popup-title">Join Us</h2>
            <p className="popup-description">How would you like to sign up?</p>
            <div className="popup-buttons">
              <button
                className="popup-button"
                onClick={() => navigate("/login")}
              >
                Sign up as Volunteer
              </button>
              <button
                className="popup-button"
                onClick={() => navigate("/ngo/sign-up")}
              >
                Sign up as NGO
              </button>
              <p className="popup-login-link">
                Already have an account?{" "}
                <span
                  className="popup-link"
                  onClick={() => setView("loginOptions")}
                >
                  Log In
                </span>
              </p>
            </div>
          </>
        );

      case "loginOptions":
        return (
          <>
            <h2 className="popup-title">Log In</h2>
            <p className="popup-description">Choose your login role</p>
            <div className="popup-buttons">
              <button
                className="popup-button"
                onClick={() => navigate("/login")}
              >
                Login as Volunteer
              </button>
              <button
                className="popup-button"
                onClick={() => navigate("/ngo/sign-in")}
              >
                Login as NGO
              </button>
              <p className="popup-signup-link">
                Don't have an account?{" "}
                <span
                  className="popup-link"
                  onClick={() => setView("roleSelection")}
                >
                  Create Account
                </span>
              </p>
            </div>
          </>
        );

      case "signupVolunteer":
        return (
          <>
            <h2 className="popup-title">Sign Up as Volunteer</h2>
            {/* Add volunteer-specific signup form or logic here */}
            <button
              className="popup-back"
              onClick={() => setView("roleSelection")}
            >
              Back
            </button>
          </>
        );

      case "signupNgo":
        return (
          <>
            <h2 className="popup-title">Sign Up as NGO</h2>
            <button
              className="popup-back"
              onClick={() => setView("roleSelection")}
            >
              Back
            </button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-container">
        {renderContent()}
        <button className="popup-close" onClick={closeModal} aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;
