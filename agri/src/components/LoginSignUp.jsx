import React, { useState } from 'react';
import '../styles/LoginSignUp.css';
import axios from 'axios';
import { Notify } from 'notiflix';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const API_URL = 'https://agrilink-backend-24zq.onrender.com';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [language, setLanguage] = useState('en');

  // React Hook Form for sign in
  const { 
    register: registerSignIn, 
    handleSubmit: handleSubmitSignIn,
    formState: { errors: errorsSignIn }
  } = useForm();

  // React Hook Form for sign up
  const { 
    register: registerSignUp, 
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp }
  } = useForm();

  // Rwanda's districts by province - kept for reference
  const districts = {
    "Kigali City": ["Nyarugenge", "Gasabo", "Kicukiro"],
    "Southern Province": ["Nyanza", "Gisagara", "Nyaruguru", "Huye", "Nyamagabe", "Ruhango", "Muhanga", "Kamonyi"],
    "Western Province": ["Karongi", "Rutsiro", "Rubavu", "Nyabihu", "Ngororero", "Rusizi", "Nyamasheke"],
    "Northern Province": ["Rulindo", "Gakenke", "Musanze", "Burera", "Gicumbi"],
    "Eastern Province": ["Rwamagana", "Nyagatare", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Bugesera"]
  };

  // Available user roles
  const roles = ["Farmer", "Buyer", "DistrictAdmin", "Agronomist"];

  // Updated sign-in handler with React Hook Form and Axios
  const onSubmitSignIn = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      console.log("Connecting to:", `${API_URL}/user/login`);
      
      const response = await axios.post(`${API_URL}/user/login`, {
        email: data.email,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });
      
      console.log("Login response:", response);
      
      const userData = response.data;
      
      // Store user data and token
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('preferredLanguage', language);
      
      // Store access token
      if (userData.user && userData.user.accessToken) {
        localStorage.setItem('token', userData.user.accessToken);
      }
      /////------------------------------------------------//
      const token = userData.user.accessToken
      const decoded = jwt_decode(token)
      const userRole = decoded.role
      const userName = decoded.firstName
      localStorage.setItem('userName', userName);
///---------------------------------------------------------///


      // Store user information
      if (userData.user) {
        localStorage.setItem('userId', userData.user._id);
        localStorage.setItem('lastName', userData.user.lastName);
        localStorage.setItem('role', userData.user.role);
      }
      
      Notify.success('Login Successful');
      if (userRole === 'Farmer'){
        navigate('/dashboard');
      }

      else if (userRole === 'Buyer'){
        navigate('/supply');
      }
      else if (userRole === 'Agronomist'){
        navigate('/agrosoilanalysis');
      }

      else{
        navigate('/home')
      }
      
      

    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || "An error occurred";
      setErrorMessage(errorMsg);
      Notify.failure(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Updated sign-up handler with React Hook Form and Axios
  const onSubmitSignUp = async (data) => {
    if (!agreeToTerms) {
        setErrorMessage("Please agree to the terms");
        return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
        console.log("Sending signup request with data:", JSON.stringify(data, null, 2));

        const response = await axios.post(`${API_URL}/user/register`, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: data.role,
            district: data.district // Backend might need to be updated to accept this field
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        console.log("Register response:", response);

        // Store user data from response
        const userData = response.data;
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('preferredLanguage', language);
        
        if (userData.user && userData.user.accessToken) {
          localStorage.setItem('token', userData.user.accessToken);
        }
        
        if (userData.user) {
          localStorage.setItem('userId', userData.user._id);
          localStorage.setItem('firstName', userData.user.firstName);
          localStorage.setItem('lastName', userData.user.lastName);
          localStorage.setItem('role', userData.user.role);
        }

        Notify.success("Registration Successful");
        navigate("/dashboard");
    } catch (error) {
        console.error("Registration error:", error);
        console.error("Error response:", error.response?.data);
        setErrorMessage(error.response?.data?.message || "An error occurred");
        Notify.failure(error.response?.data?.message || "An error occurred");
    } finally {
        setIsLoading(false);
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  return (
    <div className="loginContainer">
      <div className="formWrapper">
        <h2 className="formTitle">
          {isLogin ? 'Login to AgriLink Rwanda' : 'Create an Account'}
        </h2>

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        {isLogin ? (
          <form onSubmit={handleSubmitSignIn(onSubmitSignIn)} className="authForm">
            <div className="formGroup">
              <label className="inputLabel">Email</label>
              <input
                type="email"
                className="formInput"
                {...registerSignIn("email", { 
                  required: "Email is required", 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errorsSignIn.email && <span className="errorText">{errorsSignIn.email.message}</span>}
            </div>

            <div className="formGroup">
              <label className="inputLabel">Password</label>
              <input
                type="password"
                className="formInput"
                {...registerSignIn("password", { required: "Password is required" })}
              />
              {errorsSignIn.password && <span className="errorText">{errorsSignIn.password.message}</span>}
            </div>

            <button
              type="submit"
              className="submitButton"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitSignUp(onSubmitSignUp)} className="authForm">
            <div className="nameFieldsContainer">
              <div className="formGroup">
                <label className="inputLabel">First Name</label>
                <input
                  type="text"
                  className="formInput"
                  {...registerSignUp("firstName", { required: "First name is required" })}
                />
                {errorsSignUp.firstName && <span className="errorText">{errorsSignUp.firstName.message}</span>}
              </div>

              <div className="formGroup">
                <label className="inputLabel">Last Name</label>
                <input
                  type="text"
                  className="formInput"
                  {...registerSignUp("lastName", { required: "Last name is required" })}
                />
                {errorsSignUp.lastName && <span className="errorText">{errorsSignUp.lastName.message}</span>}
              </div>
            </div>

            <div className="formGroup">
              <label className="inputLabel">Email</label>
              <input
                type="email"
                className="formInput"
                {...registerSignUp("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errorsSignUp.email && <span className="errorText">{errorsSignUp.email.message}</span>}
            </div>

            <div className="formGroup">
              <label className="inputLabel">Password</label>
              <input
                type="password"
                className="formInput"
                {...registerSignUp("password", { 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
              />
              {errorsSignUp.password && <span className="errorText">{errorsSignUp.password.message}</span>}
            </div>

            <div className="formGroup">
              <label className="inputLabel">Confirm Password</label>
              <input
                type="password"
                className="formInput"
                {...registerSignUp("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: (value, formValues) => value === formValues.password || "Passwords do not match"
                })}
              />
              {errorsSignUp.confirmPassword && <span className="errorText">{errorsSignUp.confirmPassword.message}</span>}
            </div>

            <div className="formGroup">
              <label className="inputLabel">Role</label>
              <select
                className="formSelect"
                {...registerSignUp("role", { required: "Please select a role" })}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errorsSignUp.role && <span className="errorText">{errorsSignUp.role.message}</span>}
            </div>

            <div className="formGroup">
              <label className="inputLabel">District</label>
              <select
                className="formSelect"
                {...registerSignUp("district", { required: "Please select a district" })}
              >
                <option value="">Select a district</option>
                {Object.keys(districts).map((province) => (
                  <optgroup key={province} label={province}>
                    {districts[province].map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {errorsSignUp.district && <span className="errorText">{errorsSignUp.district.message}</span>}
            </div>

            <div className="formGroup checkboxGroup">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="checkboxInput"
              />
              <label htmlFor="agreeToTerms" className="checkboxLabel">
                I agree to the Terms and Conditions
              </label>
            </div>
            {!agreeToTerms && errorMessage === "Please agree to the terms" && (
              <span className="errorText">Please agree to the terms</span>
            )}

            <button
              type="submit"
              className="submitButton"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        )}

        <div className="formFooter">
          <button
            onClick={toggleForm}
            className="toggleFormButton"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;