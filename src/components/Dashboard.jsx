import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/IMG_1460.PNG"; // Ensure the logo image is in the correct path
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {


  // Safely retrieve existingCustomer from localStorage
  // const storedCustomer = localStorage.getItem("existingCustomer")
  //   ? JSON.parse(localStorage.getItem("existingCustomer"))
  //   : null;

  // Safely retrieve existingToke from localStorage
  let storedToke = localStorage.getItem("existingToke")
  const navigate = useNavigate()
  const [data,setData] = useState()
  useEffect(() => {

    axios.get("http://localhost:7000/customer/verify",{
      headers:{
        'Authorization': `Bearer ${storedToke}`
      }
  })
    .then((response=>{
      console.log(response.data.User);
      setData(response?.data?.User)

    })).catch((err)=>{
      console.log(err?.response?.data?.message);
      navigate("/login"); // Redirect to login page
    })
    // if (!storedToke) {
    //   navigate("/login"); // Redirect to login page
    // }
  }, [])

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
         <div style={{ color: "white", position:"fixed", top:"20px" ,right:"20px", fontSize:"12px", display:"flex"   }}>
          <AccountCircleIcon style={{fontSize:"35px" , color:"gold"  }} />
         {/* <h1 style={{fontSize:"29px" , marginLeft:"5px"  }}>Welcome {storedCustomer ? storedCustomer.firstname : "Guest"}!</h1> */}
         <h1 style={{fontSize:"29px" , marginLeft:"5px"  }}>Welcome {data ? data.firstname : "Guest"}!</h1>
          
         </div>
        {/* Signi Form */}
        <div className='freedo'><div>
          {/* <h1 style={{ color: "white" }}>Welcome {storedCustomers ? storedCustomers.firstname : "Guest"}!</h1> */}
        </div>

        </div>
      </div>


    </div>
  );
};

export default Dashboard;


