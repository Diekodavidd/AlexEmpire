import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import BouncingBalls from "./BouncingBalls";
import axios from "axios";
import logo from "../assets/lyom.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const ProductDetails = () => { 
    // Safely retrieve existingToke from localStorage
    let storedToke = localStorage.getItem("existingToke")
    const navigate = useNavigate()
    const [data, setData] = useState()
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

    const { id } = useParams(); // Get product ID from URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:7000/customer/product/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product details:", err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (!product) return <h2>Product not found</h2>;

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
                <div style={{ color: "white", position: "fixed", top: "20px", right: "20px", fontSize: "12px", display: "flex" }}>
                    <Link to='/profile' style={{ color: "white", fontSize: "12px", display: "flex", textDecoration: "none" }}>
                        <AccountCircleIcon style={{ fontSize: "35px", color: "gold" }} />
                        <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>{data ? data.firstname : "Guest"}</h1>
                    </Link>
                </div>

                {/* Signi Form */}
                <div className='freedova'>
                    <section style={{ overflowX:"hidden", overflowY:"hidden", justifyContent: "center", padding: "30px", display: "flex", alignItems: "center"}} className="signin">
                        <div style={{ justifyContent: "center", justifyItems: "center", }}>
                            <div>
                            <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h3>Price: {product.price}</h3>
      <div>
        {product.imageUrl?.map((image, index) => (
          <img key={index} src={image} alt={product.name} style={{ width: "200px", margin: "10px" }} />
        ))}

<button
    onClick={() => navigate("/dash2")}
    style={{
      padding: "10px 20px",
      backgroundColor: "gold",
      color: "black",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      right:"170px",
        position:"absolute",
        bottom:"0px",
      fontWeight: "bold"
    }}
  >
    ← Back to Dashboard
  </button>
      </div>
    </div>
                            </div>

                        </div>
                    </section>
                </div>

            </div>


        </div>
    );
};

export default ProductDetails;
