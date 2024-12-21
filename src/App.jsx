/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productlist" element={<ProductList />} />
    </Routes>
  );
}

export default App;
