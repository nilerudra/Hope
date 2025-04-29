import React, { useState } from "react";
import "./Login.css";
import { networkRequest } from "../../utils/network_request";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loginFormState, setLoginFormState] = useState({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setFormState({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
  };

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

    setFormState({ ...formState, [name]: value });
  };

  const handleLoginInputChange = (e) => {
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

    setLoginFormState({ ...loginFormState, [name]: value });
  };

  const handleSignInClick = () => {
    resetForm();
    setIsSignIn(true);
  };

  const handleSignUpClick = () => {
    resetForm();
    setIsSignIn(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // setLoading(true);
    e.preventDefault();
    if (passwordError) {
      alert("Please ensure the password meets the required criteria");
    } else {
      networkRequest(
        "https://hope-v129.onrender.com/login",
        (response) => {
          localStorage.setItem("access_token", response.token);
          localStorage.setItem("user_id", response.user_id);
          navigate("/dashboard");
        },
        "post",
        loginFormState
      );
    }
    alert("sign In");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (passwordError) {
      alert("Please ensure the password meets the required criteria");
      return;
    }

    networkRequest(
      "https://hope-v129.onrender.com/signup",
      (response) => {
        console.log(response);
        alert(response.message);
        navigate("/login");
        resetForm();
      },
      "post",
      formState
    );
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="sign-in-up-outer-container">
      <div className="container">
        <div
          className={`forms-container ${
            isSignIn ? "sign-in-active" : "sign-up-active"
          }`}
        >
          {/* Sign In Section */}
          <div className="signin-section">
            <form className="sign-form">
              <h1>Sign In</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={loginFormState.email}
                onChange={handleLoginInputChange}
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  value={loginFormState.password}
                  onChange={handleLoginInputChange}
                />
                <span
                  className="password-toggle-icon"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash style={{ color: "#ffd012" }} />
                  ) : (
                    <FaEye style={{ color: "#ffd012" }} />
                  )}
                </span>
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <button type="submit" className="btn" onClick={handleSignIn}>
                SIGN IN
              </button>
            </form>
          </div>

          {/* Sign Up Section */}
          <div className="signup-section">
            <form className="sign-form">
              <h1>Sign Up</h1>
              <input
                type="text"
                placeholder="username"
                name="username"
                required
                value={formState.username}
                onChange={handleInputChange}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={formState.email}
                onChange={handleInputChange}
              />
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                  value={formState.password}
                  onChange={handleInputChange}
                />
                <span
                  className="password-toggle-icon"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash style={{ color: "#ffd012" }} />
                  ) : (
                    <FaEye style={{ color: "#ffd012" }} />
                  )}
                </span>
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required
                  value={formState.confirmPassword}
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

              {/* <div className="role-selection">
                <div className="role-buttons">
                  <button
                    type="button"
                    className={`role-button ${
                      formState.role === "NGO" ? "active" : ""
                    }`}
                    onClick={() => handleRoleChange("NGO")}
                  >
                    NGO
                  </button>
                  <button
                    type="button"
                    className={`role-button ${
                      formState.role === "Volunteer" ? "active" : ""
                    }`}
                    onClick={() => handleRoleChange("Volunteer")}
                  >
                    Volunteer
                  </button>
                </div> 
              </div>*/}
              <button type="submit" className="btn" onClick={handleSignUp}>
                SIGN UP
              </button>
            </form>
          </div>
        </div>

        {/* Sliding Panel */}
        <div className="overlay">
          <div
            className={`overlay-panel overlay-left ${isSignIn ? "hidden" : ""}`}
          >
            <h1>Welcome Back!</h1>
            <p>Already have an account? Please sign in</p>
            <button className="ghost-btn" onClick={handleSignInClick}>
              SIGN IN
            </button>
          </div>
          <div
            className={`overlay-panel overlay-right ${
              !isSignIn ? "hidden" : ""
            }`}
          >
            <h1>Hello!</h1>
            <p>Don't have an account? Create one now!</p>
            <button className="ghost-btn" onClick={handleSignUpClick}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
