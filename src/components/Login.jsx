import React, { useState } from 'react';
import axios from 'axios';
import './style.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../assets/IMG_1460.PNG"; // Ensure the logo image is in the correct path
import logor from "../assets/signin-image.jpg"; // Ensure the logo image is in the correct path
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const Login = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        Password: ""
    });
    
    const navigate = useNavigate(); // Hook to navigate to other pages
    const [loading, setLoading] = useState(false); // Add loading state
    

    const LoginCustomer = async () => {
        try {
            setLoading(true);
    
            const response = await axios.post(
                "https://backend-details-0xik.onrender.com/customer/login",
                userDetails
            );
    
            console.log(response.data);
    
            if (response.data.status) {
                alert("Login successful");
                navigate("/dash"); // Redirect to login page

            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div>
  <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
    {/* Bouncing Balls Canvas */}
    <BouncingBalls />
    <Link to='/'><img 
                src={logo} 
                alt="Logo" 
                style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
        /></Link>
    
    {/* Signi Form */}
    <div className='freedo'>
     
        <section className="signin">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={logor} alt="sing up image"/></figure>
                        <Link  className="signup-image-link" to='/signup'>Create an account</Link>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Log In</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                 <label htmlFor="email"><EmailIcon /></label>
                                <input type="email"  onChange={(e) => setUserDetails({...userDetails, email: e.target.value})} name="your_name" id="your_name" placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><LockIcon /></label>
                                <input type="password" onChange={(e) => setUserDetails({...userDetails, Password: e.target.value})} name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                                <label for="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div className="form-group form-button">
                            <div className='mly' >
                           <button style={{
          backgroundColor: "gold",
          color: "black",
          fontSize: "1rem",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold"
        }} onClick={LoginCustomer}  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"  disabled={loading}>
             {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Login"
          )}</button>
                               </div>
                            </div>
                        </form>
                        <div className="social-login">
                            <span className="social-label">Or login with</span>
                            <ul className="socials">
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
    </div>
  </div>

            
        </div>
    );
};

export default Login;


{/* <form>
      <section className="">
                <div className="">
                    <div className="">

                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="form-outline mb-4">
                                    <input 
                                        type="email" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter a valid email address"
                                        onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                    />
                                    <label className="form-label">Email address</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input 
                                        type="password" 
                                        className="form-control form-control-lg" 
                                        placeholder="Enter password"
                                        onChange={(e) => setUserDetails({...userDetails, Password: e.target.value})}
                                    />
                                    <label className="form-label">Password</label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={LoginCustomer}>
                                        Login
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                                        <Link to='/'>Register</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
      </form> */}