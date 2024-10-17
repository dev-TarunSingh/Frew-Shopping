import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const productContext = createContext(null);

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_FETCHDATA)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <productContext.Provider value={{ products: filteredProducts, setSearch }}>
      {props.children}
    </productContext.Provider>
  );
};
