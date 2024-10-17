import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import { UserProvider } from "./context/userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/productDetails/:id",
    element: <ProductDetails />
  },
  {
    path: "*",
    element: <h1>404: Are you lost sir?</h1>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </StrictMode>
);
