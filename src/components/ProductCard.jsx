import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { cartContext } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';

export default function MediaCard({ product }) {
  const { image, title, description, price } = product;
  const { addToCart, cartItems } = useContext(cartContext);
  const navigate = useNavigate();

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCardClick = () => {
    navigate(`/productDetails/${product.id}`, { state: { product } });
  };

  return (
    <Card style={{ margin: 20 }} sx={{ maxWidth: 320 }} onClick={handleCardClick}>
      <CardMedia
        sx={{ height: 400 }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title.slice(0, 20) + "..."}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description.slice(0, 100) + "..."}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"> $ {price}</Button>
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
      </CardActions>
    </Card>
  );
}