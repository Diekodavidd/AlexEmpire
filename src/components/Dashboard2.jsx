import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/IMG_1460.PNG"; // Ensure the logo image is in the correct path
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard2 = () => {


  // Safely retrieve existingCustomer from localStorage
  // const storedCustomer = localStorage.getItem("existingCustomer")
  //   ? JSON.parse(localStorage.getItem("existingCustomer"))
  //   : null;

  // Safely retrieve existingToke from localStorage
  let storedToke = localStorage.getItem("existingToke")
  const navigate = useNavigate()
  const [data, setData] = useState()
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {

    axios.get("http://localhost:7000/customer/verify", {
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/customer/products"); // Your route
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch on mount
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
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


        <div style={{ position: "fixed", top: "20px", right: "20px", }}>
          <div onClick={() => setIsOpen(!isOpen)} style={{
            color: "gold", position: "relative",
            fontSize: "12px",
            display: "flex",
            textDecoration: "none",
            cursor: "pointer",
            alignItems: "center",
          }}
          >
            <img src={data && data.profilePic} alt="" style={{ width: "50px", height: "40px", borderRadius: "50%", marginRight: "10px", }}
            />
            <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>
              Welcome {data ? data.firstname : "Guest"}!
            </h1>
          </div>

          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 170,
                color: "white",
                fontSize: "16px",
                background: "gold",
                border: "1px solid #ccc",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
                padding: "10px",
                width: "100px",
                zIndex: 1000,
              }}
            >
              <Link to='/profile' style={{textDecoration:"none"}} ><div style={{color:"white",textDecoration:"none", padding: "10px", cursor: "pointer" }}>Profile</div></Link>
              <hr style={{color:"black", height:"3px", width:"100%"}}/>
              <Link to='/admin'style={{textDecoration:"none"}}  ><div style={{color:"white",textDecoration:"none", padding: "10px", cursor: "pointer" }}>Admin</div></Link>
            </div>
          )}
        </div>
        {/* <div style={{ color: "white", position: "fixed", top: "20px", right: "20px", fontSize: "12px", display: "flex" }}>
        <div style={{ color: "gold", fontSize: "12px", display: "flex", textDecoration:"none"}}>
        <img src={data && data.profilePic} alt="" style={{width:"50px", height:"40px",borderRadius:"50%", marginRight:"10px"}} />
          <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>Welcome {data ? data.firstname : "Guest"}!</h1>
        </div>
        </div> */}
        {/* Signi Form */}
        {/* Link to='/profile' */}
        <div className='freedoq'>
          <div className="shop" >
            <h2 style={{color:"white"}}>Available Products</h2>
            <div className='products-content'>
{products.map((product) => (
  <div key={product._id} className="products-box">
    <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="img-box">
        {product.imageUrl?.length > 0 && (
          <img src={product.imageUrl[0]} alt={product.name} style={{ width: "150px" }} />
        )}
      </div>
      <h2 className="products-title">{product.name}</h2>
      <p className="products-titlep">{product.description}</p>
      <div className="price-and-btn">
        <span className="price">{product.price}</span>
        <button className='add-cart'>View</button>
      </div>
    </Link>
  </div>
))}

            </div>
          </div>

        </div>
      </div>


    </div>
  );
};

export default Dashboard2;


