import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { cartContext } from "../context/cartContext";

export default function Productdetails() {
  const location = useLocation();
  const { product } = location.state || {};
  const { cartItems } = useContext(cartContext);

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const isInCart = cartItems.some((item) => item.id === product.id);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          margin: 2,
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: isSmallScreen ? "100%" : "50%",
            height: isSmallScreen ? "auto" : 500,
          }}
          image={product.image}
          alt={product.title}
        />
        <CardContent sx={{ width: isSmallScreen ? "100%" : "50%", padding: 2 }}>
          <Typography gutterBottom variant="h4" component="div">
            {product.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (!isInCart) addToCart(product);
              }}
              disabled={isInCart}
            >
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </Button>
            <Button variant="outlined" color="secondary" sx={{ margin: 1 }}>
              Buy Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
