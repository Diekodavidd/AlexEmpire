import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/lyom.png";
import './logi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from './Header';
import Hero from './Hero';
import TopSales from './TopSales';
import MewGadgets from './MewGadgets';
import Promo from './Promo';
import Searchar from './Searchar';
import ExploreMore from './ExploreMore';
import Newsletter from './Newsletter';
import Footer from './Footer';

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
  const [isCartActive, setIsCartActive] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

   // Toggle cart visibility
   const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://backend-details-0xik.onrender.com/customer/products"); // Your route
      setProducts(res.data);
      // console.log(res.data);
     const products = res.data
      console.log(products);
      
      
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

  // const cartIcon = document.querySelector("#cart-icon")
  // const cart = document.querySelector(".cart")
  // const cartClose = document.querySelector("#cart-close")
  // const addToCartButtons = document.querySelectorAll(".add-cart")

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);
    if (existing) {
      alert("Product already in cart");
      return;
    }

    const cartItem = {
      ...product,
      quantity: 1,
      image: product.imageUrl?.[0] || "", // Use the first image in imageUrl array
    };

    setCartItems([...cartItems, cartItem]);
  };

  const updateQuantity = (_id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity:
                action === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : item.quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (_id) => {
    setCartItems(cartItems.filter((item) => item._id !== _id));
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  
  return (
    <div style={{backgroundColor: "#0B0C2A"}} >
      <Header data={data} toggleCart={toggleCart} cartCount={cartItems.length}/>
      <Hero />
      <Searchar />
      <TopSales  products={products} addToCart={addToCart} />
      <MewGadgets products={products} addToCart={addToCart} />
      <Promo />
      <ExploreMore />
      <Newsletter />
      <Footer />

      {isCartOpen && (
        <div className={`cart ${isCartOpen ? "active" : ""}`}>
          <h2 className="cart-title">Your Cart</h2>
          <div className="cart-content">
            {cartItems.map((item) => (
              <div className="cart-box" key={item._id}>
                <img src={item.image} alt="" className="cart-img" />
                <div className="cart-details">
                  <h2 className="cart-product-title">{item.name}</h2>
                  <span className="cart-price">${item.price}</span>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item._id, "dec")}>-</button>
                    <span className="number">{item.quantity}</span>
                    <button className="number" onClick={() => updateQuantity(item._id, "inc")} >+</button>
                  </div>
                </div>
                <div
                  className="cart-remove"
                  onClick={() => removeFromCart(item._id)}
                >
                  🗑
                </div>
              </div>
            ))}
            <button
              style={{ width: "10%", height: "8%", border: "none", backgroundColor: "transparent"  }}
              onClick={() => setIsCartOpen(false)}
              id="cart-close"
            >
              x
            </button>
          </div>

          <div className="total">
            <h3>Total: ${getTotal().toFixed(2)}</h3>
          </div>
          <button className="btn-buy">Buy Now</button>
        </div>
      )}

    </div>
  );
};

export default Dashboard2;


