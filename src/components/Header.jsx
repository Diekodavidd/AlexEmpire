import { React, useState, useEffect, useRef } from 'react';
import './gas.css';
import './gasm.css';
import logo from "../assets/lyom.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";

import { Heart, Plus } from "lucide-react";
import { Link } from 'react-router-dom';

const Header = ({ data, toggleCart, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu
  const profileRef = useRef(null); // Ref for the profile section

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpen(false); // Close the menu
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <nav className="main-nav">
        <div className="nav-left">
          <img
            src={logo}
            alt="Logo"
            style={{ position: "absolute", top: "-20px", left: "20px", width: "100px", height: "100px" }}
          />
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`} ref={menuRef}>
          <ul>
            <li>
              <Link to="/dash2" style={{ textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: "10px", cursor: "pointer" }}>Home</div>
              </Link>
            </li>
            <li>
              <Link to="/list" style={{ textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: "10px", cursor: "pointer" }}>Categories</div>
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: "10px", cursor: "pointer" }}>About</div>
              </Link>
            </li>
            <li>
              <Link to="/contact" style={{ textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: "10px", cursor: "pointer" }}>Contact</div>
              </Link>
            </li>
            <li>
              <Link to="/favorites" style={{ textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>
              <div style={{ padding: "10px", cursor: "pointer" }}><Heart className="text-red-500" />
                Favorites</div>
              </Link>
            </li>
            <li>
              <Link to="/profile" style={{ textDecoration: "none", color: "white" }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: "10px", cursor: "pointer" }}>Profile</div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart Icon and Profile Section */}
        <div className="nav-right" style={{ position: "relative" }}>
          <ShoppingCartIcon onClick={toggleCart} style={{ fontSize: "30px", cursor: "pointer" }} />

          <span className="cart-item-count dadf">
            {cartCount}
          </span>

          <div onClick={toggleMenu} className="profile-section mex" style={{ display: "flex", cursor: "pointer" }} ref={profileRef}>
            <img
              src={data && data.profilePic}
              alt="Profile"
              style={{ width: "50px", height: "40px", borderRadius: "50%", marginRight: "0px" }}
            />
            <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>
              {data ? data.firstname : "Guest"}!
            </h1>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default Header;
