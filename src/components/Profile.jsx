import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnimatedBackgrounds from './Amiatio';

const Profile = () => {


    // Safely retrieve existingCustomer from localStorage
    // const storedCustomer = localStorage.getItem("existingCustomer")
    //   ? JSON.parse(localStorage.getItem("existingCustomer"))
    //   : null;

    // Safely retrieve existingToke from localStorage
    let storedToke = localStorage.getItem("existingToke")
    const navigate = useNavigate()
    const [data, setData] = useState()
    const [Imagefile, setImagefile] = useState(null);
    const handleLogout = () => {
        localStorage.removeItem("existingToke"); // Clear the token
        localStorage.removeItem("existingCustomer"); // Clear the customer data
        alert("Logout successful!"); // Optional: Show a message
        navigate("/login"); // Redirect to login
    };
    
    useEffect(() => {

        axios.get("https://backend-details-0xik.onrender.com/customer/verify", {
            headers: {
                'Authorization': `Bearer ${storedToke}`
            }
        })
            .then((response => {
                console.log(response.data.User);
                setData(response?.data?.User)

            })).catch((err) => {
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
                <AnimatedBackgrounds />
                <Link to='/'><img
                    src={logo}
                    alt="Logo"
                    style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
                /></Link>
                <div style={{ color: "white", position: "fixed", top: "20px", right: "20px", fontSize: "12px", display: "flex" }}>
                <Link to='/dash2' style={{ color: "white",fontSize: "12px", display: "flex", textDecoration:"none" }}>
                   <AccountCircleIcon style={{ fontSize: "35px", color: "gold" }} />
                      <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>Dashboard</h1>
                      </Link>
                </div>

                {/* Signi Form */}
                <div>
                    <section style={{ justifyContent: "center", padding: "30px", display: "flex", alignItems: "center" }} className="signup">
                        <div style={{justifyContent:"center", justifyItems:"center"}} className='container'>
                            <h1 style={{color:"white"}}>My Profile</h1>
                            
                                <img src={data && data.profilePic} alt="" style={{ marginLeft:"50px",width: "90px", height: "90px", borderRadius: "50%", marginRight: "10px" }} />
                            <Link to='/dash'>
                                   <p style={{color:"gray", fontSize:"17px",textAlign:"left", fontWeight:"400"}}>Upload a new Profile Picture</p>
                            </Link>

                            <h1 style={{ fontSize: "29px", marginLeft: "5px", color:"gold", textAlign:"left", justifySelf:"left", marginTop:"40px" }}>First Name: {data ? data.firstname : "Guest"}!</h1>
                            <h5 style={{ fontSize: "29px", marginLeft: "5px", color:"gold",textAlign:"left", justifySelf:"left" , marginTop:"30px"}}>Last Name: {data ? data.lastname : "Guest"}!</h5>
                            <h5 style={{ fontSize: "29px", marginLeft: "5px", color:"gold",textAlign:"left", justifySelf:"left", marginTop:"30px" }}>E-mail: {data ? data.email : "Guest"}!</h5>

                            <div className="form-group form-button" style={{ marginTop:"50px" }}>
                                            <div className='mly' >
                                                <div style={{fontSize: "18px",marginRight:"50px", color:"gold"}}>Till we meet again,{data ? data.firstname : "Guest"}</div>
                                                <button
                                                 onClick={handleLogout}
                                                 style={{
                                                    backgroundColor: "gold",
                                                    color: "black",
                                                    fontSize: "1rem",
                                                    padding: "10px 20px",
                                                    border: "none",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                    fontWeight: "bold"
                                                }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">
                                                    
                                                      Logout</button>
                                            </div>
                                        </div>
                        </div>
                    </section>
                </div>

            </div>


        </div>
    );
};

export default Profile;


