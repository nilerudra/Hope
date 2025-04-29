import React, { useState } from "react";
import "./NgoSignIn.css";
import axios from "axios";
import logo from "../../assets/white-logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NgoSignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/ngo/sign-in",
        formData
      );

      console.log(response);
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("ngo_id", response.data.user_id);
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("Network error. Please try again later.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="ngo-sign-in">
        <div className="ngo-sign-in-container">
          <div className="ngo-sign-in-logo">
            <img src={logo} alt="Logo" className="ngo-sign-in-logo-image" />
            <h1 className="ngo-sign-in-site-name">Hope</h1>
            <p className="ngo-sign-in-slogan">
              GIVE A HELPING HAND TO THOSE WHO NEED IT!
            </p>
          </div>
          <div className="ngo-sign-in-registration-form">
            <h2 className="ngo-sign-in-registration-form-title">Sign In</h2>
            <input
              type="text"
              name="email"
              className="ngo-sign-in-registration-form-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="ngo-sign-in-registration-form-password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="ngo-sign-in-registration-form-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="ngo-sign-in-registration-form-password-toggle-icon"
                onClick={toggleShowPassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button
              className="ngo-sign-in-registration-form-submit-button"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NgoSignIn;
