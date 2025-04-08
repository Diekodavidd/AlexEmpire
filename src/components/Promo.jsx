import React from 'react'
import './gas.css';
import jogo from "../assets/promo3.png";


const Promo = () => {
  return (
    <>
        <section className="promo-banner">
        <div className="promo-content">
          <div className="promo-image">
            <img src={jogo} alt="Shopping Girls" />
            <span className="discount-tag">50% OFF</span>
          </div>
          <div className="promo-text">
            <h3>BLACK <span>FRIDAY</span></h3>
            <p>MEGA OFFER</p>
            <p className="small">Power In Every Purchase</p>
            <button className="shop-now">SHOP NOW</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Promo