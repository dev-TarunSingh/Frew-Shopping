import React, { useContext, useState } from 'react';
import { cartContext } from '../context/cartContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function Cart({ onClose }) {
  const { cartItems, removeFromCart } = useContext(cartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const handleBuyNow = () => {
    setIsCheckout(true);
  };

  return (
    <Box sx={{ width: 350, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {isCheckout ? "Order Confirmation" : "Your Cart"}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {isCheckout ? (
        <Box>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Thank you for your purchase!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx = {{ backgroundColor: "#FFAA00", borderRadius: 50}}
            onClick={onClose} // Close the cart when "Continue Shopping" is clicked
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={item.image} alt={item.title} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`$${item.price}`}
                  />
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeFromCart(item)}
                    sx={{
                        color: "black",
                        border: "none",
                        borderRadius: 50,
                        
                    }}
                  >
                    <RemoveCircleIcon/>
                  </Button>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          {cartItems.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuyNow}
              sx={{ marginTop: 2, backgroundColor: "#FFAA00", borderRadius: 50 }}
            >
              Buy Now
            </Button>
          ) : (
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Your cart is empty.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}