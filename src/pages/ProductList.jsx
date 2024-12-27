/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { addItem } from "../CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { plantsArray } from "../data";
import Swal from "sweetalert2";
import "../ProductList.css";
import CartItem from "./CartItem";

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false); // State to control the visibility of the About Us page
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  // Calculate the total number of items in the cart
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (product) => {
    if (product) {
      dispatch(addItem(product));
      setAddedToCart((prevState) => ({
        ...prevState,
        [product.name]: true, // Set the product name as key and value as true to indicate it's added to cart
      }));
      Swal.fire({
        text: `${product.name} added to cart`,
        icon: "success",
      });
    }
  };

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff!important",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignIems: "center",
    fontSize: "20px",
  };
  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1100px",
  };
  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true); // Set showCart to true when cart icon is clicked
  };

  const handlePlantsClick = (category) => {
    if (category) {
      if (showPlants) {
        // Check if showItems is false
        setShowPlants(!showPlants); // Toggle showItems to true only if it's currently false
      }
    }
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  return (
    <>
      <div>
        <div className="navbar" style={styleObj}>
          <div className="tag">
            <div className="luxury">
              <img
                src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                alt=""
              />
              <a href="/" style={{ textDecoration: "none" }}>
                <div className="logo">
                  <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                  <i style={{ color: "white" }}>Where Green Meets Serenity</i>
                </div>
              </a>
            </div>
          </div>
          <div style={styleObjUl}>
            <div className="nav_links">
              {" "}
              <a
                className="a-plant"
                href="#Air Purifying Plants"
                onClick={() => handlePlantsClick("#Air Purifying Plants")}
              >
                Air Purifying
              </a>
              <a
                className="a-plant"
                href="#Aromatic Fragrant Plants"
                onClick={() => handlePlantsClick("#Aromatic Fragrant Plants")}
              >
                Aromatic Fragrant
              </a>
              <a
                className="a-plant"
                href="#Insect Repellent Plants"
                onClick={() => handlePlantsClick("#Insect Repellent Plants")}
              >
                Insect Repellent
              </a>
              <a
                className="a-plant"
                href="#Medicinal Plants"
                onClick={() => handlePlantsClick("#Medicinal Plants")}
              >
                Medicinal
              </a>
              <a
                className="a-plant"
                href="#Low Maintenance Plants"
                onClick={() => handlePlantsClick("#Low Maintenance Plants")}
              >
                Low Maintenance
              </a>
            </div>
            <div>
              {" "}
              <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                <h1 className="cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    id="IconChangeColor"
                    height="68"
                    width="68"
                  >
                    <rect width="156" height="156" fill="none"></rect>
                    <circle cx="80" cy="216" r="12"></circle>
                    <circle cx="184" cy="216" r="12"></circle>
                    <path
                      d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                      fill="none"
                      stroke="#faf9f9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      id="mainIconPathAttribute"
                    ></path>
                  </svg>
                  {/* Cart item count badge */}
                  {totalItemsInCart > 0 && (
                    <span className="cart-item-count">{totalItemsInCart}</span>
                  )}
                </h1>
              </a>
            </div>
          </div>
        </div>
        {!showCart ? (
          <div className="product-grid">
            {plantsArray.map((category, index) => (
              <div key={index} id={category.category}>
                <h1 className="cath1">
                  <div>{category.category}</div>
                </h1>
                <div className="product-list">
                  {category.plants.map((plant, plantIndex) => (
                    <div className="product-card" key={plantIndex}>
                      <div className="product-title">{plant.name}</div>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />

                      <div className="product-cost">{plant.cost}</div>
                      <div className="product-cost">{plant.description}</div>
                      {/*Similarly like the above plant.name show other details like description and cost*/}
                      <button
                        className="product-button"
                        onClick={() => handleAddToCart(plant)}
                        disabled={addedToCart[plant.name]} // Disable the button if the item is already added
                      >
                        {addedToCart[plant.name]
                          ? "Added to cart"
                          : "Add to Cart"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <CartItem onContinueShopping={(e) => handleContinueShopping(e)} />
        )}
      </div>
    </>
  );
}

export default ProductList;
