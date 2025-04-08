import {React, useState} from 'react';
import './gas.css';
import './gasm.css';
import logo from "../assets/lyom.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import { Link, useNavigate } from 'react-router-dom';


const Header = ({data, toggleCart, cartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
    
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
  //   <header className="header">
  //   <div className="logo crowned">
  //     <span className="crown">👑</span>
  //     <Link to="/" className="logo-text">LyonMart</Link>
  //   </div>

  //   <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
  //     <ul>
  //       <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
  //       <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
  //       <li><Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link></li>
  //       <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
  //       <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
  //     </ul>
  //   </nav>

  //   <div className="header-icons">
  //     <Link to="/cart" className="icon-button"><ShoppingCartIcon /></Link>
  //     <div className="icon-button menu-icon" onClick={toggleMenu}>
  //       {menuOpen ? <Close /> : <Menu />}
  //     </div>
  //   </div>
  // </header>
   
    <header>
      <nav className="main-nav">
        <div className="nav-left">
        <img
          src={logo}
          alt="Logo"
          style={{ position: "absolute", top: "-20px", left: "20px", width: "100px", height: "100px" }}
        />
        </div>
        {/* <ul className="nav-links">
          <li>Home</li>
          <li>Categories ▼</li>
          <li>Saved</li>
          <li>Account</li>
        </ul> */}
        <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
      <ul>
        <li><Link to="/dash2" onClick={() => setMenuOpen(false)}><div style={{ color: "white", textDecoration: "none", padding: "10px", cursor: "pointer" }}>Home</div></Link></li>
       <li> <Link to="/list" onClick={() => setMenuOpen(false)}><div style={{ color: "white", textDecoration: "none", padding: "10px", cursor: "pointer" }}>Categories</div></Link></li>
        <li><Link to="/admin" onClick={() => setMenuOpen(false)}><div style={{ color: "white", textDecoration: "none", padding: "10px", cursor: "pointer" }}>Admin</div></Link></li>
        <li><Link to="/profile" onClick={() => setMenuOpen(false)}><div style={{ color: "white", textDecoration: "none", padding: "10px", cursor: "pointer" }}>Profile</div></Link></li>
      </ul>
    </nav>

        <div className="nav-right">
          <ShoppingCartIcon onClick={toggleCart} style={{fontSize:"30px"}} />
          <span style={{
            position: "absolute",
            top: 9,
            right: 256,
            backgroundColor: "red",
            color: "white",
            fontSize: 12,
            padding: "2px 6px",
            borderRadius: "50%",
            fontWeight: "bold",
            boxShadow: "0 0 4px rgba(0,0,0,0.2)"
          }} className="cart-item-count">{cartCount}</span>
          {/* <button className="signup-btn">Sign Up</button> */}
        
            <img src={data && data.profilePic} alt="" style={{ width: "50px", height: "40px", borderRadius: "50%", marginRight: "0px", }}
            />
            <h1  onClick={toggleMenu} style={{ fontSize: "29px", marginLeft: "5px" }}>
              {data ? data.firstname : "Guest"}!
            </h1>
            {/* <div className="icon-button menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <Close /> : <Menu />}
      </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
