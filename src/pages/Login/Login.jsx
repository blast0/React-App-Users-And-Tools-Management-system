import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { verifyToken } from "../../helper";
import Image from "../../assets/image.png";
import Logo from "../../assets/logo.png";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("auth")) || ""
  );
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
        otp: 180998,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          formData
        );
        if (response.data.user.isVerified) {
          localStorage.setItem("auth", JSON.stringify(response.data.token));
          toast.success("Login successfull");
          navigate("/dashboard");
        } else {
          localStorage.setItem("auth", JSON.stringify(response.data.token));
          navigate("/verifyEmail", {
            state: { email: response.data.user.email },
          });
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/googlelogin",
      {
        credential: credentialResponse.credential,
      }
    );
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("auth", JSON.stringify(response.data.token));
      toast.success("Login successfull");
      navigate("/dashboard", {
        state: { user: response.data.user },
      });
    } else {
      localStorage.removeItem("auth");
      toast.success("Login Failed");
    }
  };

  useEffect(() => {
    if (token) {
      const { isTokenValid, error } = verifyToken(token);
      if (isTokenValid && !error) {
        toast.success("You already logged in");
        navigate("/dashboard");
      } else if (error !== null) {
        toast.error(error);
      } else {
        toast.error("Token Expired");
      }
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
            <div className="flex justify-center mt-10">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleLogin(credentialResponse);
                }}
                onError={() => {
                  toast.error("Login Failed");
                }}
              />
            </div>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
