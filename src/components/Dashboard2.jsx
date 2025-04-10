import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import './logi.css';
import { Link,  useNavigate } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import TopSales from './TopSales';
import MewGadgets from './MewGadgets';
import Promo from './Promo';
import Searchar from './Searchar';
import ExploreMore from './ExploreMore';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Dashboard2 = () => {
  const storedToke = localStorage.getItem("existingToke");
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false); // NEW

  
      const { cartItems,setCartItems, addToCart, updateQuantity, removeFromCart, getTotal } = useContext(CartContext);

  // Verify customer token
  useEffect(() => {
    axios.get("https://backend-details-0xik.onrender.com/customer/verify", {
      headers: {
        Authorization: `Bearer ${storedToke}`,
      },
    })
      .then((response) => {
        setData(response?.data?.User);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        navigate("/login");
      });
  }, []);

 // Load cart from localStorage on initial load
useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  }
  setIsCartLoaded(true); // Mark cart as loaded
}, []);

// Save to localStorage every time cartItems change
useEffect(() => {
  if (isCartLoaded) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}, [cartItems, isCartLoaded]); // depend on isCartLoaded too

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://backend-details-0xik.onrender.com/customer/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };
    fetchProducts();
  }, []);

  // Cart controls
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  // const addToCart = (product) => {
  //   const existing = cartItems.find((item) => item._id === product._id);
  //   if (existing) {
  //     alert("Product already in cart");
  //     return;
  //   }
  //   setCartItems([...cartItems, {
  //     ...product,
  //     quantity: 1,
  //     image: product.imageUrl?.[0] || "",
  //   }]);
  // };
  

  // const updateQuantity = (_id, action) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item._id === _id
  //         ? {
  //             ...item,
  //             quantity:
  //               action === "inc"
  //                 ? item.quantity + 1
  //                 : item.quantity > 1
  //                 ? item.quantity - 1
  //                 : item.quantity,
  //           }
  //         : item
  //     )
  //   );
  // };

  // const removeFromCart = (_id) => {
  //   setCartItems(cartItems.filter((item) => item._id !== _id));
  // };

  // const getTotal = () => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };

  return (
    <div style={{ backgroundColor: "#0B0C2A" }}>
      <Header data={data} toggleCart={toggleCart} cartCount={cartItems.length} />
      <Hero />
      <Searchar />
      <TopSales products={products} addToCart={addToCart} />
      <MewGadgets products={products} addToCart={addToCart} />
      <Promo />
      <ExploreMore />
      <Newsletter />
      <Footer />

      {isCartOpen && (
        <div className="cart active">
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
                    <button onClick={() => updateQuantity(item._id, "inc")}>+</button>
                  </div>
                </div>
                <div className="cart-remove" onClick={() => removeFromCart(item._id)}>🗑</div>
              </div>
            ))}
            <button
              style={{ width: "10%", height: "8%", border: "none", backgroundColor: "transparent" }}
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
          <div>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'white', textAlign:"center"  }}>
        <div style={{ padding: "10px", cursor: "pointer" }}>View Full Cart</div>
        </Link>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default Dashboard2;
