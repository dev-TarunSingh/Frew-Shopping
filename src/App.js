import React, { useState, useEffect } from "react";
import { Container, TextField } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from "./Components/Navbar";
import Cards from "./Components/cards";

function App() {
  const css = `
    .my-Search {
      margin-bottom: 1rem;
      border-radius: 25px;
    }
  `;

  const styles = {
    display: "flex",
    flexdirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifycontent: "center",
  };

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(true);


  

  // fetching API with error handling
  useEffect(() => {
    try {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => setPosts(data));
    } catch (error) {
      console.log("got error!! ");
    }
  }, []);

  useEffect(() => {
    // showing loading for 2 seconds
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);
  

  // searching function on user input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style type="text/css">{css}</style>

      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <Navbar />

        {/* search bar using material ui */}
        <TextField
          className="my-Search"
          label="Search"
          fullWidth
          margin="normal"
          // show whatever user is typng without refreshing again and again
          value={searchQuery}
          // saving query to to run search by calling function
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* displaying all the items fetched from API and show circle loading animation while data is being fetched*/}

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress color="primary"/> {/* Loading indicator */}
          </div>
        ) : (
          <div className="all_item" style={styles}>
            {filteredPosts.map((post) => (
              <Cards
                key={post.id}
                title={post.title}
                image={post.image}
                description={post.description}
                price={post.price}
                category={post.category}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
