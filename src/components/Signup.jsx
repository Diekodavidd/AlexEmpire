import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import BouncingBalls from "./BouncingBalls";
import logo from "../assets/IMG_1460.PNG";
import fae from "../assets/alexander_david_logo_transparent (2).png";
import "./style.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Signup = () => {
  const [userDetail, setUserDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    Password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to other pages

  const RegisterUser = () => {
    if (!agreed) {
      alert("You must agree to the Terms and Conditions to register.");
      return;
    }

    console.log(userDetail);
    axios
      .post("https://backend-details-0xik.onrender.com/customer/signup", userDetail)
      .then((res) => {
        console.log(res);
        alert("Account created successfully! Please log in.");
        navigate("/login"); // Redirect to login page
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        <BouncingBalls />
        <Link to='/'><img 
                        src={logo} 
                        alt="Logo" 
                        style={{ position: "absolute", top: "20px", left: "20px", width: "100px", height: "100px" }}
                /></Link>

        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            zIndex: 10,
            width: "60%",
          }}
        >
          <section className="signup">
            <div className="container">
              <div className="signup-content">
                <div className="signup-form">
                  <h2 className="form-title">Sign up</h2>
                  <form method="POST" className="register-form">
                    <div className="form-group">
                      <label htmlFor="name">
                        <AccountCircleIcon />
                      </label>
                      <input
                        onChange={(e) => setUserDetail({ ...userDetail, firstname: e.target.value })}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your First Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">
                        <AccountCircleIcon />
                      </label>
                      <input
                        onChange={(e) => setUserDetail({ ...userDetail, lastname: e.target.value })}
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Your Last Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">
                        <EmailIcon />
                      </label>
                      <input
                        onChange={(e) => setUserDetail({ ...userDetail, email: e.target.value })}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">
                        <LockIcon />
                      </label>
                      <input
                        onChange={(e) => setUserDetail({ ...userDetail, Password: e.target.value })}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="form-group">
                    <input
  type="checkbox"
  name="agree-term"
  id="agree-term"
  className="agree-term"
  checked={agreed}
  onChange={() => setAgreed(!agreed)} // Toggle state on click
/>

                      <label htmlFor="agree-term" className="label-agree-term">
                        <span></span>I agree to all statements in{" "}
                        <a href="#" onClick={() => setShowModal(true)} className="term-service">
                          Terms of Service
                        </a>
                      </label>
                    </div>
                    <div className="form-group form-button">
                      <button
                        style={{
                          backgroundColor: "gold",
                          color: "black",
                          fontSize: "1rem",
                          padding: "10px 20px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                        onClick={RegisterUser}
                        type="button"
                        className="btn btn-primary btn-lg"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="signup-image">
                  <figure>
                    <img src={fae} alt="Sign up" />
                  </figure>
                  <Link className="signup-image-link" to="/login">
                    I am already a member
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente
            consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente
            consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, itaque, modi, aliquam nostrum at sapiente
            consequuntur natus odio reiciendis perferendis rem nisi tempore possimus ipsa porro delectus quidem dolorem ad.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            I Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
