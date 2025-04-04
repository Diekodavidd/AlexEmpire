import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/IMG_1460.PNG"; // Ensure the logo image is in the correct path
import './logi.css';
import './admi.css';
import BouncingBalls from "./BouncingBalls";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Admin = () => {
    // Safely retrieve existingToke from localStorage
    let storedToke = localStorage.getItem("existingToke")
    const navigate = useNavigate()
    const [data, setData] = useState()

     // State for form data
     const [productName, setProductName] = useState("");
     const [productPrice, setProductPrice] = useState("");
const [productDescription, setProductDescription] = useState("");
     const [percentageOff, setPercentageOff] = useState("");
     const [imageFiles, setImageFiles] = useState([]); // Stores selected images
     const [previewImages, setPreviewImages] = useState([]); // For preview
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

    // const [formData, setFormData] = useState({
    //     name: "",
    //     description: "",
    //     price: "",
    //     imageUrl: null  // Ensure this is correctly set: null
    // });

    // Handle input changes for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") setProductName(value);
        if (name === "description") setProductDescription(value);
        if (name === "price") setProductPrice(value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to an array
        setImageFiles(files); // Update imageFiles state
        // Preview the images
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previewUrls); // Set preview images
    };

    
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", productDescription);
        formData.append("price", productPrice);
        
          // Append multiple images to the FormData object
          imageFiles.forEach((file) => {
            formData.append("images", file); // must match .array("images", 5)
          });
           
        try {
            const response = await axios.post("http://localhost:7000/customer/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Product added successfully!");
            console.log(response.data);
             // Redirect to product list
            navigate("/dash2"); // If you're using react-router
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    const styles = {
        form: {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          maxWidth: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        },
        input: {
          padding: "12px 16px",
          borderRadius: "10px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          outline: "none",
          fontSize: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          boxShadow: "0 0 0px rgba(255, 215, 0, 0)",
          transition: "0.3s",
        },
        button: {
          background: "gold",
          color: "black",
          fontWeight: "bold",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          transition: "all 0.3s ease-in-out"
        },
        previewWrapper: {
          display: "flex",
          flexWrap: "wrap",
          gap: "10px"
        },
        previewImage: {
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "10px",
          border: "2px solid gold"
        }
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
                <div style={{ color: "white", position: "fixed", top: "20px", right: "20px", fontSize: "12px", display: "flex" }}>
                    <Link to='/dash2' style={{ color: "white", fontSize: "12px", display: "flex", textDecoration: "none" }}>
                        <AccountCircleIcon style={{ fontSize: "35px", color: "gold" }} />
                        <h1 style={{ fontSize: "29px", marginLeft: "5px" }}>Dashboard</h1>
                    </Link>
                </div>

                {/* Signi Form */}
                <div className='freedov'>
                    <section style={{height:"50%",overflowX:"hidden",overflowY:"hidden", justifyContent: "center", padding: "30px", display: "flex", alignItems: "center", width:"50%" }} className="signin">
                        <div style={{ justifyContent: "center", justifyItems: "center", }}>
                            <div>
            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
  <input
    type="text"
    name="name"
    placeholder="Product Name"
    value={productName}
    onChange={handleChange}
    required
    style={styles.input}
  />
  <input
    type="text"
    name="description"
    placeholder="Description"
    value={productDescription}
    onChange={handleChange}
    required
    style={styles.input}
  />
  <input
    type="number"
    name="price"
    placeholder="Price"
    value={productPrice}
    onChange={handleChange}
    required
    style={styles.input}
  />
  <input
    type="file"
    name="images"
    multiple
    accept="image/*"
    onChange={handleFileChange}
    required
    style={{ ...styles.input, padding: "10px", cursor: "pointer" }}
  />

  {/* Image Previews */}
  <div style={styles.previewWrapper}>
    {previewImages.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`preview-${index}`}
        style={styles.previewImage}
      />
    ))}
  </div>

  <button type="submit" style={styles.button}>
    Add Product
  </button>
</form>

            </div>

                        </div>
                    </section>
                </div>

            </div>


        </div>
    );
};

export default Admin;


