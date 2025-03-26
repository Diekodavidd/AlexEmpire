import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link } from 'react-router-dom';
import logo from "../assets/IMG_1460.PNG"; // Ensure the logo image is in the correct path
import logor from "../assets/signin-image.jpg"; // Ensure the logo image is in the correct path
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const Dashboard = () => {

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
    <div className='freedo'><div>
    <h1>Welcome { "Guest"}!</h1>
</div>
      
    </div>
  </div>

            
        </div>
    );
};

export default Dashboard;


