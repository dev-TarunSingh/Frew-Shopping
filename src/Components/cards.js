import {React, useState} from "react";
import {Card, Typography,CardContent, CardMedia } from "@mui/material";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import AddCircleOutlinedIcon  from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon  from "@mui/icons-material/RemoveCircleOutlineOutlined";

// cutom component to make structure for data displaying that is fetched from API
export default function Cards({
  id,
  image,
  title,
  description,
  price,
  category,
}) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  // adding custom css
  const css3 = `
  .all {
    margin: 10px;
  }

  .buy-btn {
    border-radius: 25px;
  }

  .buy-btn:active {
    transform: scale(0.95);
  }
  `;
  return (
    <>
      <style type="text/css">{css3}</style>
      <Card className="all" sx={{ maxWidth: 340, height: '720px' }}>
        <CardActionArea>
          {/* product image */}
          <CardMedia
            component="img"
            height="400"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            {/* product details */}
            <Typography gutterBottom variant="h5" component="div">
              {truncateWords(title, 5)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {truncateWords(description, 20)}
            </Typography>
            <br />
            <Typography variant="h4">${price}</Typography>
            <br />
            <Typography variant="p1"># {category}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* buy now button */}
          {quantity === 0 ? (
            <Button
              className="buy-btn"
              size="small"
              variant="contained"
              color="primary"
              onClick={ handleIncrease }
            >
              Add to Cart
            </Button>
          ) : (
            (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={handleDecrease} aria-label="reduce">
                  <RemoveCircleOutlinedIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="span"
                  style={{ margin: "0 10px" }}
                >
                  {quantity}
                </Typography>
                <IconButton onClick={handleIncrease} aria-label="increase">
                  <AddCircleOutlinedIcon />
                </IconButton>
              </div>
            )
          )}
        </CardActions>
      </Card>
    </>
  );
}

function truncateWords(text, maxWords) {
  const wordsArray = text.split(' ');
  if (wordsArray.length > maxWords) {
    return wordsArray.slice(0, maxWords).join(' ') + '...';
  }
  return text;
}
