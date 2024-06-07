// importing required modules
import * as React from "react";
import { useState } from "react";
// importing material ui components
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
// importing icons
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";

// using this a component
export default function Navbar( ) {
  // using state to toggle cart
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // applying cutom css on material ui components
  const css1 = `
        .my-Nav {
            border-radius: 25px;
        }

        .my-btn {
            border-radius: 25px;
            background-color: white;
            color: black;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .my-btn:hover{
            background-color: #e6e6e6;
        }

        .my-btn:active {
            transform: scale(0.95);
            background-color: #e6e6e6;
        }

        .shopping_bag {
          cusrsor: pointer;
          background-color: white;
          color: black;
          border-radius: 50%;
        }

        .shopping_bag:active {
          transform: scale(0.95);
        }
    ;`;

  return (
    <>
      {/* using material ui to make  a navbar  */}
      <style type="text/css">{css1}</style>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className="my-Nav" position="static">
          <Toolbar>
            {/* menu icon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {/* heading */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Shop & Savor
            </Typography>
            {/* cart icon */}
            <ShoppingBagOutlinedIcon
              className="shopping_bag"
              fontSize="large"
              style={{ margin: "10px", padding: "5px" }}
              onclick={toggleCart}
            />
            {/* login button */}
            <Button className="my-btn" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
