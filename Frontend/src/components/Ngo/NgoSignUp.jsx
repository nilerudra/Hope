import React, { useState } from "react";
import "./ngoSignUp.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NgoSignUp = () => {
  const [formData, setFormData] = useState({
    ngoName: "",
    registrationNumber: "",
    yearOfEstablishment: "",
    typeOfNGO: "",
    country: "",
    state: "",
    city: "",
    address: "",
    contactNumber: "",
    email: "",
    website: "",
    founders: "",
    ceo: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 characters, contain one capital letter, one symbol, and one number"
        );
      } else {
        setPasswordError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hope-v129.onrender.com/ngo/sign-up",
        formData
      );

      alert(response.data.message);
      setFormData({
        ngoName: "",
        registrationNumber: "",
        yearOfEstablishment: "",
        typeOfNGO: "",
        country: "",
        state: "",
        city: "",
        address: "",
        contactNumber: "",
        email: "",
        website: "",
        founders: "",
        ceo: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(message);
      } else if (error.request) {
        alert("Network error. Please try again later.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="ngodetailform">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2 className="form-title">NGO Registration</h2>
        <input
          type="text"
          name="ngoName"
          placeholder="NGO Name"
          value={formData.ngoName}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="form-input"
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="form-input"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <span className="password-toggle-icon" onClick={toggleShowPassword}>
            {showPassword ? (
              <FaEyeSlash style={{ color: "#ffd012" }} />
            ) : (
              <FaEye style={{ color: "#ffd012" }} />
            )}
          </span>
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <div className="password-container">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            className="form-input"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <span
            className="password-toggle-icon"
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? (
              <FaEyeSlash style={{ color: "#ffd012" }} />
            ) : (
              <FaEye style={{ color: "#ffd012" }} />
            )}
          </span>
        </div>
        <input
          type="date"
          name="yearOfEstablishment"
          value={formData.yearOfEstablishment}
          onChange={handleChange}
          required
          className="form-input"
        />

        <select
          name="typeOfNGO"
          className="form-input"
          value={formData.typeOfNGO}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select NGO Category
          </option>
          <option value="Water">Water</option>
          <option value="Education">Education</option>
          <option value="Land">Land</option>
          <option value="Child and Women">Child and Women</option>
          <option value="Animals">Animals</option>
          <option value="Forest">Forest</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="form-input"
        />

        <input
          type="text"
          name="founders"
          placeholder="Founder(s) Name(s)"
          value={formData.founders}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="ceo"
          placeholder="Current CEO/President/Director"
          value={formData.ceo}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="url"
          name="website"
          placeholder="Website URL"
          value={formData.website}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default NgoSignUp;
