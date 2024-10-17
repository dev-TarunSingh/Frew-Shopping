import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { productContext } from "../context/ProductContext";

export default function Products() {
  const { products } = useContext(productContext);
  
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
