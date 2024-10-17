import "./App.css";
import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar.jsx";
import Products from "./components/Products.jsx";
import { userContext } from "./context/userContext.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const {user} = useContext(userContext);
  
  return (
    <>
    {user == null ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Navbar />
          <Products />
        </>
      )}
    </>
  );
}

export default App;
