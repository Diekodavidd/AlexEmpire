import React, { useState } from 'react';
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
    <div style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // Adds a semi-transparent white background
      padding: "0",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
      zIndex: 10,
      width:"60%",
      height:"fit-content"
    }}>jj
      
    </div>
  </div>

            
        </div>
    );
};

export default Dashboard;


